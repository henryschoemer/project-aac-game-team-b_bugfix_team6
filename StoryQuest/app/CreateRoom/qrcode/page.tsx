//project-aac-game-team-b/StoryQuest/app/CreateRoom/qrcode/page.tsx
//this one should be good but everyhting is a little small tbh

"use client";

import { useSearchParams } from "next/navigation";
import { QRCode } from "react-qrcode-logo";
import { Suspense } from "react";
import "../CreateRoomButtonStyles.css";
import Image from 'next/image';
import useQuickTextToSpeech from "@/Components/useQuickTextToSpeech";
import useButtonFeedback from "@/Components/useButtonClickSounds";

function QRCodeContent() {
    const searchParams = useSearchParams();
    const roomId = searchParams.get("roomId"); // Get room ID from URL
    const storyTitle = searchParams.get("storyTitle"); //Get story title from URL

    if (!roomId) {
        return <p>Error: No room ID found.</p>;
    }

    const joinRoomUrl = `https://project-aac-game-team-b--storyquest-fcdc2.us-central1.hosted.app/Gameplay/${roomId}/${storyTitle}`;
    //const joinRoomUrl = `/Gameplay/${roomId}/${storyTitle}`;


    const {speak} = useQuickTextToSpeech(); // useTextToSpeech hook
    const { buttonHandler, isSpeaking } = useButtonFeedback();

    const handleClick = (text:string) => {
        buttonHandler('none', text, speak);
        console.log("click");
    };


    return (
        <div 
            className="h-[100dvh] w-[100dvw] overflow-hidden bg-cover bg-center flex flex-col items-center justify-between p-4"
            style={{ backgroundImage: "url('../../HomePage-Images/Background.jpg')" }}
        >
            {/* Single Semi-Transparent Container */}
            <div className="scale-90 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-2 border-teal-300 p-6 w-full max-w-4xl mx-auto">
                {/* Title */}
                <h1 className="text-3xl font-bold text-gray-800 text-center" onClick={()=>handleClick("Scan to Join Room")}>
                    Scan to Join Room
                </h1>

                {/* Steps */}
                <div className="">
                  <div className="scale-90 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-2 border-teal-300 p-1 w-full max-w-4xl mx-auto" onClick={()=> handleClick("How to join with QR code:, 1. Find the picture, 2. Scan the picture, 3. Play together, 4. Enjoy")}>
                    <h2 className="text-xl font-semibold text-gray-700 text-center mb-4">
                        How to join with QR code:
                    </h2>
                    <div className="scale-105 flex flex-wrap justify-center gap-4">
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
                <div className="mt-8 scale-125 flex flex-col items-center">
                    <div className="scale-115 p-3 bg-white rounded-lg shadow-inner mb-3 border-2 border-teal-300 ">
                        <QRCode value={joinRoomUrl} size={180} ecLevel="H" />
                    </div>
                    <p className="text-gray-700 text-center mb-2" onClick={()=>handleClick("Share this QR code with friends to join the game!")}>
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