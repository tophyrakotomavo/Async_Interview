'use client'

import Webcam from "react-webcam";
import { ReactMediaRecorder } from "react-media-recorder";
import { Button } from "@/components/ui";
import Link from "next/link";

const WebcamMicroTest = () => (
  <div>
    <ReactMediaRecorder
      video
      render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
        <div>
          {status === 'idle' && 
            <Button onClick={startRecording}>Start test</Button>
          }
          {status === 'recording' &&
            <Button onClick={stopRecording}>Stop test</Button>
          }
          {mediaBlobUrl && 
            <div>
              <video src={mediaBlobUrl} controls autoPlay loop />
              <Link  href='/interview'> <Button> Ready for maitenance </Button> </Link>
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
