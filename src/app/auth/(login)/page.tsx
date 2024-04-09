'use client'

import  { useForm } from "react-hook-form";
import { Button, Input, Card, CardContent, CardFooter, CardHeader, CardTitle, Label } from "@/components/ui";
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
    <div>
      <form onSubmit={handleSubmit(signin)}>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-1.5">
              <Label>Email</Label>
              <Input id="email" placeholder="E-mail" {...register('email')}/>
              {errors.email && <span>This field is required</span>}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label>Password</Label>
              <Input id="password" type="password" placeholder="Password" {...register('password')}/>
              {errors.password && <span>This field is required</span>}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="submit" variant="outline">Login</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default Login;
