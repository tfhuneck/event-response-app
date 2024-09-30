'use client'

import * as React from 'react';
import { Button } from './ui/button';
import { Slot } from '@radix-ui/react-slot'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { MoreVerticalIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from 'next/navigation';

interface Props {
  events: Event[]
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
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
interface SetState {
  
}

const EventList  = ({events, date, setDate}: Props) => {
  const router = useRouter();
  const eventRef = React.useRef<HTMLDivElement>(null)

  const eventSelect = (event: React.MouseEvent<HTMLDivElement>, date: Date) => {
    setDate(date)
  }

  const navigate = (id: String) => {
    router.push(`/admin/event/${id}`)
  }

  if(!events.length){
    return (
      <>
        No Events
      </>
    )
  }
  else{
    return (
      <>
        {events.map((event) => {
          return (
            <Card 
              className='hover:bg-slate-100 my-1 cursor-pointer focus:bg-slate-100'
              ref={eventRef}
              onMouseEnter={(e) => eventSelect(e, event.date)}
              onClick={() => navigate(event.id)}
            >
              <div className="float-end mt-1 mr-1">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild >
                    <Button size='icon' variant='ghost'>
                      <MoreVerticalIcon />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" >
                    <DropdownMenuItem>View</DropdownMenuItem>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem className="focus:bg-red-200">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardHeader>
                <CardTitle className='text-lg'>{event.name}</CardTitle>
                <CardDescription>{event.date.toDateString()}</CardDescription>
              </CardHeader>
              {/* <CardContent>
              </CardContent> */}
            </Card>
          )
        })}
      </>
    )
  }
}

export default EventList; 