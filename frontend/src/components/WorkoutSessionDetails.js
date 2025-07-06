import { formatDistanceToNow } from "date-fns"
import { useNavigate } from "react-router-dom"

const WorkoutSessionDetail = ({ workoutSession }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/workout-session/${workoutSession._id}`);
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