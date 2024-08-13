import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { Comment } from './Comment';
import { Avatar } from './Avatar'
import styles from './Post.module.css';
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'; //importando o useState para monitorar variáveis e alterar valores

// author: { avatar_url: "", name: "", role: ""}
// publishedAt: Date
// content: String


interface Author { //definindo tipagem
    name: string,
    role: string,
    avatarUrl: string
}

interface Content{
    type: 'paragraph' | 'link';
    content: string;
}

export interface PostType {
    id: number,
    author: Author,
    publishedAt: Date;
    content: Content[];
}

interface PostProps {
    post: PostType
}


export function Post({post}: PostProps){
    const [comments, setComments] = useState([  // iniciando o useState com a variável comments (valor inicial) e setComments (para atualizar o valor inicial)
        "Post muito bacana, hein?!"
    ])

    const [newCommentText, setNewCommentText] = useState('') // iniciando o estado com texto vazio

    const publishedDateFormatted =  format(post.publishedAt, "d 'de' LLLL 'às' HH:mm'h'",{
        locale: ptBR,
    })

    const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt, {
        locale: ptBR,
        addSuffix: true,
    })
    
    function handleCreateNewComment(event: FormEvent){
        event.preventDefault()
        setComments([...comments, newCommentText]) //utiliza o hook useState para atualizar o valor de comments. Usamos o spread operator para pegar o array anterior e adicionar mais um valor.
        setNewCommentText('') // após a adiçao do comentário, será definido o valor do comentario como um valor vazio, para que o textarea fique em branco

    }

    function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('')
        setNewCommentText(event.target.value)
        // console.log(event.target.value)
    }

    function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>){
        // console.log(event)       
        event.target.setCustomValidity('Esse campo é OBRIGATÓRIO HAHAHA!!')
    }

    function deleteComment(commentToDelete: string){
        // imutabilidade -> as variáveis não sofrem mutação
        const commentsWithoutDeletedOne = comments.filter(comment =>{
            return comment != commentToDelete
        })

        setComments(commentsWithoutDeletedOne)
    }

    const isNewCommentEmpty = newCommentText.length == 0

    return(
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar src={post.author.avatarUrl}/>
                    <div className={styles.authorInfo}>
                        <strong>{post.author.name}</strong>
                        <span>{post.author.role}</span>
                    </div>
                </div>

                <time title={publishedDateFormatted} dateTime={post.publishedAt.toISOString()}>
                    {publishedDateRelativeToNow}
                </time>
            </header>

            <div className={styles.content}>
                {post.content.map(line =>{ //mapenado o content que está presente no app.jsx, onde é apresentado paragrafos e linhas
                    if (line.type == 'paragraph'){
                        return <p key={line.content}>{line.content}</p>;
                    } else if (line.type == 'link'){
                        return <p key={line.content}><a href="#">{line.content}</a></p>
                    }
                })}
            </div>

            <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
                <strong>Deixe seu feedback</strong>       

                <textarea
                    placeholder='Deixe seu comentário'
                    name='comment'
                    value={newCommentText} //receberá o valor do state newCommentText, que é o comentário em si
                    onChange={handleNewCommentChange}
                    onInvalid={handleNewCommentInvalid}
                    required
                />
                <footer>
                    <button type='submit' disabled={isNewCommentEmpty}>
                        Deixe seu comentário
                    </button>
                </footer>
            </form>

            <div className={styles.commentList}>
                {comments.map(comment => { //mapeando os comentarios dos posts
                    return (
                        <Comment 
                            key={comment} 
                            content={comment} 
                            onDeleteComment={deleteComment}/>
                        )
                    // retornando o comentario mapeado com a prop content que recebe cada comment mapeado no array
                    // passamos dentro do comment, a prop deleteComment que recebe como valor a funçao de remover o comentario, para que no componente Comment.jsx, possamos acessar a prop e realizar a remoçao correta do comentário
                })}
                
            </div>    
        </article>
    )

}