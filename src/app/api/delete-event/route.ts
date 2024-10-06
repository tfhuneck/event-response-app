'use server'

import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server';

export async function DELETE(req: Request, res: Response) {
    const eventId = await req.headers.get('eventId')
    console.log(eventId)
    try{
        const deleteEvent = await prisma.event.delete({
            where: {
                id: eventId!,
            },
        })
        return NextResponse.json({ message: 'Event deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting event:', error);
        return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 });
    }
}

