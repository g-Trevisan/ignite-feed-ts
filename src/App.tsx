/* eslint-disable react/jsx-key */
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Post, PostType } from './components/Post';
import styles from './components/App.module.css';
import './global.css';



const posts: PostType[] = [
  {
      id: 1,
      author: {
          avatarUrl: 'https://avatars.githubusercontent.com/u/2254731?v=4', //dados referente ao author
          name: 'Gustavo Trevisan',
          role: 'Suporte Técnico - Windel Sistemas',
      },
      content: [
          { type: 'paragraph', content: 'Fala galeraa 👋', }, //definindo como tipo paragrafo
          { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare🚀', },
          { type: 'link', content: 'jane.design/doctorcare', },
      ],
      publishedAt: new Date('2024-08-02 20:00:00') // data de publicaçao do post
  },
  {
      id: 2,
      author: {
          avatarUrl: 'https://avatars.githubusercontent.com/u/143461730?v=4',
          name: 'Zaneleixon',
          role: 'Suporte Técnico - Windel Sistemas',
      },
      content: [
          { type: 'paragraph', content: 'Fala galeraa 👋', },
          { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare🚀', },
          { type: 'link', content: 'jane.design/doctorcare', },
      ],
      publishedAt: new Date('2024-08-05 20:00:00')
  },
];



export function App() {

  return (
    <div>
      <Header/>
      <div className={styles.wrapper}>
        <Sidebar/>
        <main>
            {posts.map(post => {
              return(
                <Post
                    key={post.id}
                    post={post}

                />
              )
            })}
        </main>
      </div>
    </div>
  )
}
