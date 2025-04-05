"use client";

import React, { useState } from "react";
import Link from "next/link";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseControls/firebaseConfig";
import "../CreateRoom/CreateRoomButtonStyles.css";
import { BackButton } from "../HomePage/HomePageButtons";
import TextToSpeechTextOnly from "@/Components/TextToSpeechTextOnly";
import useSound from "use-sound";
import Camera from "../Components/Camera";
import jsQR from "jsqr";

export default function JoinRoomPage() {
    const [roomId, setRoomId] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const joinRoomClick = "/sounds/joinroom-click.mp3";
    const [playJoinRoomClick] = useSound(joinRoomClick);


    const handleCapturedImage = (imageData: string) => { // handles image 
        processQRCode(imageData);
    };

    const processQRCode = (imageData: string) => {
        const img = new Image(); // creates the image
        img.onload = () => {
            // .onload waits for the image to load before moving on

            const canvas = document.createElement("canvas"); // This will create a canvas for the image 
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0); // this will draw the image of the qr code to the canvas

            const imageDataObj = ctx.getImageData(0, 0, canvas.width, canvas.height);

            try {
                // thiswill now try to read the qrcode
                const code = jsQR(imageDataObj.data, imageDataObj.width, imageDataObj.height);
                if (code) {
                    //good qr code
                    setRoomId(code.data);
                    handleJoinRoom(code.data);
                } else {
                    setErrorMessage("No QR code found. Please try again.");
                }
            } catch (err) {
                console.error("Error processing QR code:", err);
                setErrorMessage("Error processing image. Please try again.");
            }
        };

        img.src = imageData;
        img.onerror = () => {
            setErrorMessage("Error loading captured image. Please try again.");
        };
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
            
            {<TextToSpeechTextOnly text="Please scan a room QR code" />}
            
            <div className="content-container">
                <div className="title-container">
                    <h1 className="title-text">Scan Room QR Code</h1>
                </div>

                {/* Camera Component for QR Code Scanning */}
                <div className="camera-container">
                    <Camera setHotspotImage={handleCapturedImage} />
                </div>

                {errorMessage && (
                    <p className="error-message" style={{ color: "red", margin: "12px 0", textAlign: "center" }}>
                        {errorMessage}
                    </p>
                )}

                {/* Back Button */}
                <div className="button-container">
                    <div className="button-box">
                        <Link href="/">
                            <BackButton />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}