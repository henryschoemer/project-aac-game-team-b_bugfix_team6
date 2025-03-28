"use client";

import React from "react";
import { useEffect, useState } from "react";
import "./HomePageButtonStyles.css";
import Image from "next/image";
import useSound from "use-sound";

const popClick = '/sounds/pop-click.mp3';
const backClick = '/sounds/back-click.mp3';


/*Create room Button*/
export const CreateButton: React.FC = () => {
    const [play]= useSound(popClick); // use sound hook, play sound, has to be inside component

    return (
        <div className="button-with-attached-circle">
            <div className="button-circle">
                <div className="svg-icon">
                <Image
                src="/plus-icon.svg"
                alt="Creating a room icon"
                // This changes the width and height of the svg
                width={60}
                height={60}
            />
            </div>
            </div>
            <button className="button create-button" onClick={() => play()}>
            <span>Create</span>
        </button>
        </div>
    );
};

/*Join room Button*/
export const JoinButton: React.FC = () => {
    const [play]= useSound(popClick); // use sound hook, play sound

    return (
        <div className="button-with-attached-circle">
            <div className="button-circle">
                <div className="svg-icon">
                <Image
                    src="/qr-icon.svg"
                    alt="qr join icon"
                    width={60}
                    height={55}
                />
            </div>
            </div>
            <button className="button join-button" onClick={() => play()}>
                <span>Join</span>
            </button>
        </div>
    );
};

/*Back Button - Used on Create Room Page and join room page */
export const BackButton: React.FC = () => {
    const [play]= useSound(backClick); // use sound hook, play sound

    return (
        <button className="button back-button" onClick={() => play()}>
            <div className="svg-icon">
            <Image
                src="/back-icon.svg"
                alt="back icon"
                width={40}
                height={40}
                className="icon-spacing"
            />
            </div>
            <span>Back</span>
        </button>
    );
};

/*Home Button - Used on Create Room Page */
export const HomeButton: React.FC = () => {
    const [play]= useSound(backClick); // use sound hook, play sound

    return (
        <button className="button home-button" onClick={() => play()}>
            <div className="svg-icon">
            <Image
                src="/home-icon.svg"
                alt="Home page icon"
                width={50}
                height={50}
                className="icon-spacing"
            />
            </div>
            <span>Home</span>
        </button>
    );
};


/*TemporaryTestingGameButton*/
/* This method will be removed when we implement the room hosting feature */
export const TemporaryTestingGameButton: React.FC = () => {
    const gameplayStart = '/sounds/gameplay-start.mp3';
    const [playGameplayStart]= useSound(gameplayStart); // use sound hook

    return (
        <div className="button-with-attached-circle">
            <div className="button-circle">
                <div className="svg-icon">
                <Image
                    src="/test.svg"
                    alt="gameplay test icon"
                    width={50}
                    height={50}
                />
                </div>
            </div>
        <button className="button test-button" onClick={() => playGameplayStart()}>
            <span>Game</span>
        </button>
    </div>
    );
};
