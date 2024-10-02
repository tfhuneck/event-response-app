'use client'

import * as React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import InviteSlots from './InviteSlots'

interface props {
  params : params 
  eventData : eventData | null 
  slotsData : slotsData[] | null 
}

interface params {
  id: string 
  firstname: string
  lastname: string
}

interface eventData {
  id: String
  name: String
  date: Date
  description: String
  duration: Number
  guestcount: Number
  maxcount: Number
}

interface slotsData {
  id: string
  name: string
  time: Date
  duration: Number
  eventID: string
  maxcount: Number
  filled: Number
  open: boolean
}[]

const capitalizeFirstLetter = (string : String) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


const Response : React.FC<props> = ({params, eventData, slotsData}) => {
  
  const [ time, setTime ] = React.useState<Date>();

  return (
    <>
    <Card className="w-full mt-14 col-span-3 border-0 bg-opacity-40 backdrop-blur-md hover:bg-opacity-80">
        <CardHeader className="text-xl font-bold">
          <div className="flex flex-col items-center mt-4 p-20">
            <p  className="text-4xl font-thin">
              {eventData?.name}
            </p>
            <Separator className="bg-slate-900 my-4"/>
            <p className="text-lg font-light">
              {eventData?.date.toDateString()}
            </p>
          </div>
        </CardHeader>
        <CardContent className="max-w-3xl">
          <p className="text-xl mb-2">
            Dear {capitalizeFirstLetter(params.firstname)} {capitalizeFirstLetter(params.lastname)}, 
          </p>
          <div className="mb-20">
            {eventData?.description}
          </div>
          <div className="font-semibold my-10">
            Please choose one of the following Times 
          </div>
          <div className="flex flex-col ">
            <InviteSlots 
              slots={slotsData}
              setTime={setTime}
            />
          </div>
        </CardContent>
        <CardFooter>
        </CardFooter>
      </Card>
    </>
  )
}

export default Response