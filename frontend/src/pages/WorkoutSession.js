import { useEffect } from "react";
import WorkoutDetail from "../components/WorkoutDetails.js";
import axios from "axios"
import WorkoutForm from "../components/WorkoutForm.js";
import { useWorkoutsStore, selectWorkouts, selectSetWorkouts } from "../stores/useWorkoutsStore.js";
import { useAuthContext } from "../hooks/useAuthContext.js";

const WorkoutSession = () => {
  const workouts = useWorkoutsStore(selectWorkouts);
  const setWorkouts = useWorkoutsStore(selectSetWorkouts);
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchWorkOut = async() => {
      const response = await axios.get("/api/workouts/", {
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
    <div className="workout-session">
      <div className="workouts">
        {workouts && workouts.map((workout) => (
          <WorkoutDetail key={workout._id} workout={workout} />
        ))}
      </div>
      <WorkoutForm />
    </div>
  );
}
  
export default WorkoutSession;