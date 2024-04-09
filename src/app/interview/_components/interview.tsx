'use client'

import Webcam from 'react-webcam';
import { type CameraOptions, useFaceDetection } from 'react-use-face-detection';
import { useReactMediaRecorder } from "react-media-recorder";
import FaceDetection from '@mediapipe/face_detection';
import { Camera } from '@mediapipe/camera_utils';
import { useStop } from '@/app/interview/_hooks/useStop';

export const Interview = () => {
  const handleStop = useStop()

  const { webcamRef, isLoading, detected, facesDetected  } = useFaceDetection({
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
  } = useReactMediaRecorder({ video: true, onStop(_blobUrl, videoBlob) {void handleStop(videoBlob)} });
  
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
              <button onClick={startRecording}>Start Recording</button>
            )}
            {status === 'recording' && (
              <button onClick={stopRecording}>Stop Recording</button>
            )}
          </div>
        }
      </div>
    </div>
  );
};
