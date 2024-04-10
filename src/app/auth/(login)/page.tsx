'use client'

import  { useForm } from "react-hook-form";
import { Button, Input, Card, CardContent, CardFooter, CardHeader, CardTitle, Label, CardDescription } from "@/components/ui";
import type { Credentials } from "@/app/auth/_type";
import { useLogin } from "./_hooks/useLogin";


const Login = () =>{
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Credentials>();

  const signin = useLogin();

  return(
    <div className="flex justify-center items-center h-screen">
    
      <form onSubmit={handleSubmit(signin)}>
      <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account.
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
        <Button className="w-full">Sign in</Button>
      </CardFooter>
    </Card>
    </form>

    </div>
  );
};

export default Login;
