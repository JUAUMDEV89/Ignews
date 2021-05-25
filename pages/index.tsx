import {  GetStaticProps } from 'next';
import { Subscribe } from '../components/Subscribe';
import { stripe } from '../services/stripe';
import styles from '../styles/home.module.scss';

interface HomeProps{
   product:{
      priceId: string,
      amount: number
   }
}

export default function Home({ product }: HomeProps) {
  return (
    <main className={styles.main}>
       <div className={styles.container}>
          <div className={styles.left}>
              <div className={styles.headerHome}>
                <img src="./clapping.svg" alt="clapping" />

                <span>Hey, welcome</span>
              </div>

              <h1>
                 News about the <strong>React</strong> world
              </h1>

              <span className={styles.description}>
                 Get acess to all the publications
                 <strong>for { product.amount } month </strong>
              </span>

              <Subscribe priceId={product.priceId} />

          </div>

          <div className={styles.right}>
             <img src="./avatar.svg" alt="avatar" />
          </div>
       </div>
    </main>
  )
}

export const getStaticProps: GetStaticProps = async()=>{

   const price = await stripe.prices.retrieve('price_1IsubeFdilcC46vbALDCq1So', {
      expand: ['product']
   }); 

   const product = {
      priceId: price.id,
      amount: new Intl.NumberFormat('en-US', {
         style: 'currency',
         currency: 'USD'
      }).format(price.unit_amount / 100)
   }

    return{
        props:{
           product
        },
        revalidate: 60 * 60 * 24       
    }
}
