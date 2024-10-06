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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Button } from './ui/button'
import { Separator } from "@/components/ui/separator"
import InviteSlots from './InviteSlots'
import { useRouter } from 'next/navigation';
import { LoaderCircle } from 'lucide-react';
import axios from '@/lib/axiosInstance';

interface props {
  params : params 
  eventData : eventData | null 
  slotsData : slotsData[] | null 
}

interface params {
  id: string 
  firstname: string
  lastname: string
  email: string
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
  const router = useRouter();
  const [ time, setTime ] = React.useState<Date>();
  const [ timeId, setTimeId ] = React.useState<String>();
  const [ slotName, setSlotName ] = React.useState<String>();
  const [ guestCount, setGuestCount ] = React.useState<number>() 
  const [ loading, setLoading ] = React.useState<boolean>(false)

  const guestCountOptions = React.useMemo(() => {
    if (eventData) {
      return Array.from({ length: Number(eventData.guestcount) }, (_, i) => i + 1);
    }
    return [];
  }, [eventData]);
  
  const handleSubmit = async () => {
    setLoading(true)
    const responseData = {
      firstName: params.firstname,
      lastName: params.lastname,
      email: params.email.replace(/%40/g, "@"),
      time: timeId,
      guestCount: guestCount
    }
    console.log(responseData)
    axios.post('api/submit-response',{
      responseData
    }, {
        headers: {}
    })
    .then((res) => {
      console.log(res.data.id)
      router.push(`/confirm/${params.firstname}/${params.lastname}`)
    })
    .catch((err) => console.log(err))
  }

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
              setSlotName={setSlotName}
              setTimeId={setTimeId}
            />
          </div>
        </CardContent>
        <CardFooter className='flex flex-col justify-center mb-10'>
          {time&& <Dialog>
            <DialogTrigger asChild>
              <Button 
                className='h-12 w-36 text-lg' 
                variant='default'
              >
                Continue
              </Button>
            </DialogTrigger>
            <DialogContent className='font-serif'>
              <DialogHeader>
                <DialogTitle>Please Confirm your attendance</DialogTitle>
                <DialogDescription>
                  Please confirm how many Guests will be attending with you.
                  <p>
                    You are invited to bring up to {`${eventData?.guestcount}`} Guests.
                  </p>
                </DialogDescription>
              </DialogHeader>
              <Card>
                <CardHeader>
                  <CardTitle>
                    Attendance Details
                  </CardTitle>
                  <p className='italic'>
                    {`${time.toDateString()}`} – {`${time.toLocaleTimeString()}`}
                  </p>
                </CardHeader>
                <CardContent className='flex flex-col items-center' >
                  <p className='font-semibold text-lg'>
                    {capitalizeFirstLetter(params.firstname)} {capitalizeFirstLetter(params.lastname)}
                  </p>
                  <p className='font-semibold text-md mb-2'>
                    Timeslot: {`${slotName}`}
                  </p>
                  <p>
                    <Label>Please select Number of Guests</Label>
                    <Select
                      onValueChange={(value) => setGuestCount(Number(value))}
                    >
                      <SelectTrigger className="w-[180px] ml-1 mt-2">
                        <SelectValue placeholder="Guest Count" />
                      </SelectTrigger>
                      <SelectContent>
                        {guestCountOptions.map((i,key) => {
                          return(
                            <SelectItem key={key} value={`${i}`}>{`${i}`}</SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                  </p>
                </CardContent>
                <CardFooter className='flex flex-col items-center' >
                  {loading && <LoaderCircle className='my-2 animate-spin'/>}
                  {guestCount &&
                    <Button
                      className="w-[180px]"
                      onClick={() => handleSubmit()}
                    >
                      Confirm
                    </Button>
                  }
                </CardFooter>
              </Card>
            </DialogContent>
          </Dialog>}
        </CardFooter>
      </Card>
    </>
  )
}

export default Response