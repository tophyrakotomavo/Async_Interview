'use client'

import  { useForm } from "react-hook-form";
import { Button, Input, Card, CardContent, CardFooter, CardHeader, CardTitle, Label, CardDescription } from "@/components/ui";
import { supabase } from "@/lib";
import type { Credentials } from "@/app/auth/_type";
import { useRouter } from "next/navigation";

const Registration = () =>{
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Credentials>();

  const onSubmit = async (data: Credentials) => {
    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });
      if (error) {
        console.error('Error signing up:', error.message);
        return;
      }
      console.log('User signed up successfully:', data.email);
      void router.push( '/');
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return(
        <div className="flex justify-center items-center h-screen">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card className="mx-auto max-w-sm">
              <CardHeader>
                <CardTitle className="text-2xl">Register</CardTitle>
                  <CardDescription>
                    Enter your email below to register to your account..
                  </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="m@example.com" required {...register('email')} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" required  {...register('password')} />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Send</Button>
              </CardFooter>
            </Card>
        </form>
       </div>


    
  );
};

export default Registration;
