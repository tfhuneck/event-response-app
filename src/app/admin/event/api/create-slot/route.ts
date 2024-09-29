'use server'

import prisma from '@/lib/prisma'

export async function POST(req: Request, res: Response) {
    const data = await req.json()
    console.log(data)
    const {name, time, duration, maxcount, eventID} = data.slotData
    const slot ={
      time: time,
      name: name,
      duration: duration, 
      maxcount: maxcount,
      eventID: eventID,
      filled: 0,
      open: true
    }
    const entry = await prisma.timeslot.create({data: slot});
    res = new Response(JSON.stringify(entry),{ status: 200, statusText: 'success'})
    return res
}