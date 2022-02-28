import { NextApiRequest, NextApiResponse } from "next";
import { Readable } from 'stream'
import Stripe from "stripe";
import { stripe } from "../../../services/stripe";
import { SaveSubscription } from "../_lib/managerSubscription";

async function buffer(readable: Readable){

   const chunks = [];

   for await (const chunk of readable){
      chunks.push(
         typeof chunk === "string" ? Buffer.from(chunk) : chunk
      )
   }

   return Buffer.concat(chunks)

}

export const config = {
   api:{
      bodyParse: false
   }
}

const relevantEvents = new Set([
   'checkout.session.completed'
])

export default async (req: NextApiRequest, res: NextApiResponse)=>{
  if(req.method === 'POST'){
   const buf = await buffer(req)
   const secret = req.headers['stripe-signature']

   let event: Stripe.Event;

   try{
      event = stripe.webhooks.constructEvent(buf, secret, process.env.STRIPE_WEBHOOK_SECRET)
   }catch(err){
     console.log('Event Failed: ' + err.message)
   }

   const { type } = event;

   if(relevantEvents.has(type)){
      try {
         switch (type) {
            case 'chekout.session.completed':
               
               const checkoutSession = event.data.object as Stripe.Checkout.Session

               await SaveSubscription(
                  checkoutSession.subscription.toString(),
                  checkoutSession.customer.toString()
               )   

               break;
         
            default:
               break;
         }
      } catch (error) {
         res.json({ error: 'WebHook handler failed!' })
      }
   }else{
      res.json({ received: 'Ok!' });
   }

  }else{
     res.setHeader('Allow', 'POST')
     res.status(405).end('Method not allowed')
  }
}