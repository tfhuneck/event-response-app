'use server'

import Image from "next/image";
import prisma from '@/lib/prisma';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import CalenderDate from "@/components/Calender";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import SlotInput from "@/components/SlotInput";
import SlotsList from "@/components/EventSlots";
import InviteSlots from "@/components/InviteSlots";
import { Separator } from "@/components/ui/separator"
import { Toaster } from "@/components/ui/toaster";

const Invite = async ({ params }: { params: { id: string, firstname: string, lastname: string } }) => {
  const eventData = await prisma.event.findUnique({
    where: {
      id: params.id
    }
  })

  const slotsData = await prisma.timeslot.findMany({
    where:{
      eventID: params.id
    }
  })

  const capitalizeFirstLetter = (string : String) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
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
        <Card className="w-full mt-14 col-span-3 border-0 bg-opacity-40 backdrop-blur-md hover:bg-opacity-80">
          <CardHeader className="text-xl font-bold">
            <div className="flex flex-col items-center mt-4 p-20">
              <p  className="text-4xl font-thin">
                {eventData?.name}
              </p>
              <Separator className="bg-slate-900 my-4"/>
              <p className="text-lg font-light">
                {eventData?.date.toDateString()}
              </p>
            </div>
          </CardHeader>
          <CardContent className="max-w-3xl">
            <p className="text-xl mb-2">
             Dear {capitalizeFirstLetter(params.firstname)} {capitalizeFirstLetter(params.lastname)}, 
            </p>
            <div className="mb-20">
              {eventData?.description}
            </div>
            <div className="font-semibold my-10">
              Please choose on of the following Times 
            </div>
            <div className="flex flex-col ">
              <InviteSlots slots={slotsData}/>
            </div>
          </CardContent>
          <CardFooter>
            <SlotInput
              params={eventData? eventData : {}}
              eventDate={eventData ? eventData.date : new Date()}
            />
          </CardFooter>
        </Card>
        
      </div>
      </main>
    </>
  )
}

export default Invite;