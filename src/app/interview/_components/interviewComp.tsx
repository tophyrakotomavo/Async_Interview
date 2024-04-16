'use client'

import Webcam from 'react-webcam';
import { type CameraOptions, useFaceDetection } from 'react-use-face-detection';
import { useReactMediaRecorder } from "react-media-recorder";
import FaceDetection from '@mediapipe/face_detection';
import { Camera } from '@mediapipe/camera_utils';
import { useStop } from '@/app/interview/_hooks/useStop';
import { Button } from '@/components/ui';

export const InterviewComp = () => {
  const handleStop = useStop();
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

  const {
    status,
    startRecording,
    stopRecording,
  } = useReactMediaRecorder({ video: true, onStop(blobUrl, videoBlob) {void handleStop(videoBlob)} });
  
  return (
    <div>
      <div className='fixed bottom-4 right-5'>
        <p>{`status: ${status}`}</p>
        <p>{`Loading: ${isLoading}`}</p>
        <p>{`Face Detected: ${detected}`}</p> 
        <p>{`Number of faces detected: ${facesDetected}`}</p>
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
          <div className='absolute'>
            {status === 'idle' && (
              <Button onClick={startRecording}>Start interview</Button>
            )}
            {status === 'recording' && (
              <Button onClick={stopRecording}>Stop</Button>
            )}
            {status === 'stopped' && (
              <Button onClick={startRecording}>Start interview</Button>
            )}
          </div>
        }
      </div>
    </div>
  );
};
