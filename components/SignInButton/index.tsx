import { FiX } from "react-icons/fi";

import { signIn, signOut, useSession } from 'next-auth/client';
import styles from './styles.module.scss';

export function SignInButton(){

    const [ session ] = useSession(); 

    return !session ? (
        <button className={styles.button} onClick={()=>signIn('github')}> 
             <img src="./github.svg" alt="github_icon" />
             Sing in with GitHub
        </button>

    ) : (
        <button className={styles.button} onClick={()=>signOut()}> 
             <img src="./github_green.svg" alt="github_icon" />
             { session.user.name }
             <FiX  style={{ marginLeft: 10 }} />
        </button>
    )
     
}