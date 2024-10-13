'use client'

import * as React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import CalenderDate from "./Calender";
import { ScrollArea } from "./ui/scroll-area"
import EventList from "./Eventslist";
import { DateRange } from "react-day-picker"

interface Props {
  events: Event[]
}

interface Event {
  id: String
  name: String
  tag: String
  dateStart: Date
  dateEnd: Date
  description: String
  duration: Number
  maxcount: Number
}

const AdminDash: React.FC<Props> = (props) => {
  console.log('events at client admin dash component')
  console.log(props)
  const [date, setDate] = React.useState<DateRange | undefined>()

  return(
    <div className="h-screen flex flex-col items-center justify-center">
      <Card>
          <CardHeader>
            <CardTitle> 
              Scheduled Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-10">
              <div className="col-span-1">
                <ScrollArea 
                  className="h-[308px] rounded-md border p-4"
                >
                  <EventList 
                    events={props.events}
                    setDate={setDate} 
                    date={date}
                  />
                </ScrollArea>
              </div>
              <div className="col-span-1 flex flex-col">
                <CalenderDate 
                  dateData={date}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
              <div className="flex flex-col items-center justify-center">
                <a href="/admin/create">
                  <Button 
                    size="default"
                  >
                    Create Event
                  </Button>
                </a>
              </div>
          </CardFooter>
      </Card>
    </div>
  )
}

export default AdminDash