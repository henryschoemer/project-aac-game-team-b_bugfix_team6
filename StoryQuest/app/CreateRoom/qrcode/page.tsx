//project-aac-game-team-b/StoryQuest/app/CreateRoom/qrcode/page.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { QRCode } from "react-qrcode-logo";
import { Suspense } from "react";
import "../CreateRoomButtonStyles.css";
import Image from 'next/image';

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
        <div 
            className="h-screen w-screen overflow-hidden bg-cover bg-center flex items-center justify-center p-4"
            style={{ backgroundImage: "url('../../HomePage-Images/Background.jpg')" }}
        >
            {/* Single Semi-Transparent Container */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-2 border-teal-300 p-6 w-full max-w-4xl mx-auto">
                {/* Title */}
                <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
                    Scan to Join Room
                </h1>

                {/* Steps */}
                <div className="mb-8">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-2 border-teal-300 p-6 w-full max-w-4xl mx-auto">
                    <h2 className="text-xl font-semibold text-gray-700 text-center mb-4">
                        How to join with QR code:
                    </h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        {[1, 2, 3, 4].map((step) => (
                            <div key={step} className="flex flex-col items-center">
                                <Image 
                                    src={`/diagrams/QR${step}.png`}
                                    alt={`Step ${step}`}
                                    width={120}
                                    height={120}
                                    className="rounded-lg w-[120px] h-auto"
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
                </div>

                {/* QR Code */}
                <div className="flex flex-col items-center">
                    <div className="p-3 bg-white rounded-lg shadow-inner mb-3 border-2 border-teal-300">
                        <QRCode value={joinRoomUrl} size={180} ecLevel="H" />
                    </div>
                    <p className="text-gray-700 text-center">
                        Share this QR code with friends to join the game!
                    </p>
                </div>
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