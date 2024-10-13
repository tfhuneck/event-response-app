'use client'

import * as React from 'react';
import axios from '@/lib/axiosInstance';
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
} from "@/components/ui/dropdown-menu";
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
import { useRouter } from 'next/navigation';
import { useToast } from "@/components/hooks/use-toast"
import { DateRange } from "react-day-picker"

interface Props {
  events: Event[]
  date: DateRange | undefined;
  setDate: (date: DateRange | undefined) => void;
}
 
interface Event {
  id: String
  name: String
  tag: String
  dateStart: Date
  dateEnd: Date
  description: String
  duration: Number
  maxcount: Number
}
interface SetState {
  
}

const EventList  = ({events, date, setDate}: Props) => {
  const router = useRouter();
  const { toast } = useToast()
  const [ eventsData, setEventsData ] = React.useState<Event[]>(events)
  const eventRef = React.useRef<HTMLDivElement>(null)
  // console.log('events at eventlist component')
  // console.log(events)
  const eventSelect = (event: React.MouseEvent<HTMLDivElement>, dateStart: Date, dateEnd: Date) => {
    const date ={
      from: dateStart,
      to: dateEnd
    }
    setDate(date)
  }

  const navigate = (id: String) => {
    router.push(`/admin/event/${id}`)
  }

  const navigateEdit = (id: String) => {
    router.push(`/admin/event/${id}/edit`)
  }

  const navigateAltResponses = () => {
    router.push(`/admin/altresponses`)
  }

  const handleDelete = async (eventId : String) => {
    const rmv = eventsData.filter((i) => i.id != eventId)
    setEventsData(rmv)
    axios.delete('api/delete-event',{
      headers: { 'eventId': `${eventId}` }
    },)
    .then((res) => {
      console.log(res)
      toast({
        title: "Event has been deleted"
      })
    })
    .catch((err) => console.log(err))
  }

  if(!eventsData.length){
    return (
      <>
        No Events
      </>
    )
  }
  else{
    return (
      <>
        {eventsData.map((event, key) => {
          return (
            <Card 
              className='hover:bg-slate-100 my-1 cursor-pointer focus:bg-slate-100'
              ref={eventRef}
              onMouseEnter={(e) => eventSelect(e, event.dateStart, event.dateEnd)}
              key={key}
            >
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
                      <Button variant='destructive' onClick={() => handleDelete(event.id)} className='w-52' >Delete</Button>
                    </DialogClose>
                  </DialogContent>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild >
                      <Button size='icon' variant='ghost'>
                        <MoreVerticalIcon />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" >
                      <DropdownMenuItem onClick={() => navigate(event.id)}>
                          View
                      </DropdownMenuItem>
                      <DropdownMenuSeparator/>
                      <DropdownMenuItem onClick={() => navigateEdit(`${event.id}`)}>Edit</DropdownMenuItem>
                      <DropdownMenuSeparator/>
                      <DropdownMenuItem className="focus:bg-red-200">
                        <DialogTrigger>Delete</DialogTrigger>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator/>
                      <DropdownMenuItem onClick={() => navigateAltResponses()} >
                      View Alt Responses
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </Dialog>
              </div>
              <CardHeader
                onClick={() => navigate(event.id)}
              >
                <CardTitle className='text-lg'>{event.tag}</CardTitle>
                <CardDescription>{event.dateStart.toDateString()}</CardDescription>
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