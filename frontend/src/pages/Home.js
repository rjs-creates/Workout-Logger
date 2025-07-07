import { useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext.js";
import { useWorkoutSessionsStore, selectWorkoutSessions, setWorkoutSessions } from "../stores/useWorkoutSessionsStore.js";
import WorkoutSessionDetail from "../components/WorkoutSessionDetails.js";

const Home = () => {
  const workoutSessions = useWorkoutSessionsStore(selectWorkoutSessions);
  const setWorkoutSessionsState = useWorkoutSessionsStore(setWorkoutSessions);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await axios.get("/api/workout_sessions", {
          headers: {
            "Authorization": `Bearer ${user.token}`
          },
        });
        if (response.status === 200) {
          setWorkoutSessionsState(response.data);
        }
      } catch (err) {
        // setError("Failed to fetch sessions");
      }
    };

    if (user) {
      fetchSessions();
    }
  }, [selectWorkoutSessions, user]);

  return (
    <div className="flex justify-between gap-24">
      <div className="flex-grow">
        <h1 className="text-2xl font-bold mb-4">Workout Sessions</h1>
        {workoutSessions && workoutSessions.map((session) => (
          <WorkoutSessionDetail key={session._id} workoutSession={session} />
        ))}
      </div>
      <div className="w-1/4">
        <h1 className="text-2xl font-bold mb-4">Goals</h1>
        <textarea
          className="w-full p-2 border rounded"
          rows={5}
          placeholder="Enter your goals here..."
        />
      </div>
    </div>
  );
};

export default Home;