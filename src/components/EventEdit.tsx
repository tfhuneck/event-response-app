'use client'

import * as React from "react";
import axios from '@/lib/axiosInstance'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface Props {
  eventData: Event | null
}

interface Event {
  id: string
  name: string
  date: Date
  description: string
  duration: Number
  guestcount: Number
  maxcount: Number
}

const EditForm : React.FC<Props> = ({ eventData }) => {

  if(!eventData){
    return (
      <div className="flex flex-col items-center justify-center">
        Error: No Event Data
      </div>
    )
  }
  
  const router = useRouter();
  const [text, setText] = React.useState<string>(eventData.description);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

 
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = eventData.id
    const data = {
      'id': id,
      'description' : text,
    }
    await axios.post('/api/edit-event',{
      data
    }, {
        headers: {}
    })
    .then((res) => {
      router.push(`/admin/event/${eventData.id}`)
      console.log(res)
    })
    .catch((err) => console.log(err))
    
  };

  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center">
        <Card className="w-96">
          <CardHeader>
            <div className="font-bold text-2xl" >
              Edit {`${eventData?.name}`}
            </div>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <Textarea placeholder="Event Description" value={text} onChange={handleChange}/>
              <div className="flex flex-col justify-center mt-4">
                <Button onClick={(e) => onSubmit(e)} >
                  Update
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default EditForm;