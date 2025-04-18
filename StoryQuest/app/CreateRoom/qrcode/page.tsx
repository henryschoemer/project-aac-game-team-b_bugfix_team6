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
        <div className="page-container h-screen w-screen overflow-hidden bg-cover bg-no-repeat"
        style={{
            backgroundImage: "url('../../HomePage-Images/Background.jpg')",
            backgroundSize: "cover",
        }}>
            <div className="qr-code-container h-full w-full flex flex-col items-center justify-center p-4">
                <h1 className="title-text text-3xl md:text-4xl font-bold text-white mb-6">Scan to Join Room</h1>
                
                <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-teal-300 max-w-4xl w-full mb-8">
                        <h2>How to join with QR code:</h2>
                        
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