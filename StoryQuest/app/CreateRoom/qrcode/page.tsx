"use client";

import { useSearchParams } from "next/navigation";
import { QRCode } from "react-qrcode-logo";
import { Suspense } from "react";
import "../CreateRoomButtonStyles.css";

function QRCodeContent() {
    const searchParams = useSearchParams();
    const roomId = searchParams.get("roomId"); // Get room ID from URL
    const storyTitle = searchParams.get("storyTitle"); //Get story title from URL

    if (!roomId) {
        return <p>Error: No room ID found.</p>;
    }

    const joinRoomUrl = `https://project-aac-game-team-b--storyquest-fcdc2.us-central1.hosted.app/Gameplay/${roomId}/${storyTitle}`;
    //const joinRoomUrl = `/Gameplay/${roomId}/${storyTitle}`;

    return (
        <div className="page-container"
        style={{
            backgroundImage: "url('../../HomePage-Images/Background.jpg')",
            backgroundSize: "cover",
        }}>
            <div className="qr-code-container">
                <h1 className="title-text">Scan to Join Room</h1>
                <div className="qr-box">
                    <QRCode value={joinRoomUrl} size={256} ecLevel="H" />
                </div>
                <p className="qr-instruction">Share this QR code with friends to join the game!</p>
            </div>
        </div>
    );
}

export default function QRCodePage() {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <QRCodeContent />
        </Suspense>
    );
} 