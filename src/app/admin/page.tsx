import * as React from "react";
import AdminDash from "@/components/AdminDash";
import prisma from '@/lib/prisma';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Toaster } from "@/components/ui/toaster";

// export const revalidate = 0; // Always revalidate
export const dynamic = 'force-dynamic'
const Dashboard = async () => {
  
  const eventData = await prisma.event.findMany()
  console.log('eventdata at server component')
  console.log(eventData)

  return (
    <>
    <Breadcrumb className="my-2 mx-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbPage>Home</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
    <AdminDash 
      events={eventData}
    />
    <Toaster />
    </>
  )
}

export default Dashboard;