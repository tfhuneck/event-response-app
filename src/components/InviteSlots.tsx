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
 
interface Props extends React.InputHTMLAttributes<HTMLInputElement>  {
  slots: Slot[] | null
  setTime : (time: Date | undefined) => void;
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

const InviteSlots  = React.forwardRef<HTMLInputElement, Props> (({slots, setTime}) => {

  const [ selected, setSelected ] = React.useState<String>()

  const handleCLick  = (i: Slot) => {
    if(i.open){
      setTime(i.time)
      setSelected(i.id)
    }
  }

  if(!slots?.length){
    return (
      <>
        No Timeslots
      </>
    )
  }
  else{
    return (
      <>
        {slots?.map((i) => {
          const cardClass =  (selected == i.id) ? "border-0 bg-opacity-100 bg-slate-300 h-30 my-1 cursor-pointer"
            :i.open ? "border-0 bg-opacity-30 hover:bg-opacity-90 hover:bg-slate-200 h-30 my-1 cursor-pointer" 
            : "border-0 bg-opacity-10 my-1 bg-slate-500 h-30"; 
          return (
            <Card 
              className={cardClass}
              onClick={() => handleCLick(i)}
            >
              <CardHeader className='flex flex-col justify-center items-center'>
                <CardTitle>{i.name}</CardTitle>
                <CardDescription>
                  Startime: {i.time.toLocaleTimeString()} {i.open ? '' : ' – Booked'}
                </CardDescription>
              </CardHeader>
            </Card>
          )
        })}
      </>
    )
  }
})

export default InviteSlots; 