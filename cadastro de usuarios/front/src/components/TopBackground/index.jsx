import {Background} from "./style"
import UsersImage from '../../assets/users.png'

function TopBackground() {

    
    return (
        <Background>
            <img src={UsersImage} alt="img-user" />
        </Background>
    )
}

export default TopBackground