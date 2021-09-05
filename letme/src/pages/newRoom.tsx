import ilustration from '../assets/images/illustration.svg'
import logo from '../assets/images/logo.svg'


import '../styles/global.scss'
import '../styles/auth.scss'
import '../styles/button.scss' 


import { Button } from '../components/button';
import { useAuth } from '../hooks/useAuth'
import {database} from '../services/firebase'

import {FormEvent, useState} from 'react'
import { Link ,useHistory} from 'react-router-dom'



export function NewRoom(){
    const {user} = useAuth()
    const history = useHistory()
    const [newRoom, setNewRoom] = useState('')

   async function handleCreateRoom(event:FormEvent){
       event.preventDefault()
       
       if(newRoom.trim() === ''){
           return;
        }
        
       const roomReef = database.ref('rooms')
       const firebaseRoom = await roomReef.push({
           title: newRoom,
           authorId: user?.id
       })
       
       history.push(`/admin/${firebaseRoom.key}`)
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
                <h2>
                    Crie uma nova Sala {user?.name}
                </h2>
                

                <form  onClick={handleCreateRoom}>
                    <input 
                    type="text"
                    placeholder="Nome da Sala"
                    onChange = {event => setNewRoom(event.target.value)}
                    value = {newRoom}
                    />

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