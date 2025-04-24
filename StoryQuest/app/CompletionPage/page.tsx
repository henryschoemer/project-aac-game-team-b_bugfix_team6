//StoryQuest/app/CompletionPage/page.tsx

"use client";

import "./CompletionPageStyling.css";
import React, {useEffect, useState} from "react";
import Image from "next/image";
import "@/CreateRoom/CreateRoomButtonStyles.css";
import useSound from "use-sound";
import Link from "next/link";
import {ExitButton} from "@/HomePage/HomePageButtons";

export default function CompletionPage() {
    // Button Sound effects
    const completedStorySound = "/sounds/story-completed.mp3";
    const [playCompletedStorySound] = useSound(completedStorySound);

    // play song
    useEffect(() => {
        playCompletedStorySound();
    }, [playCompletedStorySound]);

    return (
        <div className="page-container">
            <div className="content-container">
                <div className="align-container">
                </div>
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
};