import { formatDistanceToNow } from "date-fns"

const WorkoutSessionDetail = ({workoutSession}) => {
  return (  
    <div className="workout-details">
      <h4>{workoutSession.title}</h4>
      <p><strong>Description: {workoutSession.description}</strong></p>
      <p>{formatDistanceToNow(new Date(workoutSession.date_created), { addSuffix: true })}</p>
      <span className="material-symbols-outlined">delete</span>
    </div>
  )
}
export default WorkoutSessionDetail