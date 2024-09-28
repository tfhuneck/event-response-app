'use server'

import * as React from "react";
import axios from 'axios';
import prisma from '@/lib/prisma';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import CalenderDate from "@/components/Calender";
import { Button } from "@/components/ui/button";
import { MoreVerticalIcon } from "lucide-react";

const Slots = async ({ params }: { params: { id: string } }) => {

  const eventData = await prisma.event.findUnique({
    where: {
      id: params.id
    }
  })

  console.log(eventData)
  
  return (
    <>
      <Breadcrumb className="my-2 mx-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator/>
          <BreadcrumbItem>
            <BreadcrumbPage> {eventData ? eventData?.name : 'Event'} </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="h-screen flex flex-col mt-20 items-center">
        <div className="grid grid-cols-4 grid-flow-col gap-2">
          <Card className="w-full col-span-3">
            <Button className="float-end mt-1 mr-1" variant='ghost'>
              <MoreVerticalIcon />
            </Button>
            <CardHeader className="text-xl font-bold">
              {eventData?.name}
              <div className="font-light italic text-sm mt-2" >
                {eventData?.date.toDateString()}
              </div>
            </CardHeader>
            <CardContent className="max-w-3xl">
              <div className="font-normal text-sm" >
                Slot Durations: {eventData?.duration} min
              </div>
              <div className="font-normal text-sm" >
                Max Guest per Slot: {eventData?.maxcount}
              </div>
              <div className="font-normal text-sm" >
                Max Guestcount per Invite: {eventData?.guestcount}
              </div>
              <div className="font-semibold my-4">
                Event Description
              </div>
              <div className="">
                {eventData?.description}
              </div>
              <div className="font-semibold my-4">
                Event Time Slots
              </div>
              <div>
                {/* {eventData?.slots ? eventData.slots.map() => {
                  return (
                    <>
                    </>
                  )
                }
                 : 'No Slots'} */}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant='default' 
              >
                Create Event Time Slot
              </Button>
            </CardFooter>
          </Card>
          <div className="flex flex-col items-end">
            <div className="col-span-1">
              <CalenderDate 
                dateData={eventData?.date}
              />
            </div>
          </div>
        </div>
         
       
      </div>
    </>
  )
}

export default Slots;
