import Link from "next/link";

export const BtnVerifyWebcam = () =>(
  <Link href={'/interview/webcam&micro_test'} className="fixed bottom-9 right-5">
    Test the webcam and microphone
  </Link>
);
