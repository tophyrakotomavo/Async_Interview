'use client'
import  { useForm } from "react-hook-form";
import { Button, Input, Card, CardContent, CardFooter, CardHeader, CardTitle, Label } from "@/components/ui";
import type { DataFormInviteUser, PropsFormInviteUser } from "../_type";

export const FormInviteUser = ({ onSubmit }: PropsFormInviteUser) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DataFormInviteUser>();

  return (
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
  )
}