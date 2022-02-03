import { Client } from '@prismicio/client'

export function getPrismicClient(req?: unknown){
    const prismic = new Client(
       process.env.PRISMIC_ENDPOINT,
       {
           accessToken: process.env.PRISMIC_ACCESS_TOKEN
       }
    )

    return prismic;

}
