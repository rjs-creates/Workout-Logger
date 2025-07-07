import { useState } from "react"
import axios from "axios"
import { useAuthContext } from "../hooks/useAuthContext.js"
import { selectCreateWorkout, useWorkoutsStore } from "../stores/useWorkoutsStore.js"
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const WorkoutForm = () => {
  const [title, setTitle] = useState("")
  const [reps, setReps] = useState("")
  const [load, setLoad] = useState("")
  const [error, setError] = useState("")
  const createWorkout = useWorkoutsStore(selectCreateWorkout)
  const [emptyFields, setEmptyFields] = useState([])
  const {user} = useAuthContext()
  const { id } = useParams();
  
  const resetState = () => {
    setTitle("");
    setReps("");
    setLoad("");
    setError("");
    setEmptyFields([]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(!user){
      setError("You must be logged in")
      return
    }
    try{
      const response = await axios.post("/api/workouts/", {
        title: title,
        load: load,
        reps: reps,
        session_id: id
      }, {
        headers : {
          "Authorization": `Bearer ${user.token}`
        }
      })
    
      if (response.status === 200 ) {
        resetState();
        createWorkout(response.data)
        return
      }  
      setError(response.data.error)
    } catch (e) {
      if(e.response.data){
        setEmptyFields(e.response.data.emptyFields)
      }
      setError(e.response.data.error)
    }
  }

  const handleDone = async (e) => {
    e.preventDefault()
    if (!user) {
      setError("You must be logged in");
      return;
    }
    try {
      const response = await axios.patch(
        `/api/workout_sessions/${id}`,
        {status: "completed"},
        {
          headers: {
            "Authorization": `Bearer ${user.token}`
          }
        }
      );
      toast.success(response.data.message || "Session marked as done");
    } catch (e) {
      setError(e.response?.data?.error || "Failed to mark session as done");
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new workout</h3>
      <label>Exercise Title: </label>
      <input 
        type="text" 
        onChange={(e) => setTitle(e.target.value)} 
        value={title} 
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>Load (in kgs): </label>
      <input 
        type="number" 
        onChange={(e) => setLoad(e.target.value)} 
        value={load} 
        className={emptyFields.includes('load') ? 'error' : ''}
      />

      <label>Reps: </label>
      <input 
        type="number" 
        onChange={(e) => setReps(e.target.value)} 
        value={reps} 
        className={emptyFields.includes('reps') ? 'error' : ''}
      />

      <button type="submit">Add Workout</button>
      <button
        type="button"
        onClick={handleDone}
        style={{ marginLeft: "10px" }}
      >
        Session Done
      </button>

      {error !== "" ? <div className="error">{error}</div> : ""}
    </form>
  )
}

export default WorkoutForm