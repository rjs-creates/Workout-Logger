import axios from "axios"
import { useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { formatDistanceToNow } from "date-fns"

const WorkoutDetail = ({workout}) => {
  const [error, setError] = useState("")
  const {dispatch} = useWorkoutsContext()

  const handleClick = async() => {
    try{
      setError("")
      const response = await axios.delete(`/api/workouts/${workout._id}`)

      if (response.status === 200 ) {
        dispatch({type: 'DELETE_WORKOUT', payload: response.data})
        return
      }  

      setError(response.data.error)
    } catch(e) {
      setError(e.response.data.error)
    }
  }

  return (  
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p><strong>Load (kg): {workout.load}</strong></p>
      <p><strong>Reps: {workout.reps}</strong></p>
      <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
      {error !== "" ? <div className="error">{error}</div> : ""}
    </div>
  )
}
export default WorkoutDetail