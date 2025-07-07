import express from "express";
import requireAuth from "../middleware/requireAuth.js";
import { createWorkoutSession, getAllWorkoutSessions, getSingleWorkoutSession, getAllWorkoutsFromSession, updateWorkoutSession } from "../controllers/workoutSessionController.js";

const workoutSessionRouter = express.Router();

workoutSessionRouter.use(requireAuth)

workoutSessionRouter.get("/", getAllWorkoutSessions)

workoutSessionRouter.get("/:id", getSingleWorkoutSession)

workoutSessionRouter.get("/:id/workouts", getAllWorkoutsFromSession)

workoutSessionRouter.post("/", createWorkoutSession)

workoutSessionRouter.patch("/:id", updateWorkoutSession)

export default workoutSessionRouter