import { useSession, signIn } from 'next-auth/client';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripejs';
import styles from './style.module.scss';

export function Subscribe (){

    const [ session ] = useSession();
    
    async function handleSubscribe (){
         if(!session){
            signIn('github');
            return;
         }

         try{
             const response = await api.post('/subscribe');
             
             const { sessionId } = response.data;

             const stripe = await getStripeJs();
             
             await stripe.redirectToCheckout({ sessionId });


         }catch(err){
           console.log(err.message)
         }
    }

    return(
        <button type="button" onClick={handleSubscribe} className={styles.button}>
            Subscribe now
        </button>
    )
}