import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

import Container from '../layout/Container'
import Message from '../layout/Message'
import styles from './Projects.module.css'
import LinkButton from '../layout/LinkButton'
import ProjectCard from '../project/ProjectCard'
import Loading from '../layout/Loading'

function Projects() {
  const [projects, setProjects] = useState([])
  const [removeLoading, setRemolveLoading] = useState(false)
  const [projectMessage, setProjectMessage] = useState('')

  const location = useLocation()
  let message = ''

  if (location.state) {
    console.log(location.state)
    message = location.state.message
  }

  useEffect(() => {
    setTimeout(() => {
      fetch('http://127.0.0.1:5000/projects', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(resp => resp.json())
        .then(data => {
          console.log(data)
          setProjects(data)
          setRemolveLoading(true)
        })
        .catch(err => console.log(err))
    }, 300)
  }, [])

  function removeProject(id) {
    fetch(`http://127.0.0.1:5000/projects/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(() => {
        setProjects(projects.filter(project => project.id !== id))
        setProjectMessage('Estoque removido com sucesso!')
      })
      .catch(err => console.log(err))
  }

  return (
    <div className={styles.project_container}>
      <div className={styles.title_container}>
        <h1 onClick={() => console.log(location.state.message)}>
          Meus Estoques
        </h1>
        <LinkButton to="/newproject" text="Criar Estoque" />
      </div>
      {message && <Message type="success" msg={message} />}
      {projectMessage && <Message type="success" msg={projectMessage} />}
      <Container customClass="start">
        {projects.length > 0 &&
          projects.map(project => (
            <ProjectCard
              id={project.id}
              name={project.name}
              budget={project.budget}
              category={project.category.name}
              key={project.id}
              unity={project.unity.nome}
              quan={project.quan}
              handleRemove={removeProject}
            />
          ))}
        {!removeLoading && <Loading />}
        {removeLoading && projects.length === 0 && (
          <p>Não há estoque cadastrados!</p>
        )}
      </Container>
    </div>
  )
}

export default Projects
