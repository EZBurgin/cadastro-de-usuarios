import DefaultButton from '../../components/Button'
import TopBackground from '../../components/TopBackground'
import api from '../../services/api'
import { useEffect, useState } from 'react'
import { Container, Title, ContainerUsers, CardUsers,AvatarUser,TrashIcon } from './styles'
import { useNavigate } from 'react-router-dom'

function ListUsers() {

    const [users, setUsers] = useState([])
    const navigate = useNavigate()

    useEffect(() => {                                           
        async function getUsers() {
            const { data } = await api.get('/usuarios')

            setUsers(data)
        }

        getUsers()
    }, [])

    async function deleteUsers(id) {
        await api.delete(`/usuarios/${id}`)

        const updatedUsers = users.filter( user => user.id != id)

        setUsers(updatedUsers)
    }

    return (
        <Container>
            <TopBackground />
            <Title>Lista de Usuários</Title>

            <ContainerUsers>
                {users.map((user) => (
                    <CardUsers key={user.id}>
                        <AvatarUser src={`https://avatar.iran.liara.run/public?username=${user.id}`}/>
                        <div>
                            <h3>{user.name}</h3>
                            <p>{user.age}</p>
                            <p>{user.email}</p>
                        </div>
                        <TrashIcon onClick={() => deleteUsers(user.id)}/>
                    </CardUsers>
                ))}
            </ContainerUsers>

            <DefaultButton type="button" onClick={() => navigate('/') }>Voltar</DefaultButton>
        </Container>

    )
}

export default ListUsers