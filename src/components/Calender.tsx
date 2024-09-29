"use client"

import * as React from "react"

import { Calendar } from "@/components/ui/calendar"

interface Props {
  dateData?: Date;
} 

const CalenderDate : React.FC<Props> = ({ dateData }) => {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  React.useEffect(() => {
    setDate(dateData)
  }, [])

  return (
    <Calendar
      mode="single"
      selected={dateData}
      month={dateData}
      // onSelect={setDate}
      className="rounded-md border"
    />
  )
}

export default CalenderDate;