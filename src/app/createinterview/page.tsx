'use client'

import  { useForm } from "react-hook-form";
import { Button, Input, Card, CardContent, CardFooter, CardHeader, CardTitle, Label } from "@/components/ui";
import { supabase } from "@/lib";
import type { inputText } from "@/app/createinterview/_type";
import { api } from "@/trpc/react";
import { useSession } from "../_hooks/useSession";

 const Createinterview = () =>{
   const {session} = useSession();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<inputText>();
  const utils = api.useUtils()

  const onSubmit = async (data: inputText) => {

    try {
      const { error } = await supabase.from('Interview').insert({
        user_id: session?.user.id,
        candidat: data.email
        
      });
      
      if (error) {
        console.error(error.message);
        return;
      }
      
    } catch (error) {
      console.error(error);
    }
  };

  return(
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="w-[350px]" >
          <CardHeader>
            <CardTitle>Create email</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-1.5">
              <Label>Enter your email here</Label>
              <Input id="emails" placeholder="Type here" {...register('email')}/>
              {errors.email && <span>This field is required</span>}
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

export default Createinterview;
