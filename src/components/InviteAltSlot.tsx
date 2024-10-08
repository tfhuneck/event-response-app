'use client'

import * as React from 'react';
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
import { Ghost } from 'lucide-react';
 
interface Props extends React.InputHTMLAttributes<HTMLInputElement>  {
  altslotData : AltSlot[] | null;
  selected : String | undefined;
  setSelected: (id: String | undefined) => void;
}

interface AltSlot {
  id: string
  name: string
  description: string,
  eventID: string
}

const InviteAltSlot  = React.forwardRef<HTMLInputElement, Props> (({altslotData, selected, setSelected}) => {

  // const [ selected, setSelected ] = React.useState<String>()

  const handleCLick  = (i: AltSlot) => {
    setSelected(i.id)
    window.scrollTo({
      top: document.body.scrollHeight, 
      behavior: 'smooth' // Optional for smooth scrolling
    });
  }

  if(!altslotData){
    return (
      <>
      </>
    )
  }
  else{
    return (
      <>
        {altslotData?.map((i) => {
          const cardClass =  (selected == i.id) ? "border-0 drop-shadow-md shadow-inner bg-opacity-100 bg-slate-300 h-30 my-1 cursor-pointer" 
            : "border-0 bg-opacity-30 hover:bg-opacity-90 hover:bg-slate-200 h-30 my-1 cursor-pointer"; 
          return (
            <Card 
              className={cardClass}
              onClick={() => handleCLick(i)}
            >
              <CardHeader className='flex flex-col justify-center items-center'>
                <CardTitle>{i.name}</CardTitle>
                <CardContent>
                  {i.description}
                </CardContent>
              </CardHeader>
            </Card>
          )
        })}
      </>
    )
  }
})

export default InviteAltSlot; 