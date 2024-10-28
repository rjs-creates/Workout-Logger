import { useEffect } from "react";
import WorkoutDetail from "../components/WorkoutDetails.js";
import axios from "axios"
import WorkoutForm from "../components/WorkoutForm.js";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext.js";

const Home = () => {
  const {workouts, dispatch} = useWorkoutsContext()

  useEffect(() => {
    const fetchWorkOut = async() => {
      const response = await axios.get("/api/workouts/")
      if(response.status === 200){
        const data = await response.data
        dispatch({type: 'SET_WORKOUTS', payload: data})
      }
    }
    fetchWorkOut()
  }, [dispatch])

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