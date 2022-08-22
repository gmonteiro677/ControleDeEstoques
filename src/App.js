import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Container from './components/layout/Container.js'
import Company from './components/pages/Company.js'
import Contact from './components/pages/Contact.js'
import Home from './components/pages/Home.js'
import Newproject from './components/pages/Newproject'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Projects from './components/pages/Projects.js'
import Project from './components/pages/Project.js'

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Container customClass="min_height">
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/projects">
            <Projects />
          </Route>
          <Route path="/company">
            <Company />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/newproject">
            <Newproject />
          </Route>
          <Route path="/project/:id">
            <Project />
          </Route>
        </Container>
      </Switch>
      <Footer />
    </Router>
  )
}

export default App
