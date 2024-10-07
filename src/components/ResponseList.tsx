'use client'

import axios from '@/lib/axiosInstance'
import * as React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { Label } from './ui/label'

interface Props {
  eventData: Event | null
  slotsData: Slot[]
  responseData: Response[]
}

interface Event {
  id: String
  name: String
  date: Date
  description: String
  duration: Number
  guestcount: Number
  maxcount: Number
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

interface Response {
  id: string
  firstName: string
  lastName: string
  email: string 
  guestcount: number
  checkin: boolean
  slotID: string
  eventID: string 
}

const ResponseList : React.FC<Props> = ({eventData, slotsData, responseData} : Props) => {
  
  const [ guestList, setGuestList ] = React.useState(responseData)

  const checkInGuest = async (id: string, value: boolean) => {
    const data={id, value}
    await axios.post('/api/checkin',{
      data
    }, {
        headers: {}
    })
    .then((res) => {
      console.log(res)
      setGuestList(responses => responses.map(item => 
        item.id === id ? {...item, checkin: !item.checkin} : item
      ))
    })
    .catch((err) => console.log(err))
  }

  return (
    <>
      <div className='flex flex-col items-center'>
        <Tabs defaultValue={slotsData[0].id} >
          <TabsList className={`grid w-full grid-cols-${slotsData.length}`}>
            {slotsData.map((slot, key) => {
              return (
                <>
                  <TabsTrigger key={key} value={slot.id} className='min-w-32'>{slot.name}</TabsTrigger>
                </>
              )
            })}
          </TabsList>
          {slotsData.map((slot, key) => {
            const filteredSlots = guestList.filter((i) => i.slotID == slot.id)
            return (
              <>
                <TabsContent value={slot.id}>
                  <Card>
                    <CardHeader className='flex flex-col items-center'>
                      <CardTitle>{slot.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Firstname</TableHead>
                          <TableHead>Lastname</TableHead>
                          <TableHead>email</TableHead>
                          <TableHead>Guestcount</TableHead>
                          <TableHead>Checked In</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        { filteredSlots.map((response, key) => {
                          const statusClass = response.checkin ? 'bg-slate-200 hover:bg-slate-300 ' : ''
                          return (
                            <TableRow className={statusClass} >
                              <TableCell className="font-medium">{response.firstName}</TableCell>
                              <TableCell>{response.lastName}</TableCell>
                              <TableCell>{response.email}</TableCell>
                              <TableCell className="text-right">{response.guestcount}</TableCell>
                              <TableCell className="text-right">
                                <div className="flex items-center space-x-2">
                                  <Switch 
                                    id="check-in" 
                                    defaultChecked={response.checkin}
                                    onCheckedChange={(value) => checkInGuest(response.id, value)}
                                  />
                                  <Label htmlFor="check-in">Checked In</Label>
                                </div>
                              </TableCell>
                            </TableRow>
                          )
                        })}
                      </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
              </>
            )
          })}
        </Tabs>
      </div>
    </>
  )
}

export default ResponseList;