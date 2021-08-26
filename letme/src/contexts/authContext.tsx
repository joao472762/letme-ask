
import {createContext, useEffect, useState, ReactNode} from 'react'
import {firebase,auth} from '../services/firebase'

type userProps = {

    id: string;
    name: string;
    photo: string 
  }
  
type AuthContextProps = {
user: userProps | undefined;
signInWithGoogle: () => Promise<void>
}

type AuthContextProviderProps = {
    children: ReactNode
}
export const AuthContext = createContext({} as AuthContextProps)

export function AuthContextProvider(props:AuthContextProviderProps){
    useEffect(() =>{
        const unsubscribe = auth.onAuthStateChanged(User=>{
          if(User){
            
            const {displayName,photoURL,uid} = User
      
            if(!displayName || !photoURL){
              throw new Error('Missing information from Google acount')
            }
            setUser({
              id: uid,
              name: displayName,
              photo: photoURL
            })
      
          }
        }) 
        return  () => {unsubscribe()}
      },[])
    
     const [user, setUser] = useState<userProps>()
    
    
    
     async function signInWithGoogle(){
    
        const provider = new firebase.auth.GoogleAuthProvider()
    
        const result = await auth.signInWithPopup(provider)
    
        if(result.user){
          const {displayName,photoURL,uid} = result.user
    
          if(!displayName || !photoURL){
            throw new Error('Missing information from Google acount')
          }
          setUser({
            id: uid,
            name: displayName,
            photo: photoURL
          })
    
        }
      }
    return(
        <AuthContext.Provider value={{user,signInWithGoogle}}>
            {props.children}
        </AuthContext.Provider>
    );

}