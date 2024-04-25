import { cookies } from "next/headers";
import { FormInviteUser } from "./_form/FormInviteUser";
import { useInviteUser } from "./_hooks/useInviteUser";

 const Createinterview = () =>{
  const cookieStore = cookies();
  const { handleSubmit } = useInviteUser(cookieStore);

  return(
    <div>
      <FormInviteUser onSubmit={handleSubmit} />
    </div>
  );
};

export default Createinterview;
