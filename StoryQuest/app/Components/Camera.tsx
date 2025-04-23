import React, { useRef, useState, useEffect } from "react";

interface CameraProps {
  setHotspotImage: (imageData: string) => void;
}

const Camera: React.FC<CameraProps> = ({ setHotspotImage }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const scanIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const startCamera = async () => {
    // Stop any existing stream
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }

    try {
      // First try to access the back camera with more optimal settings
      try {
        const constraints = {
          video: { 
            facingMode: "environment",
            width: { ideal: 640 }, // Lower resolution for better performance
            height: { ideal: 480 }
          }
        };
        
        const newStream = await navigator.mediaDevices.getUserMedia(constraints);
        
        setStream(newStream);
        
        if (videoRef.current) {
          videoRef.current.srcObject = newStream;
          await videoRef.current.play();
          // Start continuous scanning after camera is ready
          setTimeout(() => startContinuousScan(), 1000);
        }
        
        setCameraError(null);
      } catch (err) {
        // If back camera fails, fall back to front camera
        console.log("Back camera not available, trying front camera");
        const frontStream = await navigator.mediaDevices.getUserMedia({
          video: { 
            facingMode: "user",
            width: { ideal: 640 },
            height: { ideal: 480 }
          }
        });
        
        setStream(frontStream);
        
        if (videoRef.current) {
          videoRef.current.srcObject = frontStream;
          await videoRef.current.play();
          // Start continuous scanning after camera is ready
          setTimeout(() => startContinuousScan(), 1000);
        }
        
        setCameraError(null);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setCameraError("Could not access camera. Please make sure you've given camera permission.");
    }
  };

  // Enhanced image preprocessing to improve QR detection
  const preprocessImageData = (imageData: ImageData): ImageData => {
    const data = imageData.data;
    
    // Adjust contrast and brightness
    const contrastFactor = 1.5; // Increase contrast
    const brightnessFactor = 10; // Slightly increase brightness
    
    for (let i = 0; i < data.length; i += 4) {
      // Calculate grayscale value (simple average)
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      
      // Apply contrast and brightness adjustment
      let adjusted = contrastFactor * (avg - 128) + 128 + brightnessFactor;
      
      // Ensure values stay within 0-255 range
      adjusted = Math.max(0, Math.min(255, adjusted));
      
      // Set all RGB channels to the same value (grayscale)
      data[i] = adjusted;     // R
      data[i + 1] = adjusted; // G
      data[i + 2] = adjusted; // B
      // Alpha channel (i + 3) remains unchanged
    }
    
    return imageData;
  };

  const captureAndScanFrame = () => {
    if (!videoRef.current || !canvasRef.current || !window.jsQR) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw the current video frame to the canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Get the image data for processing
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    // Apply preprocessing to enhance QR code detection
    const processedImageData = preprocessImageData(imageData);
    ctx.putImageData(processedImageData, 0, 0);

    try {
      // Attempt to decode the QR code
      const code = window.jsQR(
        processedImageData.data,
        processedImageData.width,
        processedImageData.height,
        {
          inversionAttempts: "attemptBoth" // Try both normal and inverted colors
        }
      );

      if (code) {
        // If QR code is found, stop scanning and process it
        stopContinuousScan();
        const imageData = canvas.toDataURL("image/png");
        setHotspotImage(imageData);
        // Visual feedback that QR was detected
        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.strokeStyle = "#00FF00";
        ctx.moveTo(code.location.topLeftCorner.x, code.location.topLeftCorner.y);
        ctx.lineTo(code.location.topRightCorner.x, code.location.topRightCorner.y);
        ctx.lineTo(code.location.bottomRightCorner.x, code.location.bottomRightCorner.y);
        ctx.lineTo(code.location.bottomLeftCorner.x, code.location.bottomLeftCorner.y);
        ctx.lineTo(code.location.topLeftCorner.x, code.location.topLeftCorner.y);
        ctx.stroke();
      }
    } catch (error) {
      console.log("Error scanning QR code:", error);
    }
  };

  const startContinuousScan = () => {
    if (isScanning) return;
    
    setIsScanning(true);
    // Scan every 300ms
    scanIntervalRef.current = setInterval(captureAndScanFrame, 300);
  };

  const stopContinuousScan = () => {
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = null;
    }
    setIsScanning(false);
  };

  // Manual capture button functionality
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

  // Start camera automatically when component mounts
  useEffect(() => {
    // Check if jsQR is available or needs to be loaded
    if (typeof window !== 'undefined' && !window.jsQR) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.min.js';
      script.async = true;
      script.onload = startCamera;
      document.body.appendChild(script);
    } else {
      startCamera();
    }
    
    // Clean up function to stop camera when component unmounts
    return () => {
      stopContinuousScan();
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
          <div className="w-64 h-64 border-2 border-green-500 rounded-lg opacity-70">
            {isScanning && (
              <div className="absolute inset-0 border-2 border-yellow-500 animate-pulse rounded-lg"></div>
            )}
          </div>
        </div>
      </div>
      <canvas ref={canvasRef} style={{ display: "none" }} />
      
      {cameraError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center">
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
          className="bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-green-700 text-lg w-1/2 max-w-sm ml-2"
          disabled={!stream}
        >
          Capture
        </button>
      </div>
    </div>
  );
};

export default Camera;

// Add jsQR type definition
declare global {
  interface Window {
    jsQR: (
      data: Uint8ClampedArray,
      width: number,
      height: number,
      options?: {
        inversionAttempts: "dontInvert" | "onlyInvert" | "attemptBoth";
      }
    ) => {
      data: string;
      location: {
        topLeftCorner: { x: number; y: number };
        topRightCorner: { x: number; y: number };
        bottomRightCorner: { x: number; y: number };
        bottomLeftCorner: { x: number; y: number };
      };
    } | null;
  }
}