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
import { useRouter } from 'next/navigation';
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
  altslotData: AltSlot[]
}

interface AltSlot {
  id: string
  name: string
  description: string,
  eventID: string
}

const AltSlotsList  = ({altslotData}: SlotData) => {
  const [ slotData, setSlotData ] = React.useState<AltSlot[]>(altslotData)
  const { toast } = useToast()
  const router = useRouter();
  React.useEffect(() => {setSlotData(altslotData)}, [altslotData])

  const handleDelete = async (slotId : String) => {
    const rmv = slotData.filter((i) => i.id != slotId)
    setSlotData(rmv)
    axios.delete('api/delete-altslot',{
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

  const navigateResponses = (id: String) => {
    router.push(`/admin/event/${id}/responses`)
  }

  if(!altslotData.length){
    return (
      <>
        No Alternative Slot
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
              </CardHeader>
              <CardContent>
                {i.description}
              </CardContent>
            </Card>
          )
        })}
      </>
    )
  }
}

export default AltSlotsList; 