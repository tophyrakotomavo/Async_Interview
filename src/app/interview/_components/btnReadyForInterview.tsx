import { useSession } from "@/app/_hooks/useSession";
import { Button } from "@/components/ui"
import Link from "next/link"

export const BtnReadyForInterview = () =>{
  const { status } = useSession();

  return(
    <div>
      {status === 'authenticated' && 
        <Link href={'/interview'}><Button> Go to the interview </Button></Link>
      }
      {status === 'unauthenticated' &&
        <p>To pass the interview you must <Link href={'/auth'}>log in</Link></p>
      }
    </div>
  );
};
