import { useAuthContext } from "./useAuthContext.js"
import { useWorkoutsContext } from "./useWorkoutsContext.js"

export const useLogout = () => {
  const {dispatch} = useAuthContext()
  const { dispatch: workoutsDispatch } = useWorkoutsContext()
  
  const logout = () => {
    localStorage.removeItem("user")
    dispatch({type: "LOGOUT"})
    workoutsDispatch({type: 'SET_WORKOUTS', payload: null})
  }

  return { logout }
}