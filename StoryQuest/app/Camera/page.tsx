"use client"

import { useRef, useEffect, useState } from "react";
import "./Camera.css"; // Make sure this CSS file exists

interface CameraProps {
  setHotspotImage: (img: string) => void;
}

function Camera({ setHotspotImage }: CameraProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [streamActive, setStreamActive] = useState(false);

  useEffect(() => {
    // Set up camera when component mounts
    const setupCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: "environment" } // Use back camera if available
        });
        
        if (videoRef.current && canvasRef.current && divRef.current) {
          videoRef.current.srcObject = mediaStream;
          
          videoRef.current.onloadedmetadata = () => {
            const video = videoRef.current!;
            const div = divRef.current!;
            const canvas = canvasRef.current!;
            
            const videoAspectRatio = video.videoWidth / video.videoHeight;
            const maxWidth = window.innerWidth * 0.9;
            const maxHeight = window.innerHeight * 0.9;
            const containerAspectRatio = maxWidth / maxHeight;

            if (containerAspectRatio > videoAspectRatio) {
              div.style.width = `${maxHeight * videoAspectRatio}px`;
              div.style.height = `${maxHeight}px`;
            } else {
              div.style.width = `${maxWidth}px`;
              div.style.height = `${maxWidth / videoAspectRatio}px`;
            }

            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            video.play();
            setStreamActive(true);
          };
        }
      } catch (err) {
        console.error(`Error accessing camera: ${err}`);
      }
    };

    setupCamera();

    // Clean up function to stop all media tracks when component unmounts
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
        setStreamActive(false);
      }
    };
  }, []);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  function takePicture() {
    if (!canvasRef.current || !videoRef.current) return;
    
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;
    
    context.drawImage(videoRef.current, 0, 0);
    const data = canvas.toDataURL("image/png");
    setHotspotImage(data);
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          const img = new Image();
          img.onload = () => {
            if (!canvasRef.current) return;
            
            const tempCanvas = document.createElement("canvas");
            tempCanvas.width = img.width;
            tempCanvas.height = img.height;
            const ctx = tempCanvas.getContext("2d");
            if (ctx) {
              ctx.drawImage(img, 0, 0, img.width, img.height);
              setHotspotImage(tempCanvas.toDataURL("image/png"));
            }
          };
          img.src = e.target.result.toString();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div id="camera-canvas-container" ref={divRef}>
      <video id="video" ref={videoRef} />
      
      {/* QR code scanning area indicator */}
      <div className="qr-scan-overlay">
        <div className="qr-scan-border"></div>
        <p className="qr-scan-text">Align QR code here</p>
      </div>
      
      <div id="start-button-ring">
        <button 
          id="start-button" 
          onClick={takePicture}
          disabled={!streamActive}
        >
          Scan
        </button>
      </div>
      
      <button id="upload-button" onClick={handleButtonClick}>
        Upload Image
      </button>
      
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        accept="image/*"
        id="file-input"
        style={{ display: 'none' }}
      />
      
      <canvas id="camera-canvas" ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
}

export default Camera;