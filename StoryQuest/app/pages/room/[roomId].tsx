import { useState, useEffect } from "react";
import { db } from "../../../firebaseControls/firebaseConfig"; // Import Firestore config
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";

// Define the expected room data structure
type RoomData = {
    story: string;
    numPlayers: number;
    difficulty: string;
};

export default function RoomPage() {
    const router = useRouter();
    const { roomId } = router.query;
    
    // Set state to hold the room data
    const [room, setRoom] = useState<RoomData | null>(null);

    useEffect(() => {
        console.log("Router Query:", router.query);
        if (!roomId) return; // Ensure roomId is available before fetching

        const fetchRoom = async () => {
            const roomRef = doc(db, "rooms", roomId as string);
            const roomSnap = await getDoc(roomRef);

            if (roomSnap.exists()) {
                setRoom(roomSnap.data() as RoomData); 
            } else {
                console.error("Room not found");
            }
        };

        fetchRoom();
    }, [roomId]);

    return (
        <div>
            {room ? (
                <>
                    <h1>Room: {roomId}</h1>
                    <p>Story: {room.story}</p>
                    <p>Players: {room.numPlayers}</p>
                    <p>Difficulty: {room.difficulty}</p>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}