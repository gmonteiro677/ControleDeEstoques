import React, { useState } from 'react'
import Input from '../../Input'
import Button from '../../Button'
import * as C from './styles'
import { Link } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'
import Api from '../../../service/api'
import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
const Signup = () => {
  const [email, setEmail] = useState('')
  const [emailConf, setEmailConf] = useState('')
  const [senha, setSenha] = useState('')
  const [error, setError] = useState('')

  const { signup } = useAuth()

  async function handleSignup() {
    const dadosUser = await Api.get('usuarios')
    const hasUser = dadosUser.data?.filter(item => item.email === email)

    if (hasUser?.length) {
      toast.warn('Já existe um E-mail cadastrado com esse nome!')
    } else {
      if (!email | !emailConf | !senha) {
        toast.warn('Preencha todos os campos')
        return
      } else if (email !== emailConf) {
        toast.warn('Email são diferentes')
        return
      }
      const res = signup(email, senha)

      if (!res) {
        toast.warn('Não foi possivel fazer o login!')
        return
      }
    }
  }

  return (
    <C.Container>
      <C.Label>Sistema de login</C.Label>
      <C.Content>
        <Input
          type="email"
          placeholder="Digite seu E-mail"
          value={email}
          onChange={e => [setEmail(e.target.value), setError('')]}
        />
        <Input
          type="email"
          placeholder="Confirme seu E-mail"
          value={emailConf}
          onChange={e => [setEmailConf(e.target.value), setError('')]}
        />
        <Input
          type="password"
          placeholder="Digite sua Senha"
          value={senha}
          onChange={e => [setSenha(e.target.value), setError('')]}
        />
        <C.labelError>{error}</C.labelError>
        <Button Text="Inscrever-se" onClick={handleSignup} />
        <C.LabelSignin>
          Já tem uma conta?
          <C.Strong>
            <Link to="/">&nbsp;Entre</Link>
          </C.Strong>
        </C.LabelSignin>
      </C.Content>
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
    </C.Container>
  )
}

export default Signup
