import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import prisma from '@/lib/prisma';

const Confirm = async ({ params }: { params: { responseid: string} }) => {

  const responseData = await prisma.response.findUnique({
    where: {
      responseID: params.responseid
    }
  })

  const slotData = await prisma.timeslot.findUnique({
    where: {
      id: responseData?.slotID
    }
  })

  console.log(responseData)

  const capitalizeFirstLetter = (string : String) => {
    if(string)return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <>
      <div className="fixed h-screen w-screen flex flex-col items-center justify-center pt-52 sm:pt-20 sm:px-10">
        <div className="relative w-full h-full sm:h-2/3">
          <Image 
            className="z-0 rounded-lg"
            src='/upper-fern-bg-lg.png'
            alt="Background"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
        </div>
      </div>
      { responseData && slotData &&
        <main className="h-screen flex flex-col items-center justify-center font-serif z-10">
          <div className="h-screen flex flex-col mt-32 items-center sm:pt-20 sm:px-10 sm:w-8/12 2xl:w-6/12">
            <Card className="w-full flex flex-col justify-center items-center h-1/2 mt-32 col-span-3 border-0 backdrop-blur-md bg-opacity-80">
              <CardHeader className="text-xl" >
                Thank you {`${capitalizeFirstLetter(responseData.firstName)}`},
                <p>
                  We have recieved your RSVP
                </p>
              </CardHeader>
              <CardContent className="flex flex-col items-center text-xl font-medium">
                <p className="font-semibold">
                  {slotData.time.toDateString()}
                </p>
                <p className="font-semibold">
                  {slotData.name}
                </p>
                <br />
              </CardContent>
              <CardFooter className="text-xl">
                  Please come to the<br />
                  Historic Main Street in Woodland <br />
                  524 Main Street, Suite 101.
              </CardFooter>
            </Card>
          </div>
        </main>
      } 
    </>
  )
}

export default Confirm;