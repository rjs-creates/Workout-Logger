import { formatDistanceToNow } from "date-fns"
import { useNavigate } from "react-router-dom"
import { setCurrentWorkoutSession, useWorkoutSessionsStore } from "../stores/useWorkoutSessionsStore";

const WorkoutSessionDetail = ({ workoutSession }) => {
  const navigate = useNavigate();
  const setCurrentWorkoutSessionState = useWorkoutSessionsStore(setCurrentWorkoutSession);
  

  const handleClick = () => {
    setCurrentWorkoutSessionState(workoutSession);
    navigate(`/workout-sessions/${workoutSession._id}`);
  };

  return (
    <div className="workout-details" onClick={handleClick} style={{ cursor: "pointer" }}>
      <h4>{workoutSession.title}</h4>
      <p><strong>Description: {workoutSession.description}</strong></p>
      <p>{formatDistanceToNow(new Date(workoutSession.date_created), { addSuffix: true })}</p>
      <span className="material-symbols-outlined">delete</span>
    </div>
  );
}
export default WorkoutSessionDetail