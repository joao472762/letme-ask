import logo from '../assets/images/logo.svg'
import emptyQuestion from '../assets/images/empty-questions.svg'

import { Button } from '../components/button';
import {useAuth} from '../hooks/useAuth'

import '../styles/rom.scss'

export function Room(){
    const {signInWithGoogle} = useAuth()
    return(
        <div id="partcipantRoom">
            <header>
                <img src={logo} alt="logo escrito letmeask" />
                <div>
                    código da sala
                </div>
            </header>
            <main>
                <h1>
                    Sala React Q&amp; A
                </h1>
                <form action="">
                    <textarea  placeholder="Oque você quer perguntar"></textarea>
                    <div>
                        <p>
                            para enviar uma pergunta <span onClick={signInWithGoogle}>faça login</span>
                        </p>
                        <Button type='submit'>Enviar Pergunta</Button>
                    </div>
                </form>
                <section>
                    <img src={emptyQuestion} alt="" />
                    <h2>Nenhuma pergunta por aqui...</h2>
                    <p>faça o seu login e seja a primeira pessoa a fazer uma pergunta</p>
                </section>
            </main>

        </div>
    );
}