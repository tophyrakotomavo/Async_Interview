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
import { useEffect, useState } from "react";

let debounceTimeout: string | number | NodeJS.Timeout | undefined;

export const ViewAllQuestions = () => {
  const [searchValue, setsearchValue] = useState('');
  const [enable, setenable] = useState(true);

  const { data } = api.questions.getAll.useQuery();
  
  const { data: questiondata ,refetch} = api.questions.getOneQuestion.useQuery({searchQuestion: searchValue},{ enabled: enable });

  useEffect(() => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      void refetch();
    }, 100);
    if (questiondata !== null) return setenable(false);
  }, [searchValue, refetch, questiondata]);

  return(
    <div>
      <h1>Questions</h1>
      {data?.map((qst) => (
        <li key={qst.value}>
          {qst.value}
        </li>
      ))}
      <Dialog>
        <DialogTrigger asChild>
          <Input placeholder="Search question" type="text" className="w-24"/>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle><Input onChange={(e) => setsearchValue(e.target.value)}/></DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
            {questiondata?.map((qst) => (
              <li key={qst.value}>
                {qst.value}
              </li>
            ))}
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
};
