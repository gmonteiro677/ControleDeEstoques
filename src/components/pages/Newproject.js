import styles from './Newproject.module.css'
import ProjectForm from '../project/ProjectForm'
import { useNavigate } from 'react-router-dom'

function Newproject() {
  const history = useNavigate()

  function createPost(project) {
    // initialize cost and services
    project.cost = 0
    project.services = []

    fetch('http://127.0.0.1:5000/projects', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(project)
    })
      .then(resp => resp.json())
      .then(data => {
        // console.log(data)
        //redirect
        history('/projects', {
          state: { message: 'Estoque Criado com Sucesso' }
        })
      })
      .catch(err => console.log(err))
  }

  return (
    <div className={styles.newproject_container}>
      <h1>Criar Estoque</h1>
      <p>Crie seu estoque para depois adicionar um uso</p>
      <ProjectForm handleSubmit={createPost} btnText="Criar estoque" />
    </div>
  )
}

export default Newproject
