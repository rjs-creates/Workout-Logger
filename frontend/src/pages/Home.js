import { useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext.js";
import { useWorkoutSessionsStore, selectWorkoutSessions, setWorkoutSessions } from "../stores/useWorkoutSessionsStore.js";
import WorkoutSessionDetail from "../components/WorkoutSessionDetails.js";

const Home = () => {
  const workoutSessions = useWorkoutSessionsStore(selectWorkoutSessions);
  const setWorkoutSessionsState = useWorkoutSessionsStore(setWorkoutSessions);
  const { user } = useAuthContext();

  // const [title, setTitle] = useState("");
  // const [description, setDescription] = useState("");
  // const [error, setError] = useState(null);

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

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post("/api/sessions/", { title, description }, {
  //       headers: {
  //         "Authorization": `Bearer ${user.token}`
  //       },
  //     });
  //     if (response.status === 201) {
  //       setWorkoutSessions([...workoutSessions, response.data]);
  //       setTitle("");
  //       setDescription("");
  //       // setError(null);
  //     }
  //   } catch (err) {
  //     // setError("Failed to create session");
  //   }
  // };

  return (
    <div>
      {workoutSessions && workoutSessions.map((session) => (
        <WorkoutSessionDetail key={session._id} workoutSession={session} />
      ))}
    </div>
  );
};

export default Home;