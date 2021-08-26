import ilustration from '../assets/images/illustration.svg'
import logo from '../assets/images/logo.svg'

import '../styles/global.scss'
import '../styles/auth.scss'
import '../styles/button.scss' 


import { Button } from '../components/button';
import { useAuth } from '../hooks/useAuth'

import { Link } from 'react-router-dom'


export function NewRoom(){
    const {user} = useAuth()

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
                <h2>
                    Crie uma nova Sala {user?.name}
                </h2>
                

                <form>
                    <input 
                    type="text"
                    placeholder="Nome da Sala" />

                    <Button type='submit'>
                        <span>Criar Sala</span>
                    </Button>
                </form>
                <section>
                    <p>quer entrar em uma sala já existente?<Link to="/" target="_self"> Clique aqui</Link></p>
                </section>
            </main>
        </div>
    );
}