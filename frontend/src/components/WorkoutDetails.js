const WorkoutDetail = ({workout}) => {
  return (  
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p><strong>Load (kg): {workout.reps}</strong></p>
      <p><strong>Reps: {workout.load}</strong></p>
      <p>{workout.createdAt}</p>
    </div>
  )
}
export default WorkoutDetail