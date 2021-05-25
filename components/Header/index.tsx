import { SignInButton } from '../SignInButton';

import styles from './styles.module.scss';

export function Header(){
  return(
      <header className={styles.header}>
         <div className={styles.container}>
             <div className={styles.headerLeftMenu}>
                <img src="./logo.svg" alt="logo" />

                <nav>
                    <div>
                        <span>Home</span>
                    </div>

                    <div>
                        <span>Posts</span>
                    </div>
                </nav>
             </div>

             <SignInButton />
         </div>
      </header>
  )
}