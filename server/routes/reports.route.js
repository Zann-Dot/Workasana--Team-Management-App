import express from "express";
import Tasks from "../models/Task.js";
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
               totalProjectsSummary: [
                  {
                     $group: {
                        _id: "$project",
                        count: { $sum: 1 },
                     },
                  },
                  {
                     $project: {
                        _id: 0,
                        count: 1,
                     },
                  },
               ],

               tasksCompletedSummary: [
                  {
                     $group: {
                        _id: null,
                        count: {
                           $sum: {
                              $cond: [{ $eq: ["$status", "completed"] }, 1, 0],
                           },
                        },
                     },
                  },
                  {
                     $project: {
                        _id: 0,
                        count: 1,
                     },
                  },
               ],

               inProgressSummary: [
                  {
                     $group: {
                        _id: null,
                        count: {
                           $sum: {
                              $cond: [{ $eq: ["$status", "inprogress"] }, 1, 0],
                           },
                        },
                     },
                  },
                  {
                     $project: {
                        _id: 0,
                        count: 1,
                     },
                  },
               ],

               overdueSummary: [
                  {
                     $match: {
                        status: {
                           $ne: "completed"
                        }
                     }
                  },
                  {
                     $project: {
                        _id: 0,
                        overdue: {
                           $cond: [
                              {
                                 $gt: [
                                    "$timeToComplete",
                                    {
                                       $add: [
                                          { $dayOfMonth: "$createdAt" },
                                          "$timeToComplete",
                                       ],
                                    },
                                 ],
                              },
                              false,
                              true,
                           ],
                        },
                     },
                  },
                  {
                     $match: { overdue: true }
                  },
                  { $count: "overdue" }
               ],
            },
         },
         {
            $project: {
               totalProjects: {
                  $ifNull: [
                     { $arrayElemAt: ["$totalProjectsSummary.count", 0] },
                     0
                  ]
               },
               tasksCompleted: {
                  $ifNull: [
                     { $arrayElemAt: ["$tasksCompletedSummary.count", 0] },
                     0
                  ]
               },
               inProgress: {
                  $ifNull: [
                     { $arrayElemAt: ["$inProgressSummary.count", 0] },
                     0
                  ]
               },
               overdue: {
                  $ifNull: [
                     { $arrayElemAt: ["$overdueSummary", 0] },
                     0
                  ]
               },
            },
         },
      ]);

      if (!report)
         return res.status(404).json({ error: "No dashboard reports found." })
      res.json(report);
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
});
export default reportRouter;
