import {  ReactNode } from 'react';
import '../questions/style.scss'

type questionsProps = {
    content: string,
    author: {
        name?: string,
        avatar: string
    };
    children?:ReactNode
}

export function Questions({author,content,children}:questionsProps){
    return(
        <div className="questions">
            <p>
                {content}
            </p>
            <footer>
                <div className="userInfo">
                    <img src={author.avatar} alt={author.name} />
                    <span>{author.name}</span>
                </div>
                <div>{children}</div>
            </footer>
        </div>
    );
}