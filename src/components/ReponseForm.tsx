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
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { Separator } from "@/components/ui/separator"
import InviteSlots from './InviteSlots'
import { useRouter } from 'next/navigation';
import { LoaderCircle } from 'lucide-react';
import axios from '@/lib/axiosInstance';
import InviteAltSlot from './InviteAltSlot';
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import moment from 'moment-timezone';

interface props {
  params : params 
  eventData : eventData | null 
  slotsData : slotsData[] | null 
  altslotData: AltSlot[] | null
}

interface params {
  id: string 
  firstname: string
  lastname: string
  email: string
  responseid: string
}

interface eventData {
  id: String
  name: String
  tag: String
  dateStart: Date
  dateEnd: Date
  description: String
  duration: Number
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

interface AltSlot {
  id: string
  name: string
  description: string,
  eventID: string
}

const capitalizeFirstLetter = (string : String) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const Response : React.FC<props> = ({params, eventData, slotsData, altslotData}) => {
  const router = useRouter();
  const [ time, setTime ] = React.useState<Date>();
  const [ slotId, setSlotId ] = React.useState<String>();
  const [ slotName, setSlotName ] = React.useState<String>();
  const [ loading, setLoading ] = React.useState<boolean>(false)
  const [ selected, setSelected ] = React.useState<String>()
  const [ alt, setAlt ] = React.useState<String>()
  const [ comments, setComments ] = React.useState<string>()


  React.useEffect(() => {
    setAlt(undefined)
  }, [selected, setSelected])

  React.useEffect(() => {
    setSelected(undefined)
    setTime(undefined)
  }, [alt, setAlt])
  
  const handleComments  = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComments(event.target.value)
  }

  const handleSubmit = async () => {
    setLoading(true)
    const responseData = {
      firstName: params.firstname,
      lastName: params.lastname,
      email: params.email.replace(/%40/g, "@"),
      slotID: slotId,
      eventID: params.id,
      responseID: params.responseid,
    }
    console.log(responseData)
    axios.post('api/submit-response',{
      responseData
    }, {
        headers: {}
    })
    .then((res) => {
      console.log(res.data.id)
      router.push(`/confirm/${params.responseid}`)
    })
    .catch((err) => console.log(err))
  }

  const handleSubmitAlt = async () => {
    setLoading(true)
    const responseData = {
      firstName: params.firstname,
      lastName: params.lastname,
      email: params.email.replace(/%40/g, "@"),
      eventID: params.id,
      comment: comments,
      responseID: params.responseid,
    }
    console.log(responseData)
    axios.post('api/submit-altresponse',{
      responseData
    }, {
        headers: {}
    })
    .then((res) => {
      console.log(res.data.id)
      router.push(`/confirm/alt/${params.responseid}`)
    })
    .catch((err) => console.log(err))
  }

  return (
    <>
      <Card className="w-full mt-14 mb-20 col-span-3 border-0 backdrop-blur-md bg-opacity-80 flex flex-col items-center">
        <CardHeader className="text-xl font-bold">
          <div className="flex flex-col items-center mt-4 sm:p-20">
            <p  className="text-4xl font-thin">
              {eventData?.name}
            </p>
            <Separator className="bg-slate-900 my-4"/>
            <p className="text-lg font-light">
              {eventData?.dateStart.toDateString()} – {eventData?.dateEnd.toDateString()}
            </p>
          </div>
        </CardHeader>
        <CardContent className="max-w-3xl sm:px-10 ">
          <p className="text-xl mb-2">
            {/* Dear {capitalizeFirstLetter(params.firstname)},  */}
          </p>
          <div className="mb-20">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]} 
              components={{
                p: ({ node, ...props }) => <p style={{ margin: '20px 0' }} {...props} />
              }}
              children={`${eventData?.description}`}
            />
          </div>
          <div className="font-semibold my-10">
            Please choose one of the following times 
          </div>
          <div className="flex flex-col ">
            <InviteSlots 
              slots={slotsData}
              setTime={setTime}
              setSlotName={setSlotName}
              setSlotId={setSlotId}
              selected={selected}
              setSelected={setSelected}
            />
          </div>
          <div className="flex flex-col ">
            <InviteAltSlot 
              altslotData={altslotData}
              selected={alt}
              setSelected={setAlt} 
            />
          </div>
        </CardContent>
        <CardFooter className='flex flex-col justify-center mb-10'>
          {time && <Dialog>
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

                </DialogDescription>
              </DialogHeader>
              <Card>
                <CardHeader>
                  <CardTitle>
                    Attendance Details
                  </CardTitle>
                  <p className='italic'>
                    {moment(`${time}`).tz("America/Los_Angeles").format('LL')}
                    {/* {`${time.toDateString()}`} */}
                  </p>
                </CardHeader>
                <CardContent className='flex flex-col items-center' >
                  <p className='font-semibold text-lg'>
                    {capitalizeFirstLetter(params.firstname)} {capitalizeFirstLetter(params.lastname)}
                  </p>
                  <p className='font-semibold text-md mb-2'>
                    Time slot: {`${slotName}`}
                  </p>
                  <p>
                    You are welcome to bring members of your household who are 21 years and older. 
                    No other guests are allowed at this time.
                  </p>
                </CardContent>
                <CardFooter className='flex flex-col items-center' >
                  {loading && <LoaderCircle className='my-2 animate-spin'/>}
                    <Button
                      className="w-[180px]"
                      onClick={() => handleSubmit()}
                    >
                      Confirm
                    </Button>
                </CardFooter>
              </Card>
            </DialogContent>
          </Dialog>}
          {alt && 
            <Button 
              className='h-12 w-36 text-lg' 
              variant='default'
              onClick={() => handleSubmitAlt()}
            >
              Continue
            </Button>
            // <Dialog>
            //   <DialogTrigger asChild>
            //     <Button 
            //       className='h-12 w-36 text-lg' 
            //       variant='default'
            //     >
            //       Continue
            //     </Button>
            //   </DialogTrigger>
            //   <DialogContent className='font-serif'>
            //     <DialogHeader>
            //       <DialogTitle>Alternative Date Response</DialogTitle>
            //       <DialogDescription>
            //       </DialogDescription>
            //     </DialogHeader>
            //     <Card>
            //       <CardHeader>
            //         We will contact you for an alternative Date
            //       </CardHeader>
            //       <CardContent className='flex flex-col items-center' >
            //         <p className='font-semibold text-lg'>
            //           {capitalizeFirstLetter(params.firstname)} {capitalizeFirstLetter(params.lastname)}
            //         </p>
            //         <Label htmlFor='comment' className='my-4'>Comments</Label>
            //         <Textarea id='comment' placeholder='optional' value={comments} onChange={handleComments} />
                  
            //       </CardContent>
            //       <CardFooter className='flex flex-col items-center' >
            //         {loading && <LoaderCircle className='my-2 animate-spin'/>}
            //           <Button
            //             className="w-[180px]"
            //             onClick={() => handleSubmitAlt()}
            //           >
            //             Confirm
            //           </Button>
            //       </CardFooter>
            //     </Card>
            //   </DialogContent>
            // </Dialog>
          }
        </CardFooter>
      </Card>
    </>
  )
}

export default Response