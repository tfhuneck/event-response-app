'use server'

import prisma from '@/lib/prisma'

export async function POST(req: Request, res: Response) {
    const inputs = await req.json()
    console.log(inputs.responseData)
    const {firstName, lastName, email, comment, eventID} = inputs.responseData
    const eventReponse = {
      firstName: firstName,
      lastName: lastName,
      email: email, 
      comment: comment,
      eventID: eventID
    }
    const entry = await prisma.altResponse.create({data: eventReponse});
    res = new Response(JSON.stringify(entry),{ status: 200, statusText: 'success'})
    return res
}