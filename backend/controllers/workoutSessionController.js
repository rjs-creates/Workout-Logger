import mongoose from "mongoose"
import WorkoutSession from "../models/workoutSessionModel.js";
import Workout from "../models/workoutModel.js";

//get all workout sessions for a user
export const getAllWorkoutSessions = async(req, res) => {
    try {
        const user_id = req.user._id        
        const allWorkoutsSessions = await WorkoutSession.find({ user_id }).sort({createdAt: -1})
        res.status(200).json(allWorkoutsSessions)
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}

export const getAllWorkoutsFromSession = async(req, res) => {
    try {
        const user_id = req.user._id      
        const { id } = req.params
        const allWorkouts = await Workout.find({ user_id, session_id: id }).sort({ createdAt: -1 })
        res.status(200).json(allWorkouts)
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}

//get single workout session
export const getSingleWorkoutSession = async(req, res) => {
    try {
        const { id } = req.params
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: "Invalid Id"})
        }
        const workoutSession = await WorkoutSession.findById(id)
        if(!workoutSession){
            return res.status(404).json({error: `No such workout session found for id ${id}`})
        }
        res.status(200).json(workoutSession)
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}


//create new workout session
export const createWorkoutSession = async(req, res) => {
    const {title , description} = req.body

    if(!title){
        res.status(400).json({error: 'Please fill in the title of the session'})
        return
    }

    try {
        const user_id = req.user._id
        const workoutSessionData = { title, user_id };
        if (description) {
            workoutSessionData.description = description;
        }
        const workoutSession = await WorkoutSession.create(workoutSessionData)
        res.status(200).json(workoutSession)
    } catch (err) {
        res.status(400).json({error: err.message})
    }
}