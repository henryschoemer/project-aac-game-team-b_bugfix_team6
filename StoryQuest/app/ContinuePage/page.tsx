"use client";

import "../CompletionPage/CompletionPageStyling.css";
import React, {useState} from "react";
import Image from "next/image";
import "@/CreateRoom/CreateRoomButtonStyles.css";
import useSound from "use-sound";
import CompletionPage from "../CompletionPage/page.tsx"; // Import CompletionPage

export default function Home() {
    const popClick = '/sounds/pop-click.mp3';
    const [play] = useSound(popClick); // use sound hook, play sound
    const [storyCompletedSelected, setStoryCompletedSelected] = useState(false);

    return (
        /* this pops up after the completed text to speech is done after about 1 sec delay*/
        <div className="page-container">
            {!storyCompletedSelected && (
                <>
                    <div className="content-container align-container">
                        <h1 className="text-color">Are you completed with the story?</h1>
                        <button
                            className="button setup-room-button"
                            onClick={() => setStoryCompletedSelected(true)}
                        >
                            <Image
                                src="/arrow-icon.svg"
                                alt="Continue icon"
                                width={30}
                                height={30}
                                className="icon-spacing"
                            />
                            <span>Continue</span>
                        </button>
                    </div>
                </>
            )}
            {storyCompletedSelected && (
                <div className="overlay">
                    <CompletionPage/>
                </div>
            )}
        </div>
    );
}