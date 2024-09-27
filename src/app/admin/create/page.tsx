'use client'

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import * as LabelPrimitive from "@radix-ui/react-label"
import { Slot } from "@radix-ui/react-slot"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
} from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Calendar as CalendarIcon } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, SubmitHandler } from "react-hook-form"
import { z } from "zod"
import { Textarea } from "@/components/ui/textarea"


const eventSchema = z.object({
  name: z.string(),
  date: z.date(),
  content: z.string(),
  duration: z.number().positive(),
  guestcount: z.number().positive(),
  maxcount: z.number().positive()
})

const Create = () => {

  const [practices, setPractices] = React.useState(1);
  
  const onSubmit = (data: z.infer<typeof eventSchema>) => console.log(data)
  
  const {
    register,
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
    defaultValues:{
      name: "",
      content:"",
    }
  })

  const [date, setDate] = React.useState<Date>()

  return (
    <>
      <Breadcrumb className="my-2 mx-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator/>
          <BreadcrumbItem>
            <BreadcrumbPage>Create</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="h-screen flex flex-col items-center justify-center">
        <Card className="w-96">
          <CardHeader>
            <div className="font-bold text-2xl" >
              Create New Event
            </div>
          </CardHeader>
          <CardContent>
            <Form {...register}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={control}
                  name="name"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Event Name</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Event Name" {...field}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="date"
                  render={({field}) => (
                    <FormItem className="flex flex-col ">
                    <FormLabel>Event Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              " pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="content"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Event Description" {...field}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="duration"
                  render={({field}) => (
                    <FormItem className="flex flex-col ">
                      <FormLabel>Event Slots duration</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger >
                              <SelectValue placeholder="Select Time Slot Length" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Time Slot length</SelectLabel>
                              <SelectItem value='15'>15 min</SelectItem>
                              <SelectItem value='30'>30 min</SelectItem>
                              <SelectItem value='45'>45 min</SelectItem>
                              <SelectItem value='60'>60 min</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="maxcount"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Maximum Guest Count per Timeslot</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="max guest count per slot" {...field}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="guestcount"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Maximum Guest Count per Invitation</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="max guest count per invitation" {...field}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-col justify-center mt-4">
                  <Button type="submit">
                    Create
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default Create;