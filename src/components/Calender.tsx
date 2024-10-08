"use client"

import * as React from "react"

import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"

interface Props {
  dateData?: DateRange;
} 

const CalenderDate : React.FC<Props> = ({ dateData }) => {
  const [date, setDate] = React.useState<DateRange | undefined>()

  React.useEffect(() => {
    setDate(dateData)
  }, [])

  return (
    <Calendar
      mode="range"
      defaultMonth={date?.from}
      selected={dateData}
      // onSelect={setDate}
      className="rounded-md border"
      numberOfMonths={1}
    />
  )
}

export default CalenderDate;