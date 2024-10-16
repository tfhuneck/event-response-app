
import * as React from "react";
import prisma from '@/lib/prisma';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Toaster } from "@/components/ui/toaster";
import EventDetails from "@/components/EventDetails";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const Event = async ({ params }: { params: { id: string } }) => {

  //===================AUTH=========================
  const session = await auth()

  if (!session?.user) {
    // Redirect to login if no session is found
    redirect("/login");
  }
  //===================AUTH=========================

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

  // console.log(eventData)

  return (
    <>
      <Breadcrumb className="my-2 mx-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator/>
          <BreadcrumbItem>
            <BreadcrumbPage> {eventData ? eventData?.tag : 'Event'} </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="h-screen flex flex-col mt-20 items-center">
        <EventDetails  
          eventData={eventData}
          slotsData={slotsData}
          altslotData={altslotData}
        />
        <Toaster />
      </div>
    </>
  )
}

export default Event;
