import { Container, Title, Form, ContainerInputs, Input, InputLabel } from './style'
import { useRef } from 'react'
import api from '../../services/api.js'
import DefaultButton from '../../components/Button'
import TopBackground from '../../components/TopBackground'
import { useNavigate } from 'react-router-dom'

function Home() {

  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()

  const navigate = useNavigate()

  async function registerNewUser() {
    const data = await api.post('/usuarios', {
      email: inputEmail.current.value,
      age: parseInt(inputAge.current.value),
      name: inputName.current.value
    })

    console.log(data)
  }

  return (
    <Container>
      <TopBackground/>

      <Form action="">
        <Title>Cadastrar Usuários</Title>

        <ContainerInputs>

          <div>
            <InputLabel>Nome<span>*</span></InputLabel>
            <Input type="text" placeholder='Nome do Usuário' ref={inputName} />
          </div>

          <div>
            <InputLabel>Idade<span>*</span></InputLabel>
            <Input type="number" placeholder='Idade do Usuário' ref={inputAge} />
          </div>

        </ContainerInputs>

        <div style={{width:'100%'}}>
          <InputLabel>Email<span>*</span></InputLabel>
          <Input type="email" placeholder='Email do Usuário' ref={inputEmail}/>
        </div>

        <DefaultButton type='button' onClick={registerNewUser} theme='primary'>Cadastrar Usuário</DefaultButton>
      </Form>

      <DefaultButton type='button' onClick={() => navigate('/lista-de-usuarios')}>Ver Lista de Usuários</DefaultButton>

    </Container>
  )
}

export default Home

