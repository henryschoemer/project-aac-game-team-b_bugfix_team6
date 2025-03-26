"use client";

import { useSearchParams } from "next/navigation";
import { QRCode } from "react-qrcode-logo";
import { Suspense } from "react";
import "../CreateRoomButtonStyles.css";

function QRCodeContent() {
    const searchParams = useSearchParams();
    const roomId = searchParams.get("roomId"); // Get room ID from URL

    if (!roomId) {
        return <p>Error: No room ID found.</p>;
    }

    const joinRoomUrl = `/Gameplay/${roomId}`;

    return (
        <div className="qr-code-page">
            <h1>Scan to Join Room</h1>
            <QRCode value={joinRoomUrl} size={256} ecLevel="H" />
            <p>Share this QR code with friends to join the game!</p>
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