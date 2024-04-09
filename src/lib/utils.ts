import type { SessionResponse } from "@/types";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
/* import { supabase } from "./supabase"; */

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getStatus = (session: SessionResponse, loading: boolean) => {
  if (loading) return 'loading';

  if (!session) return 'unauthenticated';

  return 'authenticated'
}

/* const { data } = supabase
  .storage
  .from('test')
  .getPublicUrl('https://tgbccztllhokldpgymvt.supabase.co/storage/v1/object/public/test/video-1711663045584.webm') */