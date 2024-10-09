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
import { redirect } from "next/navigation";
// import { authOptions } from "@/lib/auth";
// import { getServerSession } from "next-auth";
// export const revalidate = 0; // Always revalidate

// force fetch updates to prevent stale data
export const dynamic = 'force-dynamic'


const Dashboard = async () => {

//===================AUTH=========================
//   const session = await getServerSession(authOptions);

//   if (!session) {
//     // Redirect to login if no session is found
//     redirect("/login");
//   }
//===================AUTH=========================

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