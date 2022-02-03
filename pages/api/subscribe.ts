import { NextApiRequest, NextApiResponse } from 'next';
import { stripe } from '../../services/stripe';
import { getSession } from 'next-auth/client';
import { fauna } from '../../services/fauna';
import { query as q } from 'faunadb';

type User = {
    ref: {
        id: string;
    }

    data: {
        stripe_costumer_id: string
    }
}

export default async(req: NextApiRequest, res: NextApiResponse) => {
    if(req.method === 'POST'){

           const session = await getSession({ req });

           const user: User = await fauna.query(
               q.Get(
                   q.Match(
                       q.Index('user_by_email'),
                       q.Casefold(session.user.email)
                   )
               )
           )

           let costumerId = user.data.stripe_costumer_id;

           if(!costumerId){
            const stripeCostumer = await stripe.customers.create({
                email: session.user.email,
                // metadata
             });
  
             await fauna.query(
               q.Update(
                   q.Ref(q.Collection('users'), user.ref.id),
                   {
                       data: {
                           stripe_costumer_id: stripeCostumer.id
                       }
                   }            
               )
            )

           costumerId = stripeCostumer.id
        }

           const StripeChekoutSession = await stripe.checkout.sessions.create({
                 customer: costumerId,
                 payment_method_types: ['card'],
                 billing_address_collection: 'required',
                 line_items: [{
                      price: 'price_1IsubeFdilcC46vbALDCq1So', quantity: 1 
                 }],
                 mode: 'subscription',
                 allow_promotion_codes: true,
                 success_url: 'http://localhost:3000/posts',
                 cancel_url: 'http://localhost:3000'
           });
           res.status(200).json({ sessionId: StripeChekoutSession.id })

    } else{
        res.setHeader('Allow',  'POST');
        console.log(process.env.STRIPE_SUCCESS_URL)
        res.status(405).end('Method not Allowed')
    }
}