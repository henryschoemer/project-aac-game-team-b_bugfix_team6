"use client";

import React, { useRef } from "react";

interface CameraProps {
  setHotspotImage: (imageData: string) => void;
}

const Camera: React.FC<CameraProps> = ({ setHotspotImage }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

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
    <div>
      <video ref={videoRef} width="100%" />
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <button
        onClick={startCamera}
        className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 m-2"
      >
        Start Camera
      </button>

      <button
        onClick={captureImage}
        className="bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-green-700 m-2"
      >
        Capture
      </button>

    </div>
  );
};

export default Camera;