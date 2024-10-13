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
  altResponses: AltResponse[]
}


interface AltResponse {
  id: string
  firstName: string
  lastName: string
  email: string
}

const AltResponseList: React.FC<Props> = ({altResponses} : Props) => {
  
  const [ guestList, setGuestList ] = React.useState(altResponses)

  return (
    <>
      <div className='flex flex-col items-center mt-10 min-h-screen'>
        <Card>
          <CardHeader>
            <CardTitle>
              Alternative Responses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Firstname</TableHead>
                  <TableHead>Lastname</TableHead>
                  <TableHead>Email</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {altResponses.map((i, key) => {
                  return (    
                    <TableRow key={key}>
                      <TableCell className="font-medium">{i.firstName}</TableCell>
                      <TableCell>{i.lastName}</TableCell>
                      <TableCell>{i.email}</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default AltResponseList;