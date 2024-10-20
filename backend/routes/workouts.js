import express from "express";
import { createWorkout, deleteWorkout, getAllWorkouts, getSingleWorkout, updateWorkout } from "../controllers/workoutController.js";

const router = express.Router();

router.get("/", getAllWorkouts)

router.get("/:id", getSingleWorkout)

router.post("/", createWorkout)

router.delete("/:id", deleteWorkout)

router.patch("/:id", updateWorkout)

export default router