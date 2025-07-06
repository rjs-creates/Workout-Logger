import Workout from "../models/workoutModel.js";
import mongoose from "mongoose"

//get single workout
export const getSingleWorkout = async(req, res) => {
    try {
        const { id } = req.params
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: "Invalid Id"})
        }
        const workout = await Workout.findById(id)
        if(!workout){
            return res.status(404).json({error: "No such workout found"})
        }
        res.status(200).json(workout)
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}

//create new workout
export const createWorkout = async(req, res) => {
    const {title, load, reps, session_id} = req.body

    let emptyFields = []

    if(!title){
        emptyFields.push("title")
    }
    if(!load){
        emptyFields.push("load")
    }
    if(!reps){
        emptyFields.push("reps")
    }
    if(!session_id){
        emptyFields.push("session_id")
    }
    if(emptyFields.length > 0){
        res.status(400).json({error: 'Please fill in all the fields', emptyFields})
        return
    }

    try {
        const user_id = req.user._id
        const workout = await Workout.create({title, load, reps, user_id, session_id})
        res.status(200).json(workout)
    } catch (err) {
        res.status(400).json({error: err.message})
    }
}

//delete a workout
export const deleteWorkout = async(req, res) => {
    const {id} = req.params
    try {
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: "Invalid Id"})
        }
        const workout = await Workout.findByIdAndDelete(id)
        if(!workout){
            return res.status(400).json({error: "No such workout found"})
        }
        res.status(200).json(workout)
    } catch (err) {
        res.status(400).json({error: err.message})
    }
}

//update a workout
export const updateWorkout = async(req, res) => {
    const {id} = req.params
    try {
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: "Invalid Id"})
        }
        const workout = await Workout.findByIdAndUpdate(id, {...req.body})
        if(!workout){
            return res.status(400).json({error: "No such workout found"})
        }
        res.status(200).json(workout)
    } catch (err) {
        res.status(400).json({error: err.message})
    }
}