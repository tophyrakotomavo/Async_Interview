import type { Session } from "@supabase/supabase-js";

export type Status = "loading" | "unauthenticated" | "authenticated";

export type SessionResponse = Session | null | undefined;

export type UseSession = {
  session: SessionResponse,
  status: Status
}
