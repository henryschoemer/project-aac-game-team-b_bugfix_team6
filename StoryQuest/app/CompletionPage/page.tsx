"use client";

import "./CompletionPageStyling.css";
import React, { useState } from "react";
import Image from "next/image";
import "@/CreateRoom/CreateRoomButtonStyles.css";
import useSound from "use-sound";
import Link from "next/link";
import { HomeButton } from "@/HomePage/HomePageButtons";

export default function Home() {
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedStory, setSelectedStory] = useState<string | null>(null);
    const [difficultyLevel, setDifficultyLevel] = useState<string | null>(null);

    // Button Sound effects
    const createRoomClick = "/sounds/createroom-click.mp3";
    const [playCreateRoomClick] = useSound(createRoomClick); // use sound hook
    const selectOptionClick = "/sounds/select-click.mp3";
    const [playSelectOptionClick] = useSound(selectOptionClick); // use sound hook
    const goBackClick = "/sounds/back-click.mp3";
    const [playGoBackClick] = useSound(goBackClick);

    // Show story options
    const [showStoryOptions, setShowStoryOptions] = useState(false);

    const handleStoryClick = (story: string) => {
        setSelectedStory(story);
        setCurrentStep(2);
    };

    const handleDifficultyClick = (level: string) => {
        setDifficultyLevel(level);
        setCurrentStep(3);
    };

    // Using the same room session, so number of players does not need to be updated
    const handleSetNewStory = () => {
        console.log("Room updated with new story:", { selectedStory });
        // Here you would add your room story update logic
    };

    const goBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    let numPlayers = 2; // hardcoded example, update this to fetch data from room session backend

    return (
        <div
            className="page-container"
        >
            <div className="content-container">
                <div className="align-container">
                    {/* Using same room session: Select story -> Select difficulty -> Play button -> game automatically starts */}
                    {/* If backend cannot be implemented, just remove and keep home page button */}
                </div>
                {!showStoryOptions && (
                    <>
                        <div className="align-container">
                        {/* Title */}
                        <div className="ribbon">Story Completed</div>
                        <h1 className="text-color">😁 Great Teamwork! 😎</h1>

                        {/* Stars */}
                        <div className="star-container">
                            <Image
                                src="/star-icon.svg"
                                alt="Star icon"
                                width={110}
                                height={110}
                                className="icon-spacing"
                            />
                            <Image
                                src="/star-icon.svg"
                                alt="Star icon"
                                width={150}
                                height={150}
                                className="icon-spacing"
                            />
                            <Image
                                src="/star-icon.svg"
                                alt="Star icon"
                                width={110}
                                height={110}
                                className="icon-spacing"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="button-container">
                            <button
                                className="button setup-room-button"
                                onClick={() => setShowStoryOptions(true)}
                            >
                                <Image
                                    src="/play-icon.svg"
                                    alt="Play icon"
                                    width={30}
                                    height={30}
                                    className="icon-spacing"
                                />
                                <span>Play Again</span>
                            </button>

                            <div className="home-button-container">
                                <Link href="/">
                                    <HomeButton />
                                </Link>
                            </div>
                        </div>
                        </div>
                    </>
                )}

                {showStoryOptions && (
                    <>
                        {/* Progress Indicators - Visual cues for children */}
                        <div className="progress-container">
                            {[1, 2, 3].map((step) => (
                                <div
                                    key={step}
                                    className={`progress-bubble ${
                                        currentStep >= step ? "active" : ""
                                    }`}
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

                        {/* Step 2: Difficulty Selection */}
                        {currentStep === 2 && (
                            <div className="step-container">
                                <h2>Pick How Challenging</h2>
                                <div className="big-button-container">
                                    <button
                                        className="big-button difficulty-button easy"
                                        onClick={() => {
                                            handleDifficultyClick("Easy");
                                            playSelectOptionClick();
                                        }}
                                    >
                                        <span>Easy</span>
                                    </button>

                                    <button
                                        className="big-button difficulty-button medium"
                                        onClick={() => {
                                            handleDifficultyClick("Medium");
                                            playSelectOptionClick();
                                        }}
                                    >
                                        <span>Medium</span>
                                    </button>

                                    <button
                                        className="big-button difficulty-button hard"
                                        onClick={() => {
                                            handleDifficultyClick("Hard");
                                            playSelectOptionClick();
                                        }}
                                    >
                                        <span>Hard</span>
                                    </button>
                                </div>
                                <button
                                    className="back-step-button"
                                    onClick={() => {
                                        playGoBackClick();
                                        goBack();
                                    }}
                                >
                                    Go Back
                                </button>
                            </div>
                        )}

                        {/* Step 3: Review and Create */}
                        {currentStep === 3 && (
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
                                    <button
                                        className="big-button create-room-button"
                                        onClick={() => {
                                            handleSetNewStory();
                                            playCreateRoomClick();
                                        }}
                                    >
                                        <span className="create-emoji">🎮</span>
                                        <span>Start Adventure!</span>
                                    </button>
                                    <button
                                        className="back-step-button"
                                        onClick={() => {
                                            playGoBackClick();
                                            goBack();
                                        }}
                                    >
                                        Change Something
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Home Button - Always visible */}
                        {(currentStep !== 1 && currentStep !== 3) || !showStoryOptions ? null : (
                            <div className="home-button-container align-container">
                                <Link href="/">
                                    <HomeButton />
                                </Link>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}