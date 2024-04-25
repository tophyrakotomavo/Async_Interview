export type inputText = {
    email: string
  };
  
export type DataFormInviteUser = {
  email: string
};
  
export type PropsFormInviteUser = { onSubmit: (data: DataFormInviteUser) => void; }