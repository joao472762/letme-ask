import { useEffect, useState } from "react";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

type questionsProps = {
    id: string,
    author: {
        nome: string,
        avatar:string
    },
    content: string,
    isHighlighted: boolean,
    isAswer: boolean,
    likeCount: number,
    likeId?: string | undefined
 
}
type FirebaseQuestion = Record<string,{
    author: {
        nome: string,
        avatar:string
    },
    content: string,
    isHighlighted: boolean,
    isAswer: boolean
    likes: Record<string,{
        authorId:string
    }>
    
}>

export function useRoom(roomId:string){
    const [questions,setQuestions] = useState<questionsProps[]>([])
    const [title,setTitle] = useState('')
    const {user} = useAuth() 

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
                    isAswer: value.isAswer,
                    likeCount: Object.values(value.likes  ?? {}).length,
                    likeId: Object.entries(value.likes ?? {}).find(([key,like]) => like.authorId === user?.id)?.[0],
                }
            })
            setTitle(databaseRoom.title)
      
            setQuestions(parseQuestion)
             
        })
        return () => {
            roomRef.off('value')
        }
    },[roomId,user?.id]) 

    return ({questions,title}) 
}