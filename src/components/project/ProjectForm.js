import { useState, useEffect } from 'react'

import styles from './ProjectForm.module.css'
import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'

function ProjectForm({ handleSubmit, btnText, projectData }) {
  const [categories, setCategories] = useState([])
  const [project, setProject] = useState(projectData || {})
  const [unity, setUnity] = useState([])

  useEffect(() => {
    fetch('http://127.0.0.1:5000/categories', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(data => {
        setCategories(data)
      })
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    fetch('http://127.0.0.1:5000/unity', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(data => {
        setUnity(data)
      })
      .catch(err => console.log(err))
  }, [])

  const submit = e => {
    e.preventDefault()
    handleSubmit(project)
  }

  function handleChange(e) {
    setProject({ ...project, [e.target.name]: e.target.value })
  }

  function handleCategory(e) {
    setProject({
      ...project,
      category: {
        id: e.target.value,
        name: e.target.options[e.target.selectedIndex].text
      }
    })
  }
  function handleUnity(e) {
    setProject({
      ...project,
      unity: {
        id: e.target.value,
        name: e.target.options[e.target.selectedIndex].text
      }
    })
  }

  return (
    <form onSubmit={submit} className={styles.form}>
      <Input
        type="text"
        text="Nome do estoque"
        name="name"
        placeholder="Insira o nome do estoque"
        handleOnChange={handleChange}
        value={project.name ? project.name : ''}
      />
      <Input
        type="number"
        text="Orçamento do estoque"
        name="budget"
        placeholder="Insira o custo total"
        handleOnChange={handleChange}
        value={project.budget ? project.budget : ''}
      />
      <Select
        name="unity_id"
        text="Selecione a unidade de medida"
        options={unity}
        handleOnChange={handleUnity}
        value={project.unity ? project.unity.id : ''}
      />
      <Input
        type="number"
        text="Quantidade do estoque"
        name="quan"
        placeholder="Insira a quantidade do estoque"
        handleOnChange={handleChange}
        value={project.quan ? project.quan : ''}
      />
      <Select
        name="category_id"
        text="Selecione a categori"
        options={categories}
        handleOnChange={handleCategory}
        value={project.category ? project.category.id : ''}
      />
      <SubmitButton text={btnText} />
    </form>
  )
}

export default ProjectForm
