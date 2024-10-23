
import * as React from "react";
import prisma from '@/lib/prisma';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import AltResponseList from "@/components/AltResponseList";

const AltResponses = async () => {

  const altResponses = await prisma.altResponse.findMany({})

  return (
    <>
      <Breadcrumb className="my-2 mx-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator/>
          <BreadcrumbItem>
            <BreadcrumbPage> Alt Responses </BreadcrumbPage>
          </BreadcrumbItem> 
        </BreadcrumbList>
      </Breadcrumb>
      <AltResponseList altResponses={altResponses} />
    </>
  )
}

export default AltResponses;
