import { useState } from 'react'

import Input from '../form/Input'
import SubmitButton from '../form/SubmitButton'
import styles from '../project/ProjectForm.module.css'
import Message from '../layout/Message'

function ServiceForm({ handleSubmit, btnText, projectData }) {
  const [service, setService] = useState({})
  const [message, setMessage] = useState()
  const [type, setType] = useState()
  function submit(e) {
    e.preventDefault()

    if (projectData.budget > service.quan) {
      projectData.services.push(service)
      handleSubmit(projectData)
    } else {
      // alert('nao foi possivel')
      setMessage('Custo ultrapaçado, verifique o valor')
      setType('error')
    }
  }

  function handleChange(e) {
    setService({ ...service, [e.target.name]: e.target.value })
  }
  console.log(service.quan)

  return (
    <>
      {message && <Message type={type} msg={message} />}
      <form onSubmit={submit} className={styles.form}>
        <Input
          type="text"
          text="Nome da saida"
          name="name"
          placeholder="Insira o nome do estoque"
          handleOnChange={handleChange}
        />
        <Input
          type="number"
          text="Quantidade da saida"
          name="cost"
          placeholder="Insira a quantidade da saida"
          handleOnChange={handleChange}
        />
        <Input
          type="number"
          text="Custo da saida"
          name="quan"
          placeholder="Insira o valor total"
          handleOnChange={handleChange}
        />
        <Input
          type="text"
          text="Descrição da saida"
          name="description"
          placeholder="Descreva a saida"
          handleOnChange={handleChange}
        />
        <SubmitButton text={btnText} />
      </form>
    </>
  )
}

export default ServiceForm
