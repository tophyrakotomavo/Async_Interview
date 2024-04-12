'use client'

import { api } from "@/trpc/react";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react";

let debounceTimeout: string | number | NodeJS.Timeout | undefined;

export const ReadQuestions = () => {
  const [searchValue, setsearchValue] = useState('');

  const { data } = api.questions.getAll.useQuery();
  
 /*  const { data: questiondata ,refetch} = api.questions.getOneQuestion.useQuery({searchQuestion: searchValue});

  const changeValue = (e: any) => {
    setsearchValue(e.target.value);
  };

 */

  
  /* useEffect(() => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      refetch();
    }, 500);
  }, [searchValue, refetch]); */


  return(
    <div>
      <h1>Questions</h1>
      {data?.map((qst) => (
        <li key={qst.question}>
          {qst.question}
        </li>
      ))}
     
        ------------

        <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle><Input /></DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
        -------------
     
    </div>


  )
};
