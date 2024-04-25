'use client'

import  { useForm } from "react-hook-form";
import { Button, Input, Card, CardContent, CardFooter, CardHeader, CardTitle, Label } from "@/components/ui";
import { supabase } from "@/lib/supabase/client";
import type { inputText } from "@/app/interview/_type";
import { api } from "@/trpc/react";

export const CreateQuestions = () =>{
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<inputText>();
  const utils = api.useUtils()

  const onSubmit = async (data: inputText) => {
    try {
      const { error } = await supabase.from('Questions').insert({
        value: data.value,
      });
      
      if (error) {
        console.error(error.message);
        return;
      }
      await utils.questions.getAll.refetch(); 
    } catch (error) {
      console.error(error);
    }
  };

  return(
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="w-[350px]" >
          <CardHeader>
            <CardTitle>Create question</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-1.5">
              <Label>Enter your question here</Label>
              <Input id="questions" placeholder="Type here" {...register('value')}/>
              {errors.value && <span>This field is required</span>}
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

