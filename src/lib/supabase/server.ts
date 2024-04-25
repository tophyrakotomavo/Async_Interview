import { createServerClient } from "@supabase/ssr";
import type { cookies } from "next/headers";
import { env } from "@/env";

export const supabase = (cookieStore: ReturnType<typeof cookies>) => createServerClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
    },
  },
);
