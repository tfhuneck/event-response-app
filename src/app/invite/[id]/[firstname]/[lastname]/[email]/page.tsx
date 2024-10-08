'use server'

import Image from "next/image";
import prisma from '@/lib/prisma';
import Response from "@/components/ReponseForm";

const Invite = async ({ params }: { params: { id: string, firstname: string, lastname: string, email: string } }) => {
  const eventData = await prisma.event.findUnique({
    where: {
      id: params.id
    }
  })

  const slotsData = await prisma.timeslot.findMany({
    where:{
      eventID: params.id
    },
    orderBy: {
      time: 'asc',
    }
  })

  const altslotData = await prisma.altslot.findMany({
    where: {
      eventID: params.id
    }
  })

  return (
    <>
      <div className="fixed h-screen w-screen flex flex-col items-center justify-center pt-52 sm:pt-20 sm:px-10">
        <div className="relative w-full h-full sm:h-2/3">
          <Image 
            className="z-0 rounded-lg"
            src='/upper-fern-bg-lg.png'
            alt="Background"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
        </div>
      </div>
      <main className="h-screen flex flex-col items-center justify-center font-serif z-10">
        <div className="h-screen flex flex-col mt-32 items-center">
          <Image 
            src='/TGR_VERT_BLK-GLD.png'
            width={50}
            height={50}
            alt='TGNR'
          />
          <Response 
            params={params}
            eventData={eventData}
            slotsData={slotsData}
            altslotData={altslotData}
          />
        </div>
      </main>
    </>
  )
}

export default Invite;