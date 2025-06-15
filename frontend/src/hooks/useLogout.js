import { useAuthContext } from "./useAuthContext.js"
import { useWorkoutsStore } from "../stores/useWorkoutsStore.js"

export const useLogout = () => {
  const {dispatch} = useAuthContext()
  const setWorkouts = useWorkoutsStore((state) => state.setWorkouts)
  
  const logout = () => {
    localStorage.removeItem("user")
    dispatch({type: "LOGOUT"})
    setWorkouts(null)
  }

  return { logout }
}