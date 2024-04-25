import { api } from "@/trpc/react"

export const useInviteUser = async (candidat: string, user_id: string) => {
  const { mutateAsync } = api.invite.insert.useMutation();

  await mutateAsync({ candidat, user_id });
}
