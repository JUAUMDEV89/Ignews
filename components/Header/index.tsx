import Link from 'next/link'

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
                        <Link href="/">
                            <a>Home</a>
                        </Link>
                    </div>

                    <div>
                        <Link href="/posts" prefetch>
                            <a>Posts</a>
                        </Link>
                    </div>
                </nav>
             </div>

             <SignInButton />
         </div>
      </header>
  )
}