"use client";

import React, { useRef, useState, useEffect } from "react";

interface CameraProps {
  setHotspotImage: (imageData: string) => void;
}

const Camera: React.FC<CameraProps> = ({ setHotspotImage }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const startCamera = async () => {
    // Stop any existing stream
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }

    try {
      // First try to access the back camera
      try {
        const newStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" }
        });
        
        setStream(newStream);
        
        if (videoRef.current) {
          videoRef.current.srcObject = newStream;
          videoRef.current.play();
        }
        
        setCameraError(null);
      } catch (err) {
        // If back camera fails, fall back to front camera
        console.log("Back camera not available, trying front camera");
        const frontStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" }
        });
        
        setStream(frontStream);
        
        if (videoRef.current) {
          videoRef.current.srcObject = frontStream;
          videoRef.current.play();
        }
        
        setCameraError(null);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setCameraError("Could not access camera. Please make sure you've given camera permission.");
    }
  };

  // Start camera automatically when component mounts
  useEffect(() => {
    startCamera();
    
    // Clean up function to stop camera when component unmounts
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
      <video 
        ref={videoRef} 
        width="100%" 
        className="rounded-lg mb-4" 
        playsInline // Important for iOS
        autoPlay
        muted
      />
      <canvas ref={canvasRef} style={{ display: "none" }} />
      
      {cameraError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {cameraError}
          <button 
            onClick={startCamera}
            className="ml-4 bg-red-600 text-white px-2 py-1 rounded text-sm"
          >
            Retry
          </button>
        </div>
      )}
      
      <div className="flex justify-center w-full">
        <button
          onClick={captureImage}
          className="bg-green-600 text-white font-bold py-4 px-8 rounded-lg shadow-md hover:bg-green-700 text-xl w-3/4 max-w-sm"
          disabled={!stream}
        >
          Capture
        </button>
      </div>
    </div>
  );
};

export default Camera;