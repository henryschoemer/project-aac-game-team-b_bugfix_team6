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
        <div className="page-container"
            style={{
                backgroundImage: "url('/HomePage-Images/Background.jpg')",
                backgroundSize: "cover",
            }}>

            <div className="content-container">
                <div className="title-container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ transform: "scale(0.7)", marginRight: "-10px" }}>
                <Link href="/">
                        <ExitButton />
                </Link>
                </div>
                    <h1 className="title-text">Scan Room QR Code</h1>
                </div>

                <div className="mt-6 mx-auto max-w-[300px] bg-white p-4 rounded-xl shadow-md border-2 border-teal-300">
                    <h2 className="text-lg font-semibold mb-2 text-gray-950">How to join with QR code:</h2>
                    <Image 
                        src="/diagrams/QR Code Join Room2.png" 
                        alt="How to join with QR code: 1) Find code 2) Scan code 3) Play together"
                        width={600}
                        height={400}
                        className="rounded-lg w-full h-auto"
                        priority
                    />
                </div>

                {/* Camera Component for QR Code Scanning */}
                <div className="camera-container pt-5">
                    <Camera setHotspotImage={handleCapturedImage} />
                </div>

                {errorMessage && (
                    <p className="error-message" style={{ color: "red", margin: "12px 0", textAlign: "center" }}>
                        {errorMessage}
                    </p>
                )}
                
                {isProcessing && (
                    <p style={{ color: "white", margin: "12px 0", textAlign: "center" }}>
                        Processing QR code...
                    </p>
                )}
                
                <div style={{ textAlign: "center", margin: "16px 0" }}>
                    <p style={{ color: "white" }}>
                        Position QR code within frame and hold steady
                    </p>
                </div>
            </div>
        </div>
    );
}