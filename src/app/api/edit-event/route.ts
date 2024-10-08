'use server'

import prisma from '@/lib/prisma'

export async function POST(req: Request, res: Response) {
    const reqData = await req.json()

    const {id, name, description} = reqData.data

    const update = await prisma.event.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        description: description
      }
    });

    res = new Response(JSON.stringify(update),{ status: 200, statusText: 'success'})
    return res
}