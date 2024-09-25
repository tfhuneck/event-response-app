"use client"

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar"


const Dashboard = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <>
    <div className="h-screen flex flex-col items-center justify-center">
      <Card>
          <CardHeader>
              <div className="font-bold text-2xl">
                  Scheduler Application
              </div>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </CardContent>
          <CardFooter>
              <div className="">
                  by TFHuneck©
              </div>
          </CardFooter>
      </Card>
    </div>
    </>
  )
}

export default Dashboard;