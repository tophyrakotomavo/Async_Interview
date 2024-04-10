'use client'

import Webcam from "react-webcam";
import { ReactMediaRecorder } from "react-media-recorder";
import { Button } from "@/components/ui";
import { BtnReadyForMaintenance } from "@/app/interview/_components/btnReadyForMaintenace";
import Link from "next/link";

const WebcamMicroTest = () => (
  <div>
    <ReactMediaRecorder
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
              <BtnReadyForMaintenance/>
              <video src={mediaBlobUrl} controls autoPlay loop />
              <Link href={'/'}>Back</Link>
            </div>
          }
        </div>
      )}
    />
    <Webcam
        mirrored
        style={{
          height: 600,
          width: 600,
          position: 'absolute',
        }}
      />
  </div>
);

export default WebcamMicroTest;
