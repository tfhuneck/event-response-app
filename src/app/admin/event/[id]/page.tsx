'use server'

import * as React from "react";
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
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { MoreVerticalIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import SlotInput from "@/components/SlotInput";
import SlotsList from "@/components/EventSlots";
import { Toaster } from "@/components/ui/toaster";


const Event = async ({ params }: { params: { id: string } }) => {
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
            <div className="float-end mt-1 mr-1">
              <DropdownMenu>
                <DropdownMenuTrigger asChild >
                  <Button size='icon' variant='ghost'>
                    <MoreVerticalIcon />
                  </Button>
                </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" >
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem className="focus:bg-red-200">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
              </DropdownMenu>
            </div>
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
              <div className="flex flex-col ">
                <SlotsList
                  slots={slotsData}
                />
              </div>
            </CardContent>
            <CardFooter>
              <SlotInput
                params={eventData? eventData : {}}
                eventDate={eventData ? eventData.date : new Date()}
              />
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
        <Toaster />
      </div>
    </>
  )
}

export default Event;
