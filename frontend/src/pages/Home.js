import { useEffect, useState } from "react";
import WorkoutDetail from "../components/WorkoutDetails";
import axios from "axios"

const Home = () => {

  const [workouts, setWorkouts] = useState(null)

  useEffect(() => {
    const fetchWorkOut = async() => {
      const response = await axios.get("/api/workouts/")
      const data = await response.data
      
      if(response.status === 200){
        setWorkouts(data)
      }
    }

    fetchWorkOut()
  }, [])

  return (
    <div className="home">
      <div className="workouts">
        {workouts && workouts.map((workout) => (
          <WorkoutDetail key={workout._id} workout={workout} />
        ))}
      </div>
    </div>
  );
}
  
export default Home;