"use client";

import React, { useRef, useState, useEffect } from "react";
import jsQR from "jsqr";
import useTextToSpeech from "@/Components/useTextToSpeech";
import useButtonFeedback from "@/Components/useButtonClickSounds";


interface CameraProps {
  setHotspotImage: (imageData: string) => void;
}

const Camera: React.FC<CameraProps> = ({ setHotspotImage }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const [lastDetectedCode, setLastDetectedCode] = useState<string | null>(null);
  const scanIntervalRef = useRef<number | null>(null);
  const {speak} = useTextToSpeech(); // useTextToSpeech hook
  const { buttonHandler, isSpeaking } = useButtonFeedback();

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
    <div className="flex flex-col items-center">
      <div className="relative w-full">
        <video 
          ref={videoRef} 
          width="100%" 
          className="rounded-lg mb-4" 
          playsInline 
          autoPlay
          muted
        />
        {/* QR code alignment guide */}
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
          <div className="w-64 h-64 border-2 border-green-500 rounded-lg opacity-70"></div>
        </div>
      </div>
      <canvas ref={canvasRef} style={{ display: "none" }} />
      
      {cameraError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center">
          {cameraError}
          <button 
            onClick={()=>{
              buttonHandler('select','retry',speak)
              {startCamera}
            }}
            className="ml-4 bg-red-600 text-white px-2 py-1 rounded text-sm"
          >
            Retry
          </button>
        </div>
      )}
      
      <div className="flex justify-center w-full">
        <button
          onClick={()=>{
            buttonHandler('select','capture',speak)
            {captureImage}
          }}
          className="bg-green-600 text-white font-bold py-4 px-8 rounded-lg shadow-md hover:bg-green-700 text-xl w-3/4 max-w-sm"
          onClick={captureImage}
          className="bg-green-600 text-white font-bold py-6 px-8 rounded-lg shadow-md hover:bg-green-700 text-2xl w-3/4 max-w-sm"
          disabled={!stream}
        >
          Capture
        </button>

        
        {!scanning && (
          <button
            onClick={()=>{
              buttonHandler('select','Resume scanning',speak)
              {restartScanning}
          }}
            className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 mt-2"
          >
            Resume Scanning
          </button>
        )}

      </div>
    </div>
  );
};

export default Camera;