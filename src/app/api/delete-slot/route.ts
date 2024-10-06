'use server'

import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server';

export async function DELETE(req: Request, res: Response) {
    const slotId = await req.headers.get('slotId')
    try{
        const deleteSlot = await prisma.timeslot.delete({
            where: {
                id: slotId!,
            },
        })
        return NextResponse.json({ message: 'Event deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting event:', error);
        return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 });
    }
}

