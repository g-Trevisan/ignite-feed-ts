import { Trash } from 'phosphor-react'
import { ThumbsUp } from "phosphor-react";

import styles from './Comment.module.css'
import { Avatar } from './Avatar';
import { useState } from 'react';

interface CommentProps{
    content: string;
    onDeleteComment: (comment: string) => void //retorno vazio pois a funçao realmente nao retorna nada
}

export function Comment({content, onDeleteComment}: CommentProps){ //definindo a prop deleteComment que foi definida como funçao no Post.jsx (componente pai)
    const [likeCount, setLikeCount] = useState(0);

    function handleLikeComment(){
        setLikeCount((state) => {
            return state + 1
        });
    }

    function handleDeleteComment(){
        console.log("delete")
        onDeleteComment(content)
    }

    return (
        <div className={styles.comment}>
            <Avatar hasBorder = {false} src="https://github.com/g-trevisan.png" alt="" />

            <div className={styles.commentBox}>
                <div className={styles.commentContent}>
                    <header>
                        <div className={styles.authorAndTime}>
                            <strong>Gustavo Trevisan</strong>
                            <time title="Publicado a 1h" dateTime="2024-26-06 23:19:58">Cerca de 1h atrás</time>
                        </div>

                        <button onClick={handleDeleteComment} title='Deletar comentário'>
                            <Trash size={24}/>
                        </button>
                    </header>

                    <p>{content}</p>
                </div>

                <footer>
                    <button
                    onClick={handleLikeComment}>
                        <ThumbsUp size={20} />
                        Aplaudir <span>{likeCount}</span>
                    </button>
                </footer>

            </div>
        </div>
    )
}