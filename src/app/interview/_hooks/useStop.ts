import { supabase } from "@/lib";
import { useState } from "react";

export const useStop = () =>{
  const [ _uploading, setUploading ] = useState(false);

  const handleStop = async (videoBlob: Blob) => {
    try {
      setUploading(true);
      const { data, error } = await supabase.storage
        .from('test')
        .upload(`video-${Date.now()}.webm`, videoBlob);
  
      if (error) {
        throw error;
      }
  
      console.log('Upload successful:', data);
    } catch (error) {
      console.error('Error uploading video:', error);
    } finally {
      setUploading(false);
    }
  };

  return handleStop;
}

