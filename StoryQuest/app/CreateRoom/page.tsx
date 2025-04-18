//project-aac-game-team-b/StoryQuest/app/CreateRoom/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { ExitButton } from "../HomePage/HomePageButtons";
import { db } from "../../firebaseControls/firebaseConfig"; // Import Firestore
import { collection, addDoc } from "firebase/firestore";
import { QRCode } from "react-qrcode-logo";
import "./CreateRoomButtonStyles.css";
import useSound from "use-sound";
import useTextToSpeech from "@/Components/useTextToSpeech";
import useButtonFeedback from "@/Components/useButtonClickSounds";

export default function CreateRoomPage() {
    // Story Option Selection
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedStory, setSelectedStory] = useState<string | null>(null);
    const [numPlayers, setNumPlayers] = useState<number | null>(null);
    const [difficultyLevel, setDifficultyLevel] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [roomId, setRoomId] = useState<string | null>(null);
    const [tooltip, setTooltip] = useState<string | null>(null);
    const {speak} = useTextToSpeech(); // useTextToSpeech hook
    const { buttonHandler, isSpeaking } = useButtonFeedback();

    const router = useRouter();

    const handleStoryClick = (story: string) => {
        setSelectedStory(story);
        setCurrentStep(2);
        buttonHandler('select', story, speak)
    };

    const handlePlayerClick = (num: number) => {
        setNumPlayers(num);
        setCurrentStep(3);
        buttonHandler('select', num+" players", speak)
    };

    const handleDifficultyClick = (level: string) => { //NEED TO USE THIS ON GAMEPLAY TO SELECT STORIES 1,2,OR 3
        setDifficultyLevel(level);
        setCurrentStep(4);
        buttonHandler('select', level+" mode", speak)
    };

    const handleCreateRoom = async () => {
        buttonHandler('select',"Start Adventure!", speak);
        setLoading(true);
        try {
            // Add room data to Firestore
            const docRef = await addDoc(collection(db, "rooms"), {
                story: selectedStory,
                numPlayers: numPlayers,
                difficulty: difficultyLevel,
            });

            //setRoomId(docRef.id); // Store room ID
            console.log("Room Created with ID:", docRef.id);
            setRoomId(docRef.id);
            buttonHandler('create', "Room Created", speak);
            alert(`Room Created! Room ID: ${docRef.id}`);
            router.push(`/CreateRoom/qrcode?roomId=${docRef.id}&storyTitle=${encodeURIComponent(selectedStory ?? "")}`);
        } catch (error) {
            console.error("Error creating room:", error);
            alert("Failed to create room.");
        } finally {
            setLoading(false);
        }
    };

    const goBack = (text:string) => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
        buttonHandler('back', text, speak);
    };

    const handleOnMouseEnter =(text:string)=>{
        if(!isSpeaking) // to avoid button click audio cutoff
            speak(text);
    }

    return (
        <div className="page-container"
            style={{
                backgroundImage: "url('/HomePage-Images/Background.jpg')",
                backgroundSize: "cover",
            }}>

            {/*create room page Description text to speech*/}
            {/*<AutomaticTextToSpeech speechText="Please select story options" />*/}
            <div className="content-container">
                <div className="title-container">
                    <h1 className="title-text">Let's Create a Game!</h1>
                </div>

                {/* Progress Indicators - Visual cues for children */}
                <div className="progress-container">
                    {[1, 2, 3, 4].map((step) => (
                        <div
                            key={step}
                            className={`progress-bubble ${currentStep >= step ? "active" : ""}`}
                        >
                            {step}
                        </div>
                    ))}
                </div>

                {/* Step 1: Story Selection */}
                {currentStep === 1 && (
                    <div className="step-container">
                        <h2>Choose Your Story</h2>
                        <div className="big-button-container">
                            <button
                                className="big-button story-button"
                                onClick={() => {
                                    handleStoryClick("The Garden Adventure");
                                }}
                                onMouseEnter={() => handleOnMouseEnter("The Garden Adventure")}
                            >
                                <img
                                    src="/images/garden-background.webp"
                                    alt="Garden"
                                    className="button-icon"
                                />
                                <span>The Garden Adventure</span>
                            </button>


                            <button
                                className="big-button story-button"
                                onClick={() => {
                                    handleStoryClick("Walk in the Forest");
                                }}
                                onMouseEnter={() => handleOnMouseEnter("Walk in the Forest")}
                            >
                                <img
                                    src="/images/forest-background.jpg"
                                    alt="Forest"
                                    className="button-icon"
                                />
                                <span>Walk in the Forest</span>
                            </button>


                            <button
                                className="big-button story-button"
                                onClick={() => {
                                    handleStoryClick("Under the sea");
                                }}
                                onMouseEnter={() => handleOnMouseEnter("Under the sea")}
                            >
                                <img
                                    src="/images/ocean-background.png"
                                    alt="Forest"
                                    className="button-icon"
                                />
                                <span>Under the sea</span>
                            </button>

                            <button
                                className="big-button story-button"
                                onClick={() => {
                                    handleStoryClick("Space Adventure");
                                }}
                                onMouseEnter={() => handleOnMouseEnter("Space Adventure")}
                            >
                                <img
                                    src="/images/space-background.svg"
                                    alt="space"
                                    className="button-icon"
                                />
                                <span>Space Adventure</span>
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 2: Player Count Selection */}
                {currentStep === 2 && (
                    <div className="step-container">
                        <h2>How Many Friends Are Playing?</h2>
                        <div className="big-button-container">
                            {[2, 3, 4].map((num) => (
                                <button
                                    key={num}
                                    className="big-button player-button"
                                    onClick={() => {
                                        handlePlayerClick(num);
                                    }}
                                    onMouseEnter={()=> handleOnMouseEnter(num+" Players")}
                                >
                                    <div className="player-icons">
                                        {[...Array(num)].map((_, index) => (
                                            <span key={index} className="player-icon">😊</span>
                                        ))}
                                    </div>
                                    <span>{num} Players</span>
                                </button>
                            ))}
                        </div>
                        <button className="back-step-button" onClick={() => {
                            goBack("Go Back");
                        }}
                                onMouseEnter={()=> handleOnMouseEnter("Go Back")
                                }
                        >
                            Go Back
                        </button>
                    </div>
                )}

                {/* Step 3: Difficulty Selection */}
                {currentStep === 3 && (
                    <div className="step-container">
                        <h2>Pick game difficulty</h2>
                        <div className="big-button-container">
                            <button
                                className="big-button difficulty-button easy"
                                onClick={() => {
                                    handleDifficultyClick("Easy");
                                }}
                                onMouseEnter={() => {
                                    setTooltip("Easy mode: 4 sentences")
                                    handleOnMouseEnter("Easy mode: 4 sentences")
                                }}
                                onMouseLeave={() => setTooltip(null)}
                                onTouchStart={() => setTooltip("Easy mode: 4 sentences")}
                            >
                                <span>Easy</span>
                                {tooltip === "Easy mode: 4 sentences" && <span className="tooltip">{tooltip}</span>}
                            </button>

                            <button
                                className="big-button difficulty-button medium"
                                onClick={() => {
                                    handleDifficultyClick("Medium");
                                }}
                                onMouseEnter={() => {
                                    setTooltip("Medium mode: 8 sentences")
                                    handleOnMouseEnter("Medium mode: 8 sentences")
                                }}
                                onMouseLeave={() => setTooltip(null)}
                                onTouchStart={() => setTooltip("Medium mode: 8 sentences")}
                            >
                                <span>Medium</span>
                                {tooltip === "Medium mode: 8 sentences" && <span className="tooltip">{tooltip}</span>}
                            </button>
                            <button
                                className="big-button difficulty-button hard"
                                onClick={() => {
                                    handleDifficultyClick("Hard");
                                }}
                                onMouseEnter={() => {
                                    setTooltip("Hard mode: 12 sentences")
                                    handleOnMouseEnter("Hard mode: 12 sentences")
                                }}
                                onMouseLeave={() => setTooltip(null)}
                                onTouchStart={() => setTooltip("Hard mode: 12 sentences")}
                            >
                                <span>Hard</span>
                                {tooltip === "Hard mode: 12 sentences" && <span className="tooltip">{tooltip}</span>}
                            </button>
                        </div>
                        <button className="back-step-button" onClick={() => {
                            goBack("Go Back");
                        }}
                                onMouseEnter={()=> handleOnMouseEnter("Go Back")}
                        >
                            Go Back
                        </button>
                    </div>
                )}

                {/* Step 4: Review and Create */}
                {currentStep === 4 && (
                    <div className="step-container">
                        <h2>Ready to Play!</h2>
                        <div className="summary-container">
                            <div className="summary-item">
                                <p>Story: {selectedStory}</p>
                            </div>
                            <div className="summary-item">
                                <p>Players: {numPlayers}</p>
                            </div>
                            <div className="summary-item">
                                <p>Level: {difficultyLevel}</p>
                            </div>
                        </div>
                        <div className="final-buttons">
                            <button className="big-button create-room-button" onClick={() => {
                                handleCreateRoom();
                            }}
                                   onMouseEnter={()=> handleOnMouseEnter("Start Adventure!")}
                            >
                                <span className="create-emoji">🎮</span>
                                <span>Start Adventure!</span>
                            </button>
                            <button className="back-step-button" onClick={() => {
                                goBack("Change Something");
                            }}
                                    onMouseEnter={()=> handleOnMouseEnter("Change Something")}
                            >
                                Change Something
                            </button>
                        </div>
                    </div>
                )}

                {/* Home Button - Always visible */}
                {(currentStep !== 1 && currentStep !== 4) ? null : (
                    <div className="home-button-container button-box">
                        <Link href="/">
                            <ExitButton />
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}