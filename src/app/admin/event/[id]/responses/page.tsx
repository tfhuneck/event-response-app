
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
import ResponseList from "@/components/ResponseList";

const Responses = async ({ params }: { params: { id: string } }) => {

  const eventUrl = `/admin/event/${params.id}`

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

  const responseData = await prisma.response.findMany({
    where: {
      eventID: params.id! 
    }
  })

  return (
    <>
      <Breadcrumb className="my-2 mx-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator/>
          <BreadcrumbItem>
            <BreadcrumbLink href={eventUrl}>{eventData ? eventData?.name : 'Event'}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator/>
          <BreadcrumbItem>
            <BreadcrumbPage> Responses </BreadcrumbPage>
          </BreadcrumbItem> 
        </BreadcrumbList>
      </Breadcrumb>
      <ResponseList 
        eventData={eventData}
        slotsData={slotsData}
        responseData={responseData}
      />
    </>
  )
}

export default Responses;
