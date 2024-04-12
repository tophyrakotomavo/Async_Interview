'use client'

import Webcam from "react-webcam";
import { ReactMediaRecorder } from "react-media-recorder";
import { Button } from "@/components/ui";
import { BtnReadyForInterview } from "@/app/interview/_components/btnReadyForInterview";
import Link from "next/link";

const WebcamMicroTest = () => {

  return(
    <div>
      <ReactMediaRecorder
        audio
        video
        render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
          <div>
            {status === 'idle' && 
              <div>
                <Link href={'/'}>Back</Link>
                <Button onClick={startRecording}>Start test</Button>
              </div>
            }
            {status === 'recording' &&
              <Button onClick={stopRecording}>Stop test</Button>
            }
            {mediaBlobUrl && 
              <div>
                <video src={mediaBlobUrl} controls autoPlay loop />
                <Link href={'/'}>Back</Link>
              </div>
            }
            <BtnReadyForInterview/>
          </div>
        )}
      />
      <Webcam
          audio
          mirrored
          style={{
            height: 600,
            width: 600,
            position: 'absolute',
          }}
        />
    </div>
  );
};
  
export default WebcamMicroTest;
