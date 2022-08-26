import styled from 'styled-components'
import fundo from '../../../img/estoque.webp'

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  height: 100%;
`

export const Content = styled.div`
  gap: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  box-shadow: 0 1px 2px #0003;
  background-color: white;
  max-width: 500px;
  padding: 40px;
  border-radius: 5px;
  margin-top: 8%;
  border-radius: 10px;
`
export const Label = styled.label`
  font-size: 10px;
  font-weight: 600;
  color: #676767;
`
export const LabelSignup = styled.label`
  font-size: 16px;
  color: #676767;
`
export const labelError = styled.label`
  font-size: 14px;
  color: red;
`
export const Strong = styled.strong`
  cursor: pointer;

  a {
    text-decoration: none;
    color: #676767;
  }
`
export const h1 = styled.h1`
  color: #01579b;
  text-shadow: 2em;
  padding-bottom: 0.5em;
`
export const Footer = styled.footer`
  margin-top: 10%;
`
