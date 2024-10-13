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
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface Props {
  eventData: Event | null
}

interface Event {
  id: String
  name: string
  dateStart: Date
  dateEnd: Date
  description: string
  duration: Number
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
  const [ title, setTitle ] = React.useState<string>(eventData.name);
  const [ text, setText ] = React.useState<string>(eventData.description);

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

 
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = eventData.id
    const data = {
      'id': id,
      'name' : title,
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
        <Card className="w-[500px]">
          <CardHeader>
            <div className="font-bold text-2xl" >
              Edit {`${eventData?.name}`}
            </div>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <Label htmlFor="title" >Event Name</Label>
              <Input id="title" type="text"  value={title} onChange={handleChangeTitle}></Input>
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