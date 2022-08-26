import { Fragment } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../components/pages/Home'
import Signin from '../components/pages/Signin'
import Signup from '../components/pages/Signup'
import useAuth from '../hooks/useAuth'
import NewProject from '../components/pages/Newproject'
import Projects from '../components/pages/Projects'
import Company from '../components/pages/Company'
import Contact from '../components/pages/Contact'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Project from '../components/pages/Project'

const Private = ({ Item }) => {
  const isAuth = useAuth()

  return isAuth?.isAuth ? <AuthRoutes /> : <SignInRoutes />
}

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<Home />} />
      <Route exact path="/home" element={<Home />} />
      <Route exact path="/projects" element={<Projects />} />
      <Route exact path="/company" element={<Company />} />
      <Route exact path="/contact" element={<Contact />} />
      <Route exact path="/newProject" element={<NewProject />} />
      <Route exact path="/project/:id" element={<Project />} />
    </Routes>
  )
}

const SignInRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Signin />} />
      <Route exact path="/signup" element={<Signup />} />
      <Route path="*" element={<Signin />} />
    </Routes>
  )
}

const RoutesApp = () => {
  const isAuth = useAuth()

  return (
    <BrowserRouter>
      {isAuth?.isAuth && <Navbar />}
      <Private />
    </BrowserRouter>
  )
}

export default RoutesApp
