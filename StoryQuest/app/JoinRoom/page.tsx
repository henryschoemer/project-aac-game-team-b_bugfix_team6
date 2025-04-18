"use client";

import React, { useState } from "react";
import Link from "next/link";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseControls/firebaseConfig";
import "../CreateRoom/CreateRoomButtonStyles.css";
import { ExitButton } from "../HomePage/HomePageButtons";
import TextToSpeechTextOnly from "@/Components/TextToSpeechTextOnly";
import useSound from "use-sound";
import Camera from "../Components/Camera";
import jsQR from "jsqr";
import Image from "next/image";


export default function JoinRoomPage() {
    const [roomId, setRoomId] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);

    const joinRoomClick = "/sounds/joinroom-click.mp3";
    const [playJoinRoomClick] = useSound(joinRoomClick);

    const handleCapturedImage = (imageData: string) => {
        // Prevent multiple processing attempts simultaneously
        if (isProcessing) return;

        setIsProcessing(true);

        // Add a short delay to ensure camera is stabilized
        setTimeout(() => {
            processQRCode(imageData);
            setIsProcessing(false);
        }, 300); // 300ms delay
    };
    const processQRCode = (imageData: string) => {
        // Use HTMLImageElement constructor explicitly to avoid conflicts with Next.js Image
        const img = new window.Image();
        img.onload = () => {
            // Create a canvas for the image
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            // Set dimensions for the canvas
            canvas.width = img.width;
            canvas.height = img.height;

            //image enhancement
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            // Attempt to decode the QR code
            try {
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const code = jsQR(
                    imageData.data,
                    imageData.width,
                    imageData.height,
                    {
                        inversionAttempts: "dontInvert"
                    }
                );

                if (code) {
                    // Successfully found QR code
                    setRoomId(code.data);
                    handleJoinRoom(code.data);
                } else {
                    setErrorMessage("No QR code detected. Please position the code clearly and try again.");
                }
            } catch (err) {
                console.error("Error processing QR code:", err);
                setErrorMessage("Error processing QR code. Please try again.");
            }
        };

        img.onerror = () => {
            setErrorMessage("Error loading captured image. Please try again.");
            setIsProcessing(false);
        };

        img.src = imageData;
    };

    const handleJoinRoom = async (scannedRoomId: string) => {
        if (!scannedRoomId) {
            setErrorMessage("No room ID detected.");
            return;
        }

        try {
            // The scanned URL might be the full URL instead of just the room ID
            // Extract just the room ID from the URL if needed
            let roomIdToCheck = scannedRoomId;

            // Check if the scanned value is a URL (from your QR code)
            if (scannedRoomId.startsWith("http")) {
                // Parse the URL to extract the roomId
                const urlParts = scannedRoomId.split('/');
                // The roomId should be the second-to-last segment in your URL structure
                // /Gameplay/roomId/storyTitle
                roomIdToCheck = urlParts[urlParts.length - 2];
            }

            console.log("Checking room ID:", roomIdToCheck);

            // Now check if this room exists in Firebase
            const roomRef = doc(db, "rooms", roomIdToCheck);
            const roomDoc = await getDoc(roomRef);

            if (roomDoc.exists()) {
                playJoinRoomClick();

                // Extract storyTitle if it's in the URL
                let storyTitle = "";
                if (scannedRoomId.startsWith("http")) {
                    const urlParts = scannedRoomId.split('/');
                    storyTitle = urlParts[urlParts.length - 1];
                }

                // Navigate to the gameplay page with the extracted roomId and storyTitle
                window.location.href = `/Gameplay/${roomIdToCheck}/${storyTitle}`;
            } else {
                setErrorMessage("Room not found. Please check the QR code and try again.");
            }
        } catch (error) {
            console.error("Error joining room:", error);
            setErrorMessage("Error joining room. Please try again.");
        }
    };


    return (
  <div className="page-container" style={{
    backgroundImage: "url('/HomePage-Images/Background.jpg')",
    backgroundSize: "cover",
    minHeight: "100vh",
    padding: "20px"
  }}>
    <div className="content-container" style={{
      maxWidth: "1024px", // Standard iPad landscape width
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      gap: "24px"
    }}>
      {/* Header Section */}
      <div className="title-container" style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        padding: "0 20px"
      }}>
        <div style={{ transform: "scale(0.9)" }}>
          <Link href="/">
            <ExitButton />
          </Link>
        </div>
        <h1 className="title-text" style={{
          fontSize: "2rem",
          fontWeight: "bold",
          color: "black",
          textAlign: "center",
          flex: 1
        }}>Scan Room QR Code</h1>
      </div>

      {/* QR Instructions Section */}
      <div style={{
        backgroundColor: "white",
        padding: "24px",
        borderRadius: "16px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        border: "2px solid #4FD1C5" // teal-300
      }}>
        <h2 style={{
          fontSize: "1.5rem",
          fontWeight: "600",
          color: "#111827", // gray-950
          textAlign: "center",
          marginBottom: "24px"
        }}>How to join with QR code:</h2>
        
            <div style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "flex-start",
                gap: "16px"
                }}>
                {[1, 2, 3, 4].map((step) => (
            <div key={step} style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "160px"
            }}>
              <Image 
                src={`/diagrams/QR${step}.png`}
                alt={`Step ${step}`}
                width={140}
                height={140}
                style={{
                  borderRadius: "8px",
                  width: "140px",
                  height: "auto"
                }}
                priority
              />
              <p style={{
                marginTop: "12px",
                fontSize: "1rem",
                color: "#4B5563", // gray-600
                textAlign: "center"
              }}>
                {step === 1 && "1. Find code"}
                {step === 2 && "2. Scan code"}
                {step === 3 && "3. Play together"}
                {step === 4 && "4. Enjoy"}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Camera Section */}
      <div style={{
        backgroundColor: "white",
        padding: "24px",
        borderRadius: "16px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        border: "2px solid #4FD1C5",
        width: "100%",
        maxWidth: "800px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <h2 style={{
          fontSize: "1.5rem",
          fontWeight: "600",
          color: "#111827",
          marginBottom: "20px"
        }}>Scan Below</h2>
        
        <div style={{
          width: "640px",
          height: "480px",
          position: "relative"
        }}>
          <Camera setHotspotImage={handleCapturedImage} />
        </div>
      </div>

      {/* Status Messages */}
      {errorMessage && (
        <p style={{ 
          color: "red", 
          margin: "12px 0", 
          textAlign: "center",
          fontSize: "1.1rem"
        }}>
          {errorMessage}
        </p>
      )}

      {isProcessing && (
        <p style={{ 
          color: "white", 
          margin: "12px 0", 
          textAlign: "center",
          fontSize: "1.1rem"
        }}>
          Processing QR code...
        </p>
      )}
    </div>
  </div>
);
}