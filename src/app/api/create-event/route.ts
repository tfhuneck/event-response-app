'use server'

import prisma from '@/lib/prisma'

export async function POST(req: Request, res: Response) {
    const inputs = await req.json()
    console.log(inputs)
    const {name, tag, dateStart, dateEnd, description, duration,  maxcount} = inputs.data
    const event ={
      dateStart: dateStart,
      dateEnd: dateEnd,
      name: name,
      tag: tag,
      description: description,
      duration: duration, 
      maxcount: maxcount
    }
    const entry = await prisma.event.create({data: event});
    res = new Response(JSON.stringify(entry),{ status: 200, statusText: 'success'})
    return res
}