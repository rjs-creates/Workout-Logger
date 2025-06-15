import { useEffect } from "react";
import WorkoutDetail from "../components/WorkoutDetails.js";
import axios from "axios"
import WorkoutForm from "../components/WorkoutForm.js";
import { useWorkoutsStore } from "../stores/useWorkoutsStore.js";
import { useAuthContext } from "../hooks/useAuthContext.js";

const Home = () => {
  const workouts = useWorkoutsStore((state) => state.workouts)
  const setWorkouts = useWorkoutsStore((state) => state.setWorkouts)
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
    <div className="home">
      <div className="workouts">
        {workouts && workouts.map((workout) => (
          <WorkoutDetail key={workout._id} workout={workout} />
        ))}
      </div>
      <WorkoutForm />
    </div>
  );
}
  
export default Home;