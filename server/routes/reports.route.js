import express from "express";
import {
   endOfMonth,
   endOfToday,
   endOfWeek,
   startOfMonth,
   startOfToday,
   startOfWeek,
} from "date-fns";
import Tasks from "../models/Task.js";
import Projects from "../models/Projects.js";
const reportRouter = express.Router();

reportRouter.get("/reports/dashboard", async (req, res) => {
   const thisYear = new Date().getFullYear();
   const startDate = new Date(`${thisYear}-01-01T00:00:00.000Z`);
   const endDate = new Date(`${thisYear + 1}-01-01T00:00:00.000Z`);
   try {
      const [report] = await Tasks.aggregate([
         {
            $match: {
               createdAt: {
                  $gte: startDate,
                  $lt: endDate,
               },
            },
         },
         {
            $facet: {
               tasksCompletedSummary: [
                  { $match: { status: "completed" } },
                  { $count: "count" },
               ],

               inProgressSummary: [
                  { $match: { status: { $ne: "completed" } } },
                  { $count: "count" },
               ],

               overdueSummary: [
                  {
                     $match: { status: { $ne: "completed" } },
                  },
                  {
                     $project: {
                        _id: 0,
                        overdue: {
                           $gt: [
                              new Date(),
                              {
                                 $add: [
                                    "$createdAt",
                                    { $multiply: ["$timeToComplete", 86400000] },
                                 ],
                              },
                           ],
                        },
                     },
                  },
                  {
                     $match: { overdue: true },
                  },
                  { $count: "overdue" },
               ],

               tasksCompletedThisWeekSummary: [
                  {
                     $match: {
                        status: "completed",
                        completedAt: {
                           $gte: startOfWeek(new Date()),
                           $lt: endOfWeek(new Date()),
                        },
                     },
                  },
                  { $count: "count" },
               ],

               tasksDueTodaySummary: [
                  {
                     $match: {
                        status: { $ne: "completed" },
                        dueDate: {
                           $gte: startOfToday(),
                           $lt: endOfToday(),
                        },
                     },
                  },
                  { $count: "count" },
               ],
            },
         },
         {
            $project: {
               tasksCompleted: {
                  $ifNull: [{ $arrayElemAt: ["$tasksCompletedSummary.count", 0] }, 0],
               },
               inProgress: {
                  $ifNull: [{ $arrayElemAt: ["$inProgressSummary.count", 0] }, 0],
               },
               overdue: {
                  $ifNull: [{ $arrayElemAt: ["$overdueSummary.overdue", 0] }, 0],
               },
               tasksCompletedThisWeek: {
                  $ifNull: [
                     { $arrayElemAt: ["$tasksCompletedThisWeekSummary.count", 0] },
                     0,
                  ],
               },
               tasksDueToday: {
                  $ifNull: [{ $arrayElemAt: ["$tasksDueTodaySummary.count", 0] }, 0],
               },
            },
         },
      ]);

      const [projects] = await Projects.aggregate([
         {
            $match: {
               createdAt: {
                  $gte: startDate,
                  $lt: endDate,
               },
            },
         },
         {
            $facet: {
               totalProjectsSummary: [{ $count: "count" }],

               projectsThisMonthSummary: [
                  {
                     $match: {
                        createdAt: {
                           $gte: startOfMonth(new Date()),
                           $lt: endOfMonth(new Date()),
                        },
                     },
                  },
                  { $count: "count" },
               ],
            },
         },
         {
            $project: {
               totalProjects: {
                  $ifNull: [{ $arrayElemAt: ["$totalProjectsSummary.count", 0] }, 0],
               },
               projectsThisMonth: {
                  $ifNull: [
                     { $arrayElemAt: ["$projectsThisMonthSummary.count", 0] },
                     0,
                  ],
               },
            },
         },
      ]);

      if (report == null)
         return res.status(404).json({ error: "No dashboard reports found." });
      res.json({ ...report, ...projects });
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
});

reportRouter.get("/reports/upcoming-deadlines", async (req, res) => {
   try {
      const now = new Date();
      const sevenDaysFromNow = new Date(now.getTime() + 7 * 86400000);

      const upcomingTasks = await Tasks.aggregate([
         {
            $match: {
               status: { $ne: "completed" },
               dueDate: {
                  $gte: now,
                  $lte: sevenDaysFromNow,
               },
            },
         },
         {
            $project: {
               _id: 0,
               type: { $literal: "task" },
               name: "$name",
               priority: "$priority",
               dueDate: "$dueDate",
            },
         },
      ]);

      const upcomingProjects = await Projects.aggregate([
         {
            $match: {
               status: { $ne: "completed" },
               dueOn: {
                  $gte: now,
                  $lte: sevenDaysFromNow,
               },
            },
         },
         {
            $project: {
               _id: 0,
               type: { $literal: "project" },
               name: "$name",
               priority: "$priority",
               dueDate: "$dueDate",
            },
         },
      ]);

      const upcomingDeadlines = [...upcomingTasks, ...upcomingProjects];
      res.json(upcomingDeadlines);
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
});
export default reportRouter;
