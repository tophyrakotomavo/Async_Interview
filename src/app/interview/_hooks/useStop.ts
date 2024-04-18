import { supabase } from "@/lib";
import { useState } from "react";

export const useStop = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_uploading, setUploading] = useState(false);

  const handleStop = async (videoBlob: Blob) => {
    const { data } = await supabase.auth.getUser();
    const blobName = `video-${data.user?.email}-${Date.now()}.webm`;

    setUploading(true);

    await supabase.storage.from("test").upload(blobName, videoBlob);

    setUploading(false);
    
    const publicUrl = supabase.storage.from('test').getPublicUrl(blobName);
    
    await supabase.from('Response').insert({ value: publicUrl });
  };

  return handleStop;
};
