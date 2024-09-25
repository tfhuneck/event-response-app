import Image from "next/image";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
    return (
        <>
            <div className="h-screen flex flex-col items-center justify-center">
                <Card>
                    <CardHeader>
                        <div className="font-bold text-2xl">
                            Scheduler Application
                        </div>
                    </CardHeader>
                    <CardContent>
                    </CardContent>
                    <CardFooter>
                        <div className="">
                            by TFHuneck©
                        </div>
                    </CardFooter>
                </Card>
                <a href="/admin">
                    <Button
                        className="mt-4"
                        >
                        Go to Dashboard
                    </Button>
                </a>
            </div>
        </>
    );
}
