//StoryQuest/app/CompletionPage/page.tsx

"use client";

import "./CompletionPageStyling.css";
import React, {useEffect, useState} from "react";
import Image from "next/image";
import "@/CreateRoom/CreateRoomButtonStyles.css";
import useSound from "use-sound";
import Link from "next/link";
import {ExitButton} from "@/HomePage/HomePageButtons";
import { db } from "../../firebaseControls/firebaseConfig";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";

interface Player {
    playerNumber: number;
    avatar: string;
    completedPhrases: number;
}

export default function CompletionPage() {
    const [players, setPlayers] = useState<Player[]>([]);
    // Button Sound effects
    const [playCompletedStorySound] = useSound("/sounds/story-completed.mp3");

    useEffect(() => {
        playCompletedStorySound();
        fetchPlayerData();
    }, [playCompletedStorySound]);

    async function fetchPlayerData() {
        // Get room ID from URL
        const roomId = window.location.pathname.split('/')[2];
        if (!roomId) return;

        try {
            // 1. Get game data to count completed phrases per player
            const gameDoc = await getDoc(doc(db, "games", roomId));
            const gameData = gameDoc.data();
            const completedPhrases = gameData?.completedPhrases || [];

            // 2. Get all players
            const playersSnapshot = await getDocs(collection(db, "games", roomId, "players"));
            const playersData: Player[] = [];

            playersSnapshot.forEach((doc) => {
                const player = doc.data();
                // Count how many phrases this player contributed
                const playerNumber = player.playerNumber;
                const maxPlayers = gameData?.maxPlayers || 4;
                const playerPhrases = completedPhrases.filter((_, index) => index % maxPlayers === playerNumber - 1).length;

                playersData.push({
                    playerNumber: player.playerNumber,
                    avatar: player.avatar,
                    completedPhrases: playerPhrases
                });
            });

            setPlayers(playersData.sort((a, b) => b.completedPhrases - a.completedPhrases));
        } catch (error) {
            console.error("Error fetching player data:", error);
        }
    }

    return (
        <div className="page-container">
            <div className="content-container">
                <div className="align-container">
                    {/* Title */}
                    <div className="ribbon">Story Completed</div>
                    <h1 className="text-color">Great Teamwork!</h1>

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

                    {/* Team Summary */}
                    <div className="leaderboard-container">
                        <h2 className="leaderboard-title">Summary</h2>
                        <div className="players-list">
                            {players.map((player) => (
                                <div key={player.playerNumber} className="player-card">
                                    <span className="player-avatar">{player.avatar}</span>
                                    <div className="player-info">
                                        <span className="player-name">Player {player.playerNumber}</span>
                                        <span className="player-lines">
                                            {player.completedPhrases} line{player.completedPhrases !== 1 ? 's' : ''}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Exit Button */}
                    <div className="button-container">
                        <div className="home-button-container">
                            <Link href="/">
                                <ExitButton/>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}