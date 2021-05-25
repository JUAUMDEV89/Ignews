import { NextApiRequest, NextApiResponse } from 'next';

interface UsersProps{
    id: number,
    name: string
}

export default function hndle(req: NextApiRequest, res: NextApiResponse<UsersProps>){

    const users = [
        {
            id: 1,
            name: 'João Luis'
        },
        {
            id: 2,
            name: 'Bruna Shushine'
        },
        {
            id: 3,
            name: 'Breno é massa'
        },
    ]

    res.status(200).json(users);
}