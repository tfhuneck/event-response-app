"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation";

const logInSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string()
})


const LoginForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof logInSchema>>({
    resolver: zodResolver(logInSchema),
  })

  const onSubmit = async (values: z.infer<typeof logInSchema>) => {
    const res = await signIn("credentials", {
      redirect: false, // Set to false to handle the response in your code
      username: values.username,
      password: values.password,
    })

    if (res?.error) {
      console.error(res.error);
    } else {
      console.log("Successfully logged in!");
      router.push(`/admin`);
    }
  }

  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Form {...form}>
              <form 
                onSubmit={form.handleSubmit(onSubmit)} 
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input {...field} id="username" type="text" placeholder="username" required/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input placeholder="password" {...field} id="password" type="password" required/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}

export default LoginForm