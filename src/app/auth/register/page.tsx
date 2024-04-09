'use client'

import  { useForm } from "react-hook-form";
import { Button, Input, Card, CardContent, CardFooter, CardHeader, CardTitle, Label } from "@/components/ui";
import { supabase } from "@/lib";
import type { Credentials } from "@/app/auth/_type";

const Registration = () =>{
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
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return(
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="w-[350px]" >
          <CardHeader>
            <CardTitle>Registration</CardTitle>
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
            <Button type="submit" variant="outline">Send</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default Registration;
