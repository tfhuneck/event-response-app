import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const Confirm = ({ params }: { params: { firstname: string, lastname: string} }) => {

  const capitalizeFirstLetter = (string : String) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
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
      <main className="h-screen flex flex-col items-center justify-center font-serif z-10">
        <div className="h-screen flex flex-col mt-32 items-center">
          <Card className="w-full h-1/2 mt-32 col-span-3 border-0 backdrop-blur-md bg-opacity-80">
            <CardHeader className="flex flex-col items-center">
              <Image 
                src='/TGR_VERT_BLK-GLD.png'
                width={50}
                height={50}
                alt='TGNR'
              />
            </CardHeader>
            <CardContent className="flex flex-col justify-center text-2xl font-medium mt-20">
              Thank you {`${capitalizeFirstLetter(params.firstname)}`} {`${capitalizeFirstLetter(params.lastname)}`}
              <p>
                We recieved your Confirmation
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  )
}

export default Confirm;