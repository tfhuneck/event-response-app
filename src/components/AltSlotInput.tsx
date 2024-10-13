'use client'

import * as React from "react";
import axios from '@/lib/axiosInstance'
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useToast } from "@/components/hooks/use-toast"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation";
import { Textarea } from "./ui/textarea";

interface Inputs {
  name: string
  date: Date
  }

const slotSchema = z.object({
  name: z.string(),
  description: z.string(),
})

interface props {
  length?: Number
  params: {
    id?: String
    maxcount?: Number
    duration?: Number
  }
}

const AltSlotInput : React.FC<props> = ({params}) => {
  const router = useRouter()
  const { reset } = useForm();
  const { toast } = useToast()
  const form = useForm<z.infer<typeof slotSchema>>({
    resolver: zodResolver(slotSchema)
  })
  // console.log(params)
  const slotObj = { 
    eventID : params?.id,
  }

  const onSubmit = (data : z.infer<typeof slotSchema> ) => {
    const slotData = {...data,...slotObj}
    // console.log(slotData)
    axios.post('api/create-altslot',{
      slotData
    }, {
        headers: {}
    })
    .then((res) => {
      console.log(res.data)
      toast({
        title: "Alternative Slot added",
        description: `${res.data.name} has been added`,
      })
      form.reset()
      router.refresh()
    })
    .catch((err) => {
      console.log(err)
      toast({
        title: "Error",
        description: `${err}`,
      })
    })
    
  };
  
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant='default' 
          >
            Create Event Alt Slot
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Add Alternative Response Slot
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="name"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Slot Name</FormLabel>
                    <FormControl>
                    <Input type="text" placeholder="Slot Name" {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                  control={form.control}
                  name="description"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Event Description" {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              <DialogClose>
                <Button type="submit" className="mt-2">
                  Create
                </Button>
              </DialogClose>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AltSlotInput;
