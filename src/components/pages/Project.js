import { parse, v4 as uuidv4 } from 'uuid'

import styles from './Project.module.css'

import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Loading from '../layout/Loading'
import Container from '../layout/Container'
import ProjectForm from '../project/ProjectForm'
import Message from '../layout/Message'
import ServiceForm from '../service/ServiseForm'
import ServiceCard from '../service/ServiceCard'

function Project() {
  const { id } = useParams()

  const [project, setProject] = useState([])
  const [services, setServices] = useState([])
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [showServiceForm, setShowServiceForm] = useState(false)
  const [message, setMessage] = useState()
  const [type, setType] = useState()

  useEffect(() => {
    setTimeout(() => {
      fetch(`http://127.0.0.1:5000/projects/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(resp => resp.json())
        .then(data => {
          setProject(data)
          setServices(data.services)
        })
        .catch(err => console.log)
    }, 300)
  }, [id])

  function editPost(project) {
    setMessage('')

    if (project.quan < project.budget) {
      setMessage('O estoque não pode ser menor que o custo da saida!')
      setType('erro')
      return false
    }

    fetch(`http://127.0.0.1:5000/projects/${project.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(project)
    })
      .then(resp => resp.json())
      .then(data => {
        setProject(data)
        setShowProjectForm(false)
        setMessage('Estoque atualizado!')
        setType('success')
      })
      .catch(err => console.log(err))
  }

  function createService(project) {
    setMessage('')

    const lastService = project.services[project.services.length - 1]

    lastService.id = uuidv4()

    const lastServiceCost = lastService.cost

    const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

    project.cost = newCost

    const newQuant = parseFloat(project.quan) - parseFloat(lastServiceCost)
    console.log(project)

    project.quan = newQuant

    if (newQuant < parseFloat(project.budget)) {
      setMessage('Saida ultrapaçada, verifique o valor do estoque')
      setType('error')
      project.services.pop()
      return false
    }

    console.log(project.quan, 'newQuant')
    fetch(`http://127.0.0.1:5000/projects/${project.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(project)
    })
      .then(resp => resp.json())
      .then(data => {
        setShowServiceForm(false)
      })
      .catch(err => console.log(err))
  }

  function removeService(id, cost) {
    const servicesUpdated = project.services.filter(
      service => service.id !== id
    )

    const projectUpdated = project

    projectUpdated.services = servicesUpdated
    projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)
    projectUpdated.quan = parseFloat(projectUpdated.quan) + parseFloat(cost)

    fetch(`http://127.0.0.1:5000/projects/${projectUpdated.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(projectUpdated)
    })
      .then(resp => resp.json())
      .then(data => {
        setProject(projectUpdated)
        setServices(servicesUpdated)
        setMessage('Estoque removido com sucesso!')
        setType('success')
      })
      .catch(err => console.log(err))
  }

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm)
  }

  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm)
  }

  return (
    <>
      {project.name ? (
        <div className={styles.project_details}>
          <Container customClass="column">
            {message && <Message type={type} msg={message} />}
            <div className={styles.details_container}>
              <h1>Estoque: {project.name}</h1>
              <button className={styles.btn} onClick={toggleProjectForm}>
                {!showProjectForm ? 'Editar estoque' : 'Fechar'}
              </button>
              {!showProjectForm ? (
                <div className={styles.project_info}>
                  <p>
                    <span>Quantidade do Estoque:</span> {project.quan}{' '}
                    {project.unity.name}
                  </p>

                  <p>
                    <span>Custo do Estoque:</span> R${project.budget}
                  </p>
                  <p>
                    <span>Estoque Utilizado:</span> {project.cost}{' '}
                    {project.unity.name}
                  </p>

                  <p>
                    <span>Unidade de Medida:</span> {project.unity.name}
                  </p>
                  <p>
                    <span>Categoria:</span> {project.category.name}
                  </p>
                </div>
              ) : (
                <div className={styles.project_info}>
                  <ProjectForm
                    handleSubmit={editPost}
                    btnText="Concluir edição"
                    projectData={project}
                  />
                </div>
              )}
            </div>
            <div className={styles.details_container}>
              <h2>Adicione uma saida:</h2>
              <button className={styles.btn} onClick={toggleServiceForm}>
                {!showServiceForm ? 'Adicionar uma saida' : 'Fechar'}
              </button>
              <div className={styles.project_info}>
                {showServiceForm && (
                  <ServiceForm
                    handleSubmit={createService}
                    btnText="Adicionar saida"
                    projectData={project}
                  />
                )}
              </div>
            </div>
            <h2>Saidas</h2>
            <Container customClass="start">
              {services.length > 0 &&
                services.map(service => (
                  <ServiceCard
                    id={service.id}
                    name={service.name}
                    cost={service.cost}
                    description={service.description}
                    unity={service.unity?.name}
                    key={service.id}
                    quan={project.quan}
                    handleRemove={removeService}
                  />
                ))}
              {services.length === 0 && <p>Não há saida cadastradas!</p>}
            </Container>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  )
}

export default Project
