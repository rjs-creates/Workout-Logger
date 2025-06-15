import express from "express";
import requireAuth from "../middleware/requireAuth.js";
import { createWorkoutSession, getAllWorkoutSessions, getSingleWorkoutSession } from "../controllers/workoutSessionController.js";

const workoutSessionRouter = express.Router();

workoutSessionRouter.use(requireAuth)

workoutSessionRouter.get("/", getAllWorkoutSessions)

workoutSessionRouter.get("/:id", getSingleWorkoutSession)

workoutSessionRouter.post("/", createWorkoutSession)

export default workoutSessionRouter