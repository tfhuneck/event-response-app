'use server'

import prisma from '@/lib/prisma'

export async function DELETE(req: Request, res: Response) {
    const slotId = await req.headers.get('slotId')
    try{
        const deleteSlot = await prisma.timeslot.delete({
            where: {
                id: slotId!,
            },
        })
        res = new Response(JSON.stringify(deleteSlot),{ status: 200, statusText: 'success'})
        return res;
    }catch(err){
        return err;
    }
}

