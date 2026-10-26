import express from "express";
import Tasks from "../models/Task.js";
import validatePayload from "../middleware/validatePayload.js";
import authenticateToken from "../middleware/authenticateToken.js";
import validateReferences from "../middleware/validateReferences.js";
import filterQuery from "../middleware/filterQuery.js";
const taskRouter = express.Router();

taskRouter.post(
   "/tasks",
   authenticateToken,
   validatePayload,
   validateReferences,
   async (req, res) => {
      try {
         const taskId = req.query.id?.trim();
         if (taskId) {
            const task = await Tasks.findByIdAndUpdate(taskId, req.body, {
               new: true,
            });
            if (!task)
               return res
                  .status(400)
                  .json({ error: "Something went wrong, cannot update task" });

            res.json({
               success: true,
               message: "Successfully updated task.",
               updatedTask: task,
            });
         } else {
            const newTask = await Tasks.create(req.body);
            if (!newTask)
               return res
                  .status(400)
                  .json({ error: "Something went wrong, cannot create the task" });

            res.json({
               success: true,
               message: "Successfully created task.",
               newTask,
            });
         }
      } catch (error) {
         res.status(500).json({ error: error.message });
      }
   },
);

taskRouter.get("/tasks", filterQuery, async (req, res) => {
   try {
      const query = req.filterQueries;
      const { timeToComplete } = req.query;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const sort = { createdAt: -1 };
      if (timeToComplete) sort = { timeToComplete };
      console.log(query);


      const [totalTasks, tasks] = await Promise.all([
         Tasks.countDocuments(),
         Tasks.find(query)
            .sort(sort)
            .skip((page - 1) * limit)
            .limit(limit)
            .lean()
      ]);

      if (!tasks) return res.status(404).json({ error: "No tasks found." });
      res.json({
         totalTasks,
         tasks,
         totalPages: Math.ceil(totalTasks / limit),
         currentPage: page,
      });
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
});

taskRouter.delete("/tasks", async (req, res) => {
   try {
      const { taskId } = req.body;

      if (!Array.isArray(taskId) || taskId.length === 0)
         return res.status(400).json({ error: "Provide atleast 1 task ID" });

      const objectIds = taskId.map((id) => new Types.ObjectId(id));
      const deletedTasks = await Tasks.deleteMany({ _id: { $in: objectIds } });

      if (deletedTasks.deletedCount === 0)
         return res.status(404).json({ error: "No task deleted" });

      const message = `${deletedTasks.deletedCount} ${deletedTasks.deletedCount === 1 ? "task" : "tasks"} deleted successfully.`
      res.json({
         success: true,
         message,
         deletedTasks,
      });
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
})

export default taskRouter;
