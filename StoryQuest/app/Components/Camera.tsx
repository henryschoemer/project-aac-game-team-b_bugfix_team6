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
          video: { 
            facingMode: "environment",
            width: { ideal: 1280 },
            height: { ideal: 720 }
          }
        });
        
        setStream(newStream);
        
        if (videoRef.current) {
          videoRef.current.srcObject = newStream;
          await videoRef.current.play();
        }
        
        setCameraError(null);
      } catch (err) {
        // If back camera fails, fall back to front camera
        console.log("Back camera not available, trying front camera");
        const frontStream = await navigator.mediaDevices.getUserMedia({
          video: { 
            facingMode: "user",
            width: { ideal: 1280 },
            height: { ideal: 720 }
          }
        });
        
        setStream(frontStream);
        
        if (videoRef.current) {
          videoRef.current.srcObject = frontStream;
          await videoRef.current.play();
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
    <div className="flex flex-col md:flex-row h-full w-full gap-2">

      <div className="relative w-full md:w-[70%] h-full min-h-[250px] bg-black rounded-lg overflow-hidden">
        <video 
          ref={videoRef} 
          className="w-full h-full object-contain"
          playsInline 
          autoPlay
          muted
        />
        {/* QR code alignment guide */}
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
          <div className="w-64 h-64 border-2 border-green-500 rounded-lg opacity-70"></div>
        </div>
      </div>

      {/* Right Controls - takes remaining space */}
      <div className="w-full md:w-[25%] flex flex-col justify-center items-center gap-4 p-1">
        <canvas ref={canvasRef} style={{ display: "none" }} />
        
        <button
          onClick={captureImage}
          className="bg-green-600 text-white font-bold py-1 px-3 rounded-lg shadow-md hover:bg-green-700 text-xl w-full max-w-[200px]"
          disabled={!stream}
        >
          Capture
        </button>
        
        {cameraError && (
          <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-center">
            {cameraError}
            <button 
              onClick={startCamera}
              className="mt-2 bg-red-600 text-white px-2 py-1 rounded text-sm w-full"
            >
              Retry
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Camera;