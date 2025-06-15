import { useAuthContext } from "./useAuthContext.js"
import { selectSetWorkouts, useWorkoutsStore } from "../stores/useWorkoutsStore.js"

export const useLogout = () => {
  const {dispatch} = useAuthContext()
  const setWorkouts = useWorkoutsStore(selectSetWorkouts)
  
  const logout = () => {
    localStorage.removeItem("user")
    dispatch({type: "LOGOUT"})
    setWorkouts(null)
  }

  return { logout }
}