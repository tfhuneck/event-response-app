"use client";

import * as React from "react";
import axios from '@/lib/axiosInstance';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CalenderDate from "@/components/Calender";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { MoreVerticalIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SlotInput from "@/components/SlotInput";
import SlotsList from "@/components/EventSlots";
import { useRouter } from 'next/navigation';

interface Props {
  eventData: Event | null
  slotsData: Slot[]
}

interface Event {
  id: String
  name: String
  date: Date
  description: String
  duration: Number
  guestcount: Number
  maxcount: Number
}

interface Slot {
  id: string
  name: string
  time: Date
  duration: Number
  eventID: string
  maxcount: Number
  filled: Number
  open: boolean
}

const EventDetails: React.FC<Props> = ({eventData, slotsData }) => {
  
  const router = useRouter();
  
  const handleDelete = async (eventId : String) => {
    axios.delete('api/delete-event',{
      headers: { 'eventId': `${eventId}` }
    },)
    .then((res) => {
      console.log(res)
      router.push(`/admin`)
    })
    .catch((err) => console.log(err))
  }

  const navigate = (id: String) => {
    router.push(`/admin/event/${id}`)
  }

  const navigateEdit = (id: String) => {
    router.push(`/admin/event/${id}/edit`)
  }

  return (
    <>
      <div className="grid grid-cols-4 grid-flow-col gap-2">
        <Card className="w-full col-span-3">
          <div className="float-end mt-1 mr-1">
            <Dialog>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This item will be permanently deleted.
                  </DialogDescription>
                </DialogHeader>
                <DialogClose>
                  <Button variant='destructive' onClick={() => handleDelete(`${eventData?.id}`)} className='w-52' >Delete</Button>
                </DialogClose>
              </DialogContent>
              <DropdownMenu>
                <DropdownMenuTrigger asChild >
                  <Button size='icon' variant='ghost'>
                    <MoreVerticalIcon />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" >
                  <DropdownMenuItem>
                      View Responses
                  </DropdownMenuItem>
                  <DropdownMenuSeparator/>
                  <DropdownMenuItem onClick={() => navigateEdit(`${eventData?.id}`)} >Edit</DropdownMenuItem>
                  <DropdownMenuSeparator/>
                  <DropdownMenuItem className="focus:bg-red-200">
                    <DialogTrigger>Delete</DialogTrigger>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </Dialog>
          </div>
          <CardHeader className="text-xl font-bold">
            {eventData?.name}
            <div className="font-light italic text-sm mt-2">
              {eventData?.date.toDateString()}
            </div>
          </CardHeader>
          <CardContent className="max-w-3xl">
            <div className="font-normal text-sm">
              Slot Durations: {`${eventData?.duration}`} min
            </div>
            <div className="font-normal text-sm">
              Max Guest per Slot: {`${eventData?.maxcount}`}
            </div>
            <div className="font-normal text-sm">
              Max Guestcount per Invite: {`${eventData?.guestcount}`}
            </div>
            <div className="font-semibold my-4">Event Description</div>
            <div className="">{eventData?.description}</div>
            <div className="font-semibold my-4">Event Time Slots</div>
            <div className="flex flex-col ">
              <SlotsList slots={slotsData} />
            </div>
          </CardContent>
          <CardFooter>
            <SlotInput
              params={eventData ? eventData : {}}
              eventDate={eventData ? eventData.date : new Date()}
            />
          </CardFooter>
        </Card>
        <div className="flex flex-col items-end">
          <div className="col-span-1">
            <CalenderDate dateData={eventData?.date} />
          </div>
        </div>
      </div>
    </>
  );
};

export default EventDetails;
