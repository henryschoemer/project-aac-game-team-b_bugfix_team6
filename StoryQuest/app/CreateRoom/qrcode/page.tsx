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
        <div className="page-container"
        style={{
            backgroundImage: "url('../../HomePage-Images/Background.jpg')",
            backgroundSize: "cover",
        }}>
            <div className="qr-code-container">
                <h1 className="title-text">Scan to Join Room</h1>
                
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