"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { BackButton } from "../HomePage/HomePageButtons";
import { db } from "../../firebaseControls/firebaseConfig"; // Import Firestore
import { collection, addDoc } from "firebase/firestore";
import { QRCode } from "react-qrcode-logo";
import "./CreateRoomButtonStyles.css";
import useSound from "use-sound";

export default function CreateRoomPage() {
    // Button Sound effects
    const createRoomClick = '/sounds/createroom-click.mp3';
    const [playCreateRoomClick] = useSound(createRoomClick); // use sound hook
    const selectOptionClick = '/sounds/select-click.mp3';
    const [playSelectOptionClick] = useSound(selectOptionClick); // use sound hook
    const goBackClick = '/sounds/back-click.mp3';
    const [playGoBackClick] = useSound(goBackClick);

    // Story Option Selection
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedStory, setSelectedStory] = useState<string | null>(null);
    const [numPlayers, setNumPlayers] = useState<number | null>(null);
    const [difficultyLevel, setDifficultyLevel] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [roomId, setRoomId] = useState<string | null>(null);
    const [tooltip, setTooltip] = useState<string | null>(null);


    const router = useRouter();

    const handleStoryClick = (story: string) => {
        setSelectedStory(story);
        setCurrentStep(2);
    };

    const handlePlayerClick = (num: number) => {
        setNumPlayers(num);
        setCurrentStep(3);
    };

    const handleDifficultyClick = (level: string) => {
        setDifficultyLevel(level);
        setCurrentStep(4);
    };

    const handleCreateRoom = async () => {
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
            alert(`Room Created! Room ID: ${docRef.id}`);
            router.push(`/CreateRoom/qrcode?roomId=${docRef.id}&storyTitle=${encodeURIComponent(selectedStory ?? "")}`);
        } catch (error) {
            console.error("Error creating room:", error);
            alert("Failed to create room.");
        } finally {
            setLoading(false);
        }
    };

    const goBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

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
                                    playSelectOptionClick();
                                }}
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
                                    playSelectOptionClick();
                                }}
                            >
                                <img
                                    src="/images/Forest-background.png"
                                    alt="Forest"
                                    className="button-icon"
                                />
                                <span>Walk in the Forest</span>
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
                                        playSelectOptionClick();
                                    }}
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
                            playGoBackClick();
                            goBack();
                        }}>
                            Go Back
                        </button>
                    </div>
                )}

                {/* Step 3: Difficulty Selection */}
                {currentStep === 3 && (
                    <div className="step-container">
                        <h2>Pick How Challenging</h2>
                        <div className="big-button-container">
                            <button
                                className="big-button difficulty-button easy"
                                onClick={() => {
                                    handleDifficultyClick("Easy");
                                    playSelectOptionClick();
                                }}
                                onMouseEnter={() => setTooltip("Easy mode: 3 sentences")}
                                onMouseLeave={() => setTooltip(null)}
                                onTouchStart={() => setTooltip("Easy mode: 3 sentences")}
                            >
                                <span>Easy</span>
                                {tooltip === "Easy mode: 3 sentences" && <span className="tooltip">{tooltip}</span>}
                            </button>

                            <button
                                className="big-button difficulty-button medium"
                                onClick={() => {
                                    handleDifficultyClick("Medium");
                                    playSelectOptionClick();
                                }}
                                onMouseEnter={() => setTooltip("Medium mode: 5 sentences")}
                                onMouseLeave={() => setTooltip(null)}
                                onTouchStart={() => setTooltip("Medium mode: 5 sentences")}
                            >
                                <span>Medium</span>
                                {tooltip === "Medium mode: 5 sentences" && <span className="tooltip">{tooltip}</span>}
                            </button>
                            <button
                                className="big-button difficulty-button hard"
                                onClick={() => {
                                    handleDifficultyClick("Hard");
                                    playSelectOptionClick();
                                }}
                                onMouseEnter={() => setTooltip("Hard mode: 10 sentences")}
                                onMouseLeave={() => setTooltip(null)}
                                onTouchStart={() => setTooltip("Hard mode: 10 sentences")}
                            >
                                <span>Hard</span>
                                {tooltip === "Hard mode: 10 sentences" && <span className="tooltip">{tooltip}</span>}
                            </button>
                        </div>
                        <button className="back-step-button" onClick={() => {
                            playGoBackClick();
                            goBack();
                        }}>
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
                                playCreateRoomClick();
                            }}>
                                <span className="create-emoji">🎮</span>
                                <span>Start Adventure!</span>
                            </button>
                            <button className="back-step-button" onClick={() => {
                                playGoBackClick();
                                goBack();
                            }}>
                                Change Something
                            </button>
                        </div>
                    </div>
                )}

                {/* Home Button - Always visible */}
                {(currentStep !== 1 && currentStep !== 4) ? null : (
                    <div className="home-button-container button-box">
                        <Link href="/">
                            <BackButton />
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}