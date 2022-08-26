import { createContext, useEffect, useState } from 'react'
import Api from '../service/api'
import { useNavigate } from 'react-router-dom'
import Signup from '../components/pages/Signup'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    const userToken = localStorage.getItem('user_token')
    const usersStorage = localStorage.getItem('users_db')

    if (userToken && usersStorage) {
      const hasUser = JSON.parse(usersStorage)?.filter(
        user => user.email === JSON.parse(userToken).email
      )

      if (hasUser) setUser(hasUser[0])
    }
  }, [])

  const signin = (email, password) => {
    const usersStorage = JSON.parse(localStorage.getItem('users_db'))

    const hasUser = usersStorage?.filter(user => user.email === email)

    if (hasUser?.length) {
      if (hasUser[0].email === email && hasUser[0].password === password) {
        const token = Math.random().toString(36).substring(2)
        localStorage.setItem('user_token', JSON.stringify({ email, token }))
        setUser({ email, password })
        return
      } else {
        return 'E-mail ou senha incorretos'
      }
    } else {
      return 'Usuário Não cadastrado'
    }
  }

  const signup = async (email, password) => {
    // const usersStorage = JSON.parse(localStorage.getItem('users_db'))

    const Cadastro = Api.post('usuarios', { email, password })

    toast.success('Usuário cadastrado')
    navigate('/')
    return Cadastro
  }

  const signout = () => {
    setUser(null)
    localStorage.removeItem('user_token')
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuth: !!user, signin, signup, signout }}
    >
      {children}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        limit={1}
      />
    </AuthContext.Provider>
  )
}
