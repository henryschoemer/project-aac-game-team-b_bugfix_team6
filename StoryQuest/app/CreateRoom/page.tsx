"use client";

import React, { useState, useEffect } from "react";
import Link from 'next/link';
import { BackButton } from "../HomePage/HomePageButtons";
import "./CreateRoomButtonStyles.css";
import AutomaticTextToSpeech from "@/Components/AutomaticTextToSpeech";


export default function CreateRoomPage() {
    const [selectedStory, setSelectedStory] = useState<string | null>(null);
    const [numPlayers, setNumPlayers] = useState<number | null>(null);
    const [difficultyLevel, setDifficultyLevel] = useState<string | null>(null);

    {/*Handles case where user does not choose all settings*/}
    const handleCreateRoom = () => {
        if (!selectedStory || !numPlayers || !difficultyLevel) {
            alert("Please select a story, player count, and difficulty.");
            return;
        }
        console.log("Room Created:", { selectedStory, numPlayers, difficultyLevel });
    };

    const handleStoryClick = (story: string) => {
        console.log("Clicked:", story);
        setSelectedStory((prev) => (prev === story ? null : story)); 
    };

    return (
        <div className="page-container"
             style={{
                 backgroundImage: "url('/HomePage-Images/Background.jpg')",
                 backgroundSize: "cover",
             }}>

            {/*Create room page description text to speech*/}
            {<AutomaticTextToSpeech speechText="Please Select a story, Select number of players, Select difficulty, then click on create room" />}

            <div className="content-container"> 
            <div className="title-container">
                <h1 className="title-text">Create a Room</h1>
            </div>

            {/* Story Selection */}
            <div className="selection-container">
                <h2>Select a Story</h2>
                <div className="button-container">
                    <button 
                        className={`button story-button ${selectedStory === "The Garden Adventure" ? "selected" : ""}`}
                        onClick={() => handleStoryClick("The Garden Adventure")}>
                        <span>The Garden Adventure</span>
                    </button>
                                    <button className={`button story-button ${selectedStory === "Walk in the Forest" ? "selected" : ""}`}
                            onClick={() => setSelectedStory("Walk in the Forest")}>
                        <span>Walk in the Forest</span>
                    </button>
                </div>
            </div>

            {/* Player Count Selection */}
            <div className="selection-container">
                <h2>Select Number of Players</h2>
                <div className="button-container">
                    {[2, 3, 4].map((num) => (
                        <button key={num} className={`button player-button ${numPlayers === num ? "selected" : ""}`}
                                onClick={() => setNumPlayers(num)}>
                            <span>{num} Players</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Difficulty Selection */}
            <div className="selection-container">
                <h2>Select Difficulty</h2>
                <div className="button-container">
                    {["Easy", "Medium", "Hard"].map((level) => (
                        <button key={level} className={`button difficulty-button ${difficultyLevel === level ? "selected" : ""}`}
                                onClick={() => setDifficultyLevel(level)}>
                            <span>{level}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Create Room Button */}
            <div className="button-container">
                <button className="button create-room-button" onClick={handleCreateRoom}>
                    <span>Create Room</span>
                </button>
            </div>

            {/* Back Button */}
            <div className="button-container">
                <div className="button-box">
                <Link href= "/">
                    <BackButton />
                </Link>
                </div>
            </div>
        </div>
    </div>
    );
};
