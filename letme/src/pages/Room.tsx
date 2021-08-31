import logo from '../assets/images/logo.svg'
import emptyQuestion from '../assets/images/empty-questions.svg'

import { Button } from '../components/button';
import {useAuth} from '../hooks/useAuth'
import {RoomCode} from '../components/RoomCode'


import { useParams } from 'react-router-dom';
import { FormEvent, useEffect, useState } from 'react';

import '../styles/rom.scss'
import { database } from '../services/firebase';

type parmsProps = {
    id:string
}

type FirebaseQuestion = Record<string,{
    author: {
        nome: string,
        avatar:string
    },
    content: string,
    isHighlighted: boolean,
    isAswer: boolean
    
}>
type questionsProps = {
    id: string,
    author: {
        nome: string,
        avatar:string
    },
    content: string,
    isHighlighted: boolean,
    isAswer: boolean
 
}
export function Room(){
    
    const {signInWithGoogle, user } = useAuth()
    const [newQuestion, setNewQuestion] = useState('')
    const params = useParams<parmsProps>()
    const roomId = params.id
    const [questions,setQuestions] = useState<questionsProps[]>([])
    const [title,setTitle] = useState('')


    useEffect(() => {
        
        const roomRef = database.ref(`rooms/${roomId}`)
        roomRef.on('value', room =>{
            const databaseRoom = room.val()
            
            const firebaseQuestion = room.val().questions as FirebaseQuestion ?? {};
            
            const parseQuestion = Object.entries(firebaseQuestion).map(([key,value]) => {
                return{
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighlighted: value.isHighlighted,
                    isAswer: value.isAswer
                }
            })
            setTitle(databaseRoom.title)
      
            setQuestions(parseQuestion)
            console.log(parseQuestion)            
        })
        
    },[roomId])



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

                <form onSubmit={handleSendQuestion}>

                    <textarea  
                    placeholder="Oque você quer perguntar"
                    onChange = {event => setNewQuestion(event.target.value)}
                    value = {newQuestion}
                    />
                    <div>
                        {user ? (
                            <p className="logIn">
                                <img src={user.photo} alt={user.name} /> <span>{user.name}</span>      
                            </p>
                        ) 
                        : (
                            <p className="logOut">
                            para enviar uma pergunta 
                            <span onClick={signInWithGoogle}>faça login</span>
                        </p>
     
                        )}
                       
                                          <Button 
                        type='submit' disabled={!user}>Enviar Pergunta
                        </Button>
                    </div>

                </form>

                <section>
                    <p>
                        {JSON.stringify(questions)}
                    </p>
                    <img src={emptyQuestion} alt="" />
                    <h2>Nenhuma pergunta por aqui...</h2>
                    <p>faça o seu login e seja a primeira pessoa a fazer uma pergunta</p>
                </section>
            </main>

        </div>
    );
}