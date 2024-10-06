'use server'

import prisma from '@/lib/prisma'

export async function POST(req: Request, res: Response) {
    const inputs = await req.json()
    console.log(inputs.responseData)
    const {firstName, lastName, email, time, guestCount} = inputs.responseData
    const eventReponse = {
      firstName: firstName,
      lastName: lastName,
      email: email, 
      time: time,
      guestcount: guestCount
    }
    const entry = await prisma.response.create({data: eventReponse});
    const updateTimeSlot = await prisma.timeslot.update({
      where:{
        id: time
      },
      data: {
        filled: {
          increment: 1,
        },
      }
    })
    const timeSlot = await prisma.timeslot.findUnique({
      where: {
        id: time
      }
    })
    if(timeSlot && timeSlot.filled >= timeSlot.maxcount ){
      const closeTimeSlot = await prisma.timeslot.update({
        where: {
          id: timeSlot?.id
        },
        data: {
          open: false
        }
      })
    }
    res = new Response(JSON.stringify(entry),{ status: 200, statusText: 'success'})
    return res
}