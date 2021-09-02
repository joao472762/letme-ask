import logo from '../assets/images/logo.svg'
import emptyQuestion from '../assets/images/empty-questions.svg'

import { Button } from '../components/button';
import {RoomCode} from '../components/RoomCode'

import {useAuth} from '../hooks/useAuth'
import { useRoom } from '../hooks/useRoom';


import { useParams } from 'react-router-dom';
import { FormEvent,  useState } from 'react';
import { database } from '../services/firebase';
import { Questions } from '../components/questions';

import '../styles/rom.scss'
import '../styles/adminRoom.scss'

type parmsProps = {
    id:string
}

export function AdminRoom(){
    
    const {signInWithGoogle, user } = useAuth()
    const [newQuestion, setNewQuestion] = useState('')
    const params = useParams<parmsProps>()
    const roomId = params.id
    const {questions,title}= useRoom(roomId)

    
    async function handleSendQuestion(event:FormEvent){
        event.preventDefault()

        if(newQuestion.trim() === ''){
            return;
        }
        if(!user){
            throw new Error('to send question, you must be log in')
        }
        const question = {
            content: newQuestion,
            author:{
                name: user.name,
                avatar: user.photo},
            isHighlighted: false,
            isAswer: false
        }
        await database.ref(`rooms/${roomId}/questions`).push(question)
        
        setNewQuestion('')
    }

    return(

        <div id="partcipantRoom">

            <header>
                <img src={logo} alt="logo escrito letmeask" />
                <div>
                   <RoomCode code={roomId}/>
                   <Button isOutlined>Encerrar Sala</Button>
                </div>
            </header>

            <main>

                <div className="roomTitle">
                    <h1>
                        {title}  
                    </h1>
                    {questions.length > 0 && (
                        <span>
                        {questions.length} perguntas
                    </span>
                    )}
                </div>

              
                {questions.length < 1 ?(
                <section>
                    <img src={emptyQuestion} alt="" />
                    <h2>Nenhuma pergunta por aqui...</h2>
                    
                </section>
                ):(
                    questions.map(question =>{
                        return(
                            <Questions
                            key= {question.id}
                            author = {question.author}
                            content = {question.content}

                            />
                        );
                    })
                )}
            </main>

        </div>
    );
}