import { supabase } from "@/lib";
import { useState } from "react";

export const useStop = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_uploading, setUploading] = useState(false);

  const handleStop = async (videoBlob: Blob) => {
    const { data } = await supabase.auth.getUser();

    setUploading(true);

    await supabase.storage
      .from("test")
      .upload(`video-${data.user?.email}.webm`, videoBlob);

    setUploading(false);
  };

  return handleStop;
};
