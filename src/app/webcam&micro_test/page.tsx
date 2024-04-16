'use client'

import Webcam from 'react-webcam';
import { type CameraOptions, useFaceDetection } from 'react-use-face-detection';
import { ReactMediaRecorder } from "react-media-recorder";
import FaceDetection from '@mediapipe/face_detection';
import { Camera } from '@mediapipe/camera_utils';
import { Button } from '@/components/ui';
import Link from 'next/link';

const WebcamMicroTest= () => {
  const { webcamRef, isLoading, detected, facesDetected } = useFaceDetection({
    mirrored: true,
    faceDetectionOptions: {
      model: 'short',
    },
    faceDetection: new FaceDetection.FaceDetection({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`,
    }),
    camera: ({ mediaSrc, onFrame }: CameraOptions) =>
      new Camera(mediaSrc, {
        onFrame,
        width: 600,
        height: 600,
      }),
  });
  
  return (
    <div>
      <div className='fixed top-4 left-5'>
        <p>{`Loading: ${isLoading}`}</p>
        <p>{`Face Detected: ${detected}`}</p> 
        <p>{`Number of faces detected: ${facesDetected}`}</p>
      </div>
      <div>
        <ReactMediaRecorder
          audio
          video
          render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
            <div>
              {status === 'idle' && <Button onClick={startRecording}>Start Recording</Button>}
              {status === 'recording' && <Button onClick={stopRecording}>Stop Recording</Button>}
              {mediaBlobUrl && <video src={mediaBlobUrl} controls autoPlay loop />}
            </div>
          )}
        />
      </div>
      <div className='relative flex justify-center'>
          <Webcam
            ref={webcamRef}
            mirrored
            style={{
              height: 600,
              width: 600,
              position: 'absolute',
            }}
          />

        {detected === true && 
          <div className='fixed bottom-6 right-3'>
            <span > Keep your position to <Link href={`/interview`}> Go to the interview</Link></span>
          </div>
        }
        {detected === false && <span className='fixed bottom-6 right-3'>Make your face visible</span>}
      </div>
    </div>
  );
};

export default WebcamMicroTest;
