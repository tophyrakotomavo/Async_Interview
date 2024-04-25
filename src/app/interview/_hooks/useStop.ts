import { supabase } from "@/lib/supabase/client";
import { useState } from "react";
import { useSession } from "@/app/_hooks/useSession";

export const useStop = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_uploading, setUploading] = useState(false);

  const {session} = useSession('/auth');

  const handleStop = async (videoBlob: Blob) => {
    const blobName = `video-${session?.user.email}-${Date.now()}.webm`;

    setUploading(true);

    await supabase.storage.from("test").upload(blobName, videoBlob);

    setUploading(false);
    
    const publicUrl = supabase.storage.from('test').getPublicUrl(blobName);
    
    await supabase.from('Response').insert({ value: publicUrl });
    
  };

  return handleStop;
};
