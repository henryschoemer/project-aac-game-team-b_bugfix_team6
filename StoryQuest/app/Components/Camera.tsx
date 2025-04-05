"use client";

import React, { useRef, useState } from "react";

interface CameraProps {
  setHotspotImage: (imageData: string) => void;
}

const Camera: React.FC<CameraProps> = ({ setHotspotImage }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");

  const startCamera = async () => {
    // Stop any existing stream
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }

    try {
      const newStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: facingMode 
        } 
      });
      
      setStream(newStream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
        videoRef.current.play();
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const flipCamera = () => {
    setFacingMode(prevMode => prevMode === "user" ? "environment" : "user");
  };

  // Effect to restart camera when facingMode changes
  React.useEffect(() => {
    if (stream) {
      startCamera();
    }
  }, [facingMode]); // eslint-disable-line react-hooks/exhaustive-deps

  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;
    ctx.drawImage(videoRef.current, 0, 0);

    const imageData = canvasRef.current.toDataURL("image/png");
    setHotspotImage(imageData);
  };

  return (
    <div className="flex flex-col items-center">
      <video ref={videoRef} width="100%" className="rounded-lg mb-4" />
      <canvas ref={canvasRef} style={{ display: "none" }} />
      
      <div className="flex flex-wrap justify-center gap-2">
        <button
          onClick={startCamera}
          className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700"
        >
          Start Camera
        </button>
        
        <button
          onClick={flipCamera}
          className="bg-purple-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-purple-700"
          disabled={!stream}
        >
          Flip Camera
        </button>
        
        <button
          onClick={captureImage}
          className="bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-green-700"
          disabled={!stream}
        >
          Capture
        </button>
      </div>
    </div>
  );
};
export default Camera;