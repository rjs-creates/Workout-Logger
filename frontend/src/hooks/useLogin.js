import { useState } from "react"
import { useAuthContext } from "./useAuthContext.js"
import axios from "axios"

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const {dispatch} = useAuthContext()
  
  const login = async(email, password) => {
    setIsLoading(true)
    setError(null)

    try{
      const response = await axios.post('/api/user/login', {
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

  return { error, isLoading, login }
}