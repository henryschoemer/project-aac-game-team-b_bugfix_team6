"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "../../../firebaseControls/firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";


interface RoomData {
    story: string;
    numPlayers: number;
    difficulty: string;
}

export default function GameplayPage() {
    const params = useParams();
    const roomId = Array.isArray(params.roomId) ? params.roomId[0] : params.roomId;
    const [roomData, setRoomData] = useState<RoomData | null>(null);
    useEffect(() => {
        if (!roomId) return;

        const roomRef = doc(db, "rooms", roomId);

        // Listen for real-time updates
        const unsubscribe = onSnapshot(roomRef, (snapshot) => {
            if (snapshot.exists()) {
                setRoomData(snapshot.data() as RoomData);
            } else {
                setRoomData(null);
            }
        });

        return () => unsubscribe();
    }, [roomId]);

    if (!roomData) return <p>Loading room...</p>;

    return (
        <div>
            <h1>Gameplay for Room {roomId}</h1>
            <p>Story: {roomData.story}</p>
            <p>Players: {roomData.numPlayers}</p>
            <p>Difficulty: {roomData.difficulty}</p>
        </div>
    );
}