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
import { TimePicker } from "./TimePicker";
import { add, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";


interface Inputs {
  name: string
  date: Date
  }

const slotSchema = z.object({
  name: z.string(),
  time: z.date(),
})

interface props {
  eventDate: Date
  length?: Number
  params: {
    id?: String
    maxcount?: Number
    duration?: Number
  }
}

const SlotInput : React.FC<props> = ({params, eventDate}) => {
  const router = useRouter()
  const [date, setDate] = React.useState<Date>()
  const { reset } = useForm();
  const { toast } = useToast()
  const form = useForm<z.infer<typeof slotSchema>>({
    resolver: zodResolver(slotSchema)
  })
  // console.log(params)
  const slotObj = { 
    eventID : params?.id,
    maxcount : params?.maxcount,
    duration : params?.duration
  }

  const onSubmit = (data : z.infer<typeof slotSchema> ) => {
    const slotData = {...data,...slotObj}
    // console.log(slotData)
    axios.post('api/create-slot',{
      slotData
    }, {
        headers: {}
    })
    .then((res) => {
      console.log(res.data)
      toast({
        title: "Event Slot added",
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
            Create Event Time Slot
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Add Time Slot
            </DialogTitle>
            <div className="font-thin text-sm">
              Slot length: {`${params.duration}`} min
            </div>
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
                name="time"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Slot Date and Time</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[280px] justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? format(field.value, "PPP HH:mm:ss") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                          />
                          <div className="p-3 border-t border-border">
                            <TimePicker
                              date={field.value}
                              setDate={field.onChange} 
                            />
                          </div>
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogClose>
                <Button type="submit">
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

export default SlotInput;
