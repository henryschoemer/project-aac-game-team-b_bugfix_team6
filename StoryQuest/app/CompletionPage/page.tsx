"use client";

import "./CompletionPageStyling.css";
import React, {useEffect, useState} from "react";
import Image from "next/image";
import "@/CreateRoom/CreateRoomButtonStyles.css";
import useSound from "use-sound";
import Link from "next/link";
import {ExitButton} from "@/HomePage/HomePageButtons";
import useTextToSpeech from "@/Components/useTextToSpeech";
import useButtonFeedback from "@/Components/useButtonClickSounds";
import useQuickTextToSpeech from "@/Components/useQuickTextToSpeech";

export default function CompletionPage() {
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedStory, setSelectedStory] = useState<string | null>(null);
    const [difficultyLevel, setDifficultyLevel] = useState<string | null>(null);

    // Button Sound effects
    const completedStorySound = "/sounds/story-completed.mp3";
    const [playCompletedStorySound] = useSound(completedStorySound);
    const [tooltip, setTooltip] = useState<string | null>(null);
    const {speak} = useQuickTextToSpeech(); // useTextToSpeech hook
    const { buttonHandler, isSpeaking } = useButtonFeedback();

    // Show story options
    const [showStoryOptions, setShowStoryOptions] = useState(false);

    const handleStoryClick = (story: string) => {
        setSelectedStory(story);
        setCurrentStep(2);
        buttonHandler('select', story, speak)
    };

    const handleDifficultyClick = (level: string) => { //NEED TO USE THIS ON GAMEPLAY TO SELECT STORIES 1,2,OR 3
        setDifficultyLevel(level);
        setCurrentStep(3);
        buttonHandler('select', level+" mode", speak)
    };

    // Using the same room session, so number of players does not need to be updated
    const handleSetNewStory = () => {
        buttonHandler('select',"Start Adventure!", speak);
        console.log("Room updated with new story:", {selectedStory});
        // Here you would add your room story update logic
    };

    const goBack = (text:string) => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
        buttonHandler('back', text, speak);
    };

    const handlePlayAgain = (text:string) => {
        buttonHandler('select', text, speak);
    };

    // play song
    useEffect(() => {
        playCompletedStorySound();
    }, [playCompletedStorySound]);

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
                            <h1 className="text-color"> Great Teamwork! </h1>

                            {/* Stars */}
                            <div className="star-container">
                                <div className="svg-icon">
                                <Image
                                    src="/star-icon.svg"
                                    alt="Star icon"
                                    width={110}
                                    height={110}
                                    className="icon-spacing"
                                />
                                </div>
                                <div className="svg-icon">
                                <Image
                                    src="/star-icon.svg"
                                    alt="Star icon"
                                    width={150}
                                    height={150}
                                    className="icon-spacing"
                                />
                                </div>
                                <div className="svg-icon">
                                <Image
                                    src="/star-icon.svg"
                                    alt="Star icon"
                                    width={110}
                                    height={110}
                                    className="icon-spacing"
                                />
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="button-container">
                                <button
                                    className="button setup-room-button"
                                    onClick={() => {
                                        handlePlayAgain('play again');
                                        setShowStoryOptions(true)
                                    }}
                                >
                                    <div className="svg-icon">
                                    <Image
                                        src="/play-icon.svg"
                                        alt="Play icon"
                                        width={40}
                                        height={40}
                                        className="icon-spacing"
                                    />
                                    </div>
                                    <span>Play Again</span>
                                </button>

                                <div className="home-button-container">
                                    <Link href="/">
                                        <ExitButton/>
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
                                        }}
                                    >
                                        <img
                                            src="/images/Forest-background.png"
                                            alt="Forest"
                                            className="button-icon"
                                        />
                                        <span>Walk in the Forest</span>
                                    </button>

                                    <button
                                        className="big-button story-button"
                                        onClick={() => {
                                            handleStoryClick("Space Adventure");
                                        }}
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

                        {/* Step 2: Difficulty Selection */}
                        {currentStep === 2 && (
                            <div className="step-container">
                                <h2>Pick How Challenging</h2>
                                <div className="big-button-container">
                                    <button
                                        className="big-button difficulty-button easy"
                                        onClick={() => {
                                            handleDifficultyClick("Easy");
                                        }}
                                        onMouseEnter={() => {
                                            setTooltip("Easy mode: 3 sentences")
                                        }}
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
                                        }}
                                        onMouseEnter={() => {
                                            setTooltip("Medium mode: 5 sentences")
                                        }}
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
                                        }}
                                        onMouseEnter={() => {
                                            setTooltip("Hard mode: 10 sentences")
                                        }}
                                        onMouseLeave={() => setTooltip(null)}
                                        onTouchStart={() => setTooltip("Hard mode: 10 sentences")}
                                    >
                                        <span>Hard</span>
                                        {tooltip === "Hard mode: 10 sentences" && <span className="tooltip">{tooltip}</span>}
                                    </button>
                                </div>
                                <button className="back-step-button" onClick={() => {
                                    goBack("Go Back");
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
                                            <p>Players: {4}</p>
                                        </div>
                                        <div className="summary-item">
                                            <p>Level: {difficultyLevel}</p>
                                        </div>
                                    </div>
                                    <div className="final-buttons">
                                        <button className="big-button create-room-button" onClick={() => {
                                            handleSetNewStory();
                                        }}
                                        >
                                            <span className="create-emoji">🎮</span>
                                            <span>Start Adventure!</span>
                                        </button>
                                        <button className="back-step-button" onClick={() => {
                                            goBack("Change Something");
                                        }}
                                        >
                                            Change Something
                                        </button>
                                    </div>
                                </div>
                            )}

                        {/* Exit/Home Button - Always visible */}
                        {(currentStep !== 1 && currentStep !== 3) || !showStoryOptions ? null : (
                            <div className="home-button-container align-container">
                                <Link href="/">
                                    <ExitButton/>
                                </Link>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )};