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
  const [isTryingCamera, setIsTryingCamera] = useState(false);

  const startCamera = async () => {
    // Reset states
    setCameraError(null);
    setIsTryingCamera(true);
    
    // Stop any existing stream
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
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
      } catch (err) {
        console.log("Back camera not available, trying front camera");
        // If back camera fails, try front camera
        try {
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
        } catch (frontErr) {
          // If front camera also fails, try any available camera
          console.log("Front camera also not available, trying any camera");
          const anyStream = await navigator.mediaDevices.getUserMedia({
            video: true
          });
          
          setStream(anyStream);
          
          if (videoRef.current) {
            videoRef.current.srcObject = anyStream;
            await videoRef.current.play();
          }
        }
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      
      // Check if this is a permissions issue or device not found
      if (err instanceof DOMException) {
        if (err.name === "NotFoundError") {
          setCameraError("No camera found on this device. Please try using a device with a camera.");
        } else if (err.name === "NotAllowedError") {
          setCameraError("Camera access denied. Please allow camera permissions in your browser settings.");
        } else {
          setCameraError(`Camera error: ${err.message}`);
        }
      } else {
        setCameraError("Could not access camera. Please check your device and permissions.");
      }
    } finally {
      setIsTryingCamera(false);
    }
  };

  // Start camera automatically when component mounts
  useEffect(() => {
    // Check if mediaDevices is supported
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraError("Your browser doesn't support camera access.");
      return;
    }
    
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
        {stream ? (
          <>
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
          </>
        ) : (
          <div className="bg-gray-200 rounded-lg mb-4 w-full aspect-video flex items-center justify-center">
            {isTryingCamera ? (
              <p className="text-lg">Initializing camera...</p>
            ) : (
              <p className="text-lg text-gray-600">Camera not available</p>
            )}
          </div>
        )}
      </div>
      <canvas ref={canvasRef} style={{ display: "none" }} />
      
      {cameraError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center">
          {cameraError}
          <button 
            onClick={startCamera}
            className="ml-4 bg-red-600 text-white px-2 py-1 rounded text-sm"
            disabled={isTryingCamera}
          >
            {isTryingCamera ? "Trying..." : "Retry"}
          </button>
        </div>
      )}
      
      <div className="flex justify-center w-full">
        <button
          onClick={captureImage}
          className="bg-green-600 text-white font-bold py-6 px-8 rounded-lg shadow-md hover:bg-green-700 text-2xl w-3/4 max-w-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={!stream || isTryingCamera}
        >
          {isTryingCamera ? "Initializing..." : "Capture"}
        </button>
      </div>
    </div>
  );
};

export default Camera;