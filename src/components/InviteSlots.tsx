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
import { Ghost } from 'lucide-react';
 
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

const InviteSlots  = ({slots}: SlotData) => {

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
            <Card className='border-0 bg-opacity-30 hover:bg-opacity-90 hover:bg-slate-200 h-30 my-1 cursor-pointer'>
              <CardHeader className='flex flex-col justify-center items-center'>
                <CardTitle>{i.name}</CardTitle>
                <CardDescription>Startime: {i.time.toLocaleTimeString()}</CardDescription>
              </CardHeader>
            </Card>
          )
        })}
      </>
    )
  }
}

export default InviteSlots; 