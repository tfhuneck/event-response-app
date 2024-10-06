'use server'

import prisma from '@/lib/prisma'

export async function DELETE(req: Request, res: Response) {
    const eventId = await req.headers.get('eventId')
    console.log(eventId)
    try{
        const deleteEvent = await prisma.event.delete({
            where: {
                id: eventId!,
            },
        })
        res = new Response(JSON.stringify(deleteEvent),{ status: 200, statusText: 'success'})
        return res;
    }catch(err){
        return err;
    }
}

