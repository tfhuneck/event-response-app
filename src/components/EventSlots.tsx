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

 
interface SlotData {
  slots: Slot[]
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

const SlotsList  = ({slots}: SlotData) => {

  // React.useEffect(() => {
  //   console.log(slots)
  // }, [slots])

  if(!slots.length){
    return (
      <>
        No Timeslots
      </>
    )
  }
  else{
    return (
      <>
        {slots.map((i) => {
          return (
            <Card className='hover:bg-slate-100 my-1'>
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
                <CardTitle>{i.name}</CardTitle>
                <CardDescription>Startime: {i.time.toLocaleTimeString()}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Length: {`${i.duration}`} min
                </p>
                <p>
                  Maximum Guests: {`${i.maxcount}`}
                </p>
                <p>
                  Confirmed Guest: {`${i.filled}`}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </>
    )
  }
}

export default SlotsList; 