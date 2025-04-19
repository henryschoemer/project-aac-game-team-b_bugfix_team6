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
  <div className="h-screen w-screen fixed inset-0 overflow-hidden bg-cover bg-center"
       style={{ backgroundImage: "url('/HomePage-Images/Background.jpg')" }}>
    
    <div className="h-full w-full p-4 flex justify-center items-center overflow-y-auto">
      <div className="max-w-[1024px] w-full flex flex-col gap-4 h-full max-h-full relative">
        
        {/* Exit Button - Top Left */}
        <Link href="/" className="absolute top-4 left-4 z-10 scale-50">
          <ExitButton />
        </Link>

        {/* QR Instructions Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border-2 border-teal-300 p-4 shrink-0 pt-12">
          <h2 className="text-xl font-semibold text-gray-900 text-center mb-4">
            How to join with QR code:
          </h2>
          
          <div className="grid grid-cols-4 gap-3 justify-center">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex flex-col items-center">
                <Image 
                  src={`/diagrams/QR${step}.png`}
                  alt={`Step ${step}`}
                  width={100}
                  height={100}
                  className="rounded-lg w-[100px] h-auto"
                  priority
                />
                <p className="mt-2 text-sm text-gray-600 text-center">
                  {step === 1 && "1. Find code"}
                  {step === 2 && "2. Scan code"}
                  {step === 3 && "3. Play together"}
                  {step === 4 && "4. Enjoy"}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Camera Section - Now with constrained height */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border-2 border-teal-300 p-1 w-full flex-1 min-h-0 flex flex-col">
          <h2 className="text-xl font-semibold text-gray-900 mb-3 text-center">
            Scan Below
          </h2>
          
          <div className="flex-1 min-h-0 flex items-center justify-center">
            <div className="w-full max-w-[500px] h-full max-h-[375px] relative mx-auto">
              <Camera setHotspotImage={handleCapturedImage} />
            </div>
          </div>
        </div>

        {/* Status Messages */}
        <div className="shrink-0 min-h-[40px] flex flex-col justify-center">
          {errorMessage && (
            <p className="text-red-500 my-1 text-center text-base">
              {errorMessage}
            </p>
          )}
          {isProcessing && (
            <p className="text-white my-1 text-center text-base">
              Processing QR code...
            </p>
          )}
        </div>
      </div>
    </div>
  </div>
);
}