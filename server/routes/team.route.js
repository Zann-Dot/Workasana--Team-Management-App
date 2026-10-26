import express from "express";
import validatePayload from "../middleware/validatePayload.js";
import Teams from "../models/Teams.js";
const teamRouter = express.Router();
teamRouter.post("/teams", validatePayload, async (req, res) => {
   try {
      const { teamId } = req.query;
      if (teamId) {
         const updateTeam = await Teams.findByIdAndUpdate(teamId, req.body, {
            new: true,
         });
         if (!updateTeam)
            return res.status(400).json({
               success: false,
               error: "Cannot update team details, try again later.",
            });

         res.json({
            success: true,
            message: "Successfully updated team's details",
            updateTeam,
         });
      } else {
         const newTeam = await Teams.create(req.body);
         if (!newTeam)
            return res.status(400).json({
               success: false,
               error: "Cannot create team, try again later.",
            });

         res.json({
            success: true,
            message: "Successfully created new team",
            newTeam,
         });
      }
   } catch (error) {
      res.status(500).json({ error: error.message })
   }
});

teamRouter.get("/teams", async (req, res) => {
   try {
      const teams = await Teams.find({}).lean()
      if (!teams)
         return res.status(404).json({ error: "No teams found" });
      res.json(teams)
   } catch (error) {
      res.status(500).json({ error: error.message })

   }
})
export default teamRouter;
