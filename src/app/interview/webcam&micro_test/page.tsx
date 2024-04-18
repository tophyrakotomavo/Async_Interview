'use client'

import Webcam from 'react-webcam';
import { type CameraOptions, useFaceDetection } from 'react-use-face-detection';
import { ReactMediaRecorder } from "react-media-recorder";
import FaceDetection from '@mediapipe/face_detection';
import { Camera } from '@mediapipe/camera_utils';
import { Button } from '@/components/ui';

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
        facingMode: 'user',
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
      <div className='relative flex justify-center'>
        <Webcam
          audio
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
            <div className='fixed right-5 top-3'>
              <ReactMediaRecorder
                audio={true}
                video
                render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
                  <div>
                    {status === 'idle' && <Button onClick={startRecording}>Start test</Button>}
                    {status === 'recording' && <Button onClick={stopRecording}>Stop Recording</Button>}
                    {mediaBlobUrl && (
                      <div>
                        <span > Keep your position to Go to the interview</span>  
                        <video src={mediaBlobUrl} controls autoPlay loop />
                      </div>
                    )}
                  </div>
                )}
              />
            </div>
          </div>
        }
        {detected === false && 
          <span className='fixed bottom-6 right-3'>Make your face visible or  <br />
            verify your microphone
          </span>}
      </div>
    </div>
  );
};

export default WebcamMicroTest;
