import mongoose from "mongoose"

const {Schema} = mongoose
const workoutSessionSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    date_created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false,
    },
}, {timestamps: true})

const WorkoutSession = mongoose.model('Workout', workoutSessionSchema)

export default WorkoutSession