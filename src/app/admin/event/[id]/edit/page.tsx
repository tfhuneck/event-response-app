
import prisma from '@/lib/prisma';
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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { revalidatePath } from 'next/cache';
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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
import { useForm } from "react-hook-form"
import { z } from "zod"
import EditForm from '@/components/EventEdit';

interface Inputs {
  name: string
  date: Date
  description: string
  duration: number
  guestcount: number
  maxcount: number
  }

const eventSchema = z.object({
  name: z.string(),
  date: z.date(),
  description: z.string(),
  duration: z.coerce.number().positive(),
  guestcount: z.coerce.number().positive(),
  maxcount: z.coerce.number().positive()
})

const EditEvent = async ({ params }: { params: { id: string } }) => {

  const eventData = await prisma.event.findUnique({
    where: {
      id: params.id
    }
  })

  const eventUrl = `/admin/event/${eventData?.id}`
   
  return (
    <>
      <Breadcrumb className="my-2 mx-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator/>
          <BreadcrumbItem>
            <BreadcrumbLink href={eventUrl}>{eventData ? eventData?.name : 'Event'}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator/>
          <BreadcrumbItem>
            <BreadcrumbPage> Edit </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <EditForm  eventData={eventData} />
    </>
  )
}

export default EditEvent;