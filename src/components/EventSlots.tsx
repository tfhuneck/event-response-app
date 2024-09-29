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

  React.useEffect(() => {
    console.log(slots)
  }, [slots])

  if(!slots.length){
    return (
      <>
      </>
    )
  }
  else{
    return (
      <>
        {slots.map((i) => {
          return (
            <Button
              variant="outline"
              asChild
              className='h-fit my-1 flex flex-col items-start'
              disabled={!i.open}
            >
              <Card>
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

            </Button>
          )
        })}
      </>
    )
  }
}

export default SlotsList; 