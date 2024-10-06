'use client'

import * as React from 'react';
import axios from '@/lib/axiosInstance';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import { MoreVerticalIcon } from "lucide-react";
import { useToast } from "@/components/hooks/use-toast"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

 
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
  const [ slotData, setSlotData ] = React.useState<Slot[]>(slots)
  const { toast } = useToast()

  React.useEffect(() => {setSlotData(slots)}, [slots])

  const handleDelete = async (slotId : String) => {
    const rmv = slotData.filter((i) => i.id != slotId)
    setSlotData(rmv)
    axios.delete('api/delete-slot',{
      headers: { 'slotId': `${slotId}` }
    },)
    .then((res) => {
      console.log(res)
      toast({
        title: "Slot has been deleted"
      })
    })
    .catch((err) => console.log(err))
  }

  if(!slots.length){
    return (
      <>
        No Timeslots
      </>
    )
  }
  else{
    return (
      <>
        {slotData.map((i,key) => {
          return (
            <Card className='hover:bg-slate-100 my-1' key={key}>
              <div className="float-end mt-1 mr-1">
                <Dialog>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Are you sure?</DialogTitle>
                      <DialogDescription>
                        This action cannot be undone. This item will be permanently deleted.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogClose>
                      <Button variant='destructive' onClick={() => handleDelete(i.id)} className='w-52' >Delete</Button>
                    </DialogClose>
                  </DialogContent>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild >
                      <Button size='icon' variant='ghost'>
                        <MoreVerticalIcon />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" >
                      <DropdownMenuItem>View Responses</DropdownMenuItem>
                      <DropdownMenuSeparator/>
                      <DropdownMenuItem className="focus:bg-red-200">
                        <DialogTrigger>Delete</DialogTrigger>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </Dialog>
              </div>
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
          )
        })}
      </>
    )
  }
}

export default SlotsList; 