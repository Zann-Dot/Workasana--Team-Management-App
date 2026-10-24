import express from "express";
import Tasks from "../models/Task.js";
import validatePayload from "../middleware/validatePayload.js";
import authenticateToken from "../middleware/authenticateToken.js";
import validateReferences from "../middleware/validateReferences.js";
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

export default taskRouter;
