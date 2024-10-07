'use server'

import prisma from '@/lib/prisma'

export async function POST(req: Request, res: Response) {
    const reqData = await req.json()

    const {id, value} = reqData.data

    const update = await prisma.response.update({
      where: {
        id: id,
      },
      data: {
        checkin: value
      }
    });

    res = new Response(JSON.stringify(update),{ status: 200, statusText: 'success'})
    return res
}