"use client";

import React, { useState } from "react";
import Link from 'next/link';
import "../CreateRoom/CreateRoomButtonStyles.css";
import { BackButton } from "../HomePage/HomePageButtons";
import AutomaticTextToSpeech from "@/Components/AutomaticTextToSpeech";
import useSound from "use-sound";

export default function JoinRoomPage() {
    const [roomId, setRoomId] = useState("");

    const confirmClick = '/sounds/confirm-click.mp3';
    const [playConfirmClick]= useSound(confirmClick); // use sound hook

    const handleJoinRoom = () => {
        if (!roomId) {
            alert("Please enter a room ID.");
            return;
        }
        alert("Room Joined.");
    };

    return (

        <div className="page-container"
             style={{
                 backgroundImage: "url('/HomePage-Images/Background.jpg')",
                 backgroundSize: "cover",
             }}>

            {/*join room page Description text to speech*/}
            {<AutomaticTextToSpeech speechText="Please Enter a room ID, then click on join room" />}

            <div className="content-container"> 
            <div className="title-container">
                <h1 className="title-text">Enter a Room ID</h1>
            </div>

            {/* Room ID Input Field */}
            <input
                type="text"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                placeholder="Enter Room ID"
                className="room-id-input"
            />

            {/* Join Room Button */}
            <div className="button-container">
                <button className="button create-room-button" onClick={() =>{
                    handleJoinRoom();
                    playConfirmClick();
                }}>
                    <span>Join Room</span>
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