"use client";

import { useRef, useEffect, useState } from "react";
import "./Camera.css";

export default function Camera() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [hotspotImage, setHotspotImage] = useState<string>("");
  const [streamActive, setStreamActive] = useState(false);

  useEffect(() => {
    const setupCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
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

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
        setStreamActive(false);
      }
    };
  }, []);

  function takePicture() {
    if (!canvasRef.current || !videoRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    context.drawImage(videoRef.current, 0, 0);
    const data = canvas.toDataURL("image/png");
    setHotspotImage(data);
  }

  return (
    <div id="camera-canvas-container" ref={divRef}>
      <video id="video" ref={videoRef} />

      <div className="qr-scan-overlay">
        <div className="qr-scan-border"></div>
        <p className="qr-scan-text">Align QR code here</p>
      </div>

      <div id="start-button-ring">
        <button id="start-button" onClick={takePicture} disabled={!streamActive}>
          Scan
        </button>
      </div>

      {hotspotImage && <img src={hotspotImage} alt="Captured" />}
    </div>
  );
}