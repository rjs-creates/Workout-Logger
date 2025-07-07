import { useEffect } from "react";
import WorkoutDetail from "../components/WorkoutDetails.js";
import axios from "axios"
import WorkoutForm from "../components/WorkoutForm.js";
import { useWorkoutsStore, selectWorkouts, selectSetWorkouts } from "../stores/useWorkoutsStore.js";
import { useAuthContext } from "../hooks/useAuthContext.js";
import { useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { selectCurrentWorkoutSession, useWorkoutSessionsStore } from "../stores/useWorkoutSessionsStore.js";

const WorkoutSession = () => {
  const workouts = useWorkoutsStore(selectWorkouts);
  const setWorkouts = useWorkoutsStore(selectSetWorkouts);
  const currentWorkoutSession = useWorkoutSessionsStore(selectCurrentWorkoutSession)
  const {user} = useAuthContext()
  const { id } = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    const fetchWorkOut = async() => {
      const response = await axios.get(`/api/workout_sessions/${id}/workouts`, {
        headers: {
          "Authorization": `Bearer ${user.token}`
        },
      })
      if(response.status === 200){
        const data = await response.data
        setWorkouts(data)
      }
    }

    if (user) {
      fetchWorkOut()
    }
    
  }, [setWorkouts, user])

  return (
    <div>
      <div className="flex">
        <button className="back-button" onClick={() => navigate(-1)} > 
          <FaArrowLeft style={{ marginRight: '8px' }} />
        </button>
        <div className="session-status">
          <strong>Status:</strong> {currentWorkoutSession?.status ?? "Not Started"}
        </div>
      </div>
      
      <div className="workout-session">
        <div className="workouts">
          {workouts && workouts.map((workout) => (
            <WorkoutDetail key={workout._id} workout={workout} />
          ))}
        </div>
      
        {currentWorkoutSession?.status !== "completed" && <WorkoutForm />}
      </div>
    </div>
  );
}
  
export default WorkoutSession;