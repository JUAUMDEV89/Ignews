import styles from '../styles/posts.module.scss';

export default function Posts (){
    return(
        <main className={styles.main}> 
            <div className={styles.container}>
                <h1>Past, Present, and Future of React State Management</h1>

                <span>12 de Março de 2021</span>

                <p>
                    <div>React was introduced in May 2013. Its paradigm shift was that your UI was a function of your state. Given some component state, React can determine what your component will look like. React is built upon the idea of state. However, state has long been one of the most difficult parts of building a React application.</div>
                    <div className={styles.divBotton}>Let's imagine state management in React as a rugged tool belt. You've used this tool belt for years, slowly adding new tools as needed. Each tool serves a very specific purpose. You don't use your hammer to screw in bolts. As a craftsman, you've learned the right time...</div>
                </p>

                <button>
                    Wanna continue reading? <strong>Subscribe now</strong>
                    <img src="./subscribeEmoji.svg" alt="emoji" />
                </button>
            </div>
        </main>
    )
}