'use server'

import prisma from '@/lib/prisma'

export async function POST(req: Request, res: Response) {
    const data = await req.json()
    console.log(data)
    const {name, description, eventID} = data.slotData
    const slot ={
      name: name,
      description: description,
      eventID: eventID,
    }
    const entry = await prisma.altslot.create({data: slot});
    res = new Response(JSON.stringify(entry),{ status: 200, statusText: 'success'})
    return res
}