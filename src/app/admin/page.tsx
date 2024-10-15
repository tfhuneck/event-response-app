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
import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth";

// force fetch updates to prevent stale data
export const dynamic = 'force-dynamic'


const Dashboard = async () => {

//===================AUTH=========================
const session = await auth()

  if (!session?.user) {
    // Redirect to login if no session is found
    redirect("/login");
  }
//===================AUTH=========================

  const eventData = await prisma.event.findMany()
  // console.log('eventdata at server component')
  // console.log(eventData)

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
    <form action={async () => {
        "use server"
        await signOut()
      }}>

      <Button
        variant='secondary'
        className="float-right"
        type="submit"
      >
        Log Out
      </Button>
    </form>
    <Toaster />
    </>
  )
}

export default Dashboard;