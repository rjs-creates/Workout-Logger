import axios from "axios";
import { useAuthContext } from "./useAuthContext.js";
import { useState } from "react";

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const {dispatch} = useAuthContext()

  const signup = async (email, password) => {
    setIsLoading(true)
    setError(null)

    try{
      const response = await axios.post('/api/user/signup', {
        email: email,
        password: password
      })

      if (response.status !== 200 ) {
        setError(response.data.error)
        return
      }  
      localStorage.setItem('user', JSON.stringify(response.data))
      dispatch({type: 'LOGIN', payload: response.data})
    } catch (e) {
      setError(e.response.data.error)
    } finally {
      setIsLoading(false)
    }
  }

  return {error, isLoading, signup}
}