"use client";

import React, { useState } from "react";
import Link from "next/link";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseControls/firebaseConfig";
import "../CreateRoom/CreateRoomButtonStyles.css";
import { BackButton } from "../HomePage/HomePageButtons";
import TextToSpeechTextOnly from "@/Components/TextToSpeechTextOnly";
import useSound from "use-sound";
import Camera from "../Components/Camera"; // ✅ Correct import
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
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            const imageDataObj = ctx.getImageData(0, 0, canvas.width, canvas.height);

            try {
                const code = jsQR(imageDataObj.data, imageDataObj.width, imageDataObj.height);
                if (code) {
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
            // This will go into firebase and try to find the room id 
            const roomRef = doc(db, "rooms", scannedRoomId);
            const roomDoc = await getDoc(roomRef);

            if (roomDoc.exists()) {
                playJoinRoomClick();
                alert(`Room Joined: ${scannedRoomId}`);
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
