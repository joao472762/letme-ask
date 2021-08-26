import ilustration from '../assets/images/illustration.svg'
import logo from '../assets/images/logo.svg'
import googleIcon from '../assets/images/google-icon.svg'
import enter from '../assets/images/enter.svg'

import '../styles/global.scss'
import '../styles/auth.scss'
import '../styles/button.scss' 

import { Button } from '../components/button';
import {useAuth} from '../hooks/useAuth'

import {useHistory} from 'react-router-dom'


export function Home(){

    const history = useHistory()
    const {user,signInWithGoogle} = useAuth()

    async function handleCreateRoom(){
        if(!user){
            await signInWithGoogle()
        }
        history.push('/rooms/new')
    }
    return(
        <div id="authentic">
            <aside>
                <img src={ilustration} alt="ilustração" />
                <h1>
                    Toda pergunta tem uma resposta
                </h1>
                <p>
                    Aprenda e compartilhe conhecimento com outras pessoas
                </p>
            </aside>
            <main>
                <img src={logo} className='logo' alt="logo let me ask" />

                <button onClick={handleCreateRoom}>
                   
                    <img src={googleIcon} alt="icone do Google" /> <span>Entrar com o Google</span>
                    
                </button>

                <div className="separator">
                    ou entre um uma sala
                </div>

                <form>
                    <input 
                    type="text"
                    placeholder="Digite o código da sala" />

                    <Button type='submit'>
                        <img src={enter} alt="" /> <span>Entrar na Sala</span>
                    </Button>
                </form>
            </main>
        </div>
    );
}