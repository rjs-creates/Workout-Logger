import axios from "axios"
import { useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext.js"
import { formatDistanceToNow } from "date-fns"

const WorkoutDetail = ({workout}) => {
  const [error, setError] = useState("")
  const {dispatch} = useWorkoutsContext()
  const {user} = useAuthContext()

  const handleClick = async() => {
    if(!user){
      setError("You must be logged in")
      return
    }
    try{
      setError("")
      const response = await axios.delete(`/api/workouts/${workout._id}`, {
        headers : {
          "Authorization": `Bearer ${user.token}`
        }
      })

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