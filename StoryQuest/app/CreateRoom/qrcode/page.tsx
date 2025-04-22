//project-aac-game-team-b/StoryQuest/app/CreateRoom/qrcode/page.tsx

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
    };


    return (
        <div 
            className="h-screen w-screen overflow-hidden bg-cover bg-center flex items-center justify-center p-2"
            style={{ backgroundImage: "url('../../HomePage-Images/Background.jpg')" }}
        >
            {/* Single Semi-Transparent Container */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border-4 border-teal-300 p-2 w-full max-w-6xl h-[85vh] flex flex-col overflow-hidden">
                {/* Title */}
                <h1 className="text-2xl font-bold text-gray-800 text-center" onClick={()=>handleClick("Scan to Join Room")}>
                    Scan to Join Room
                </h1>

                {/* Steps */}
                <div className="scale-75">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-2 border-teal-300 p-1" onClick={()=> handleClick("How to join with QR code:, 1. Find the picture, 2. Scan the picture, 3. Play together, 4. Enjoy")}>
                    <h2 className="text-md font-semibold text-gray-700 text-center">
                        How to join with QR code:
                    </h2>
                    <div className="flex justify-center gap-1">
                        {[1, 2, 3, 4].map((step) => (
                            <div key={step} className="flex flex-col items-center">
                                <Image 
                                    src={`/diagrams/QR${step}.png`}
                                    alt={`Step ${step}`}
                                    width={120}
                                    height={120}
                                    className="rounded-lg"
                                    priority
                                />
                                <p className="mt-1 text-md text-gray-600 text-center">
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
                <div className="flex-1 flex flex-col items-center justify-center">
                    <div className="mb-3 scale-110 p-2 bg-white rounded-xl shadow-inner border-4 border-teal-300">
                        <QRCode 
                        value={joinRoomUrl} 
                        size={220} 
                        ecLevel="H" 
                        eyeRadius={5}
                        />
                    </div>
                    <p className="text-xl text-gray-700 text-center px-4" onClick={()=>handleClick("Share this QR code with friends to join the game!")}>
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