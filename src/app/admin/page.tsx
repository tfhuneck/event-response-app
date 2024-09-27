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
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"



const Dashboard = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <>
    <Breadcrumb className="my-2 mx-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbPage>Home</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
    <div className="h-screen flex flex-col items-center justify-center">
      <Card>
          <CardHeader>
              <div className="font-bold text-2xl">
                  Scheduled Events
              </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-10">
              <div className="col-span-1">
                <Table>
                  <TableCaption>A list of your recent invoices.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Invoice</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {/* {invoices.map((invoice) => (
                      <TableRow key={invoice.invoice}>
                        <TableCell className="font-medium">{invoice.invoice}</TableCell>
                        <TableCell>{invoice.paymentStatus}</TableCell>
                        <TableCell>{invoice.paymentMethod}</TableCell>
                        <TableCell className="text-right">{invoice.totalAmount}</TableCell>
                      </TableRow>
                    ))} */}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell colSpan={3}>Total</TableCell>
                      <TableCell className="text-right">$2,500.00</TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </div>
              <div className="col-span-1 flex">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
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
    </>
  )
}

export default Dashboard;