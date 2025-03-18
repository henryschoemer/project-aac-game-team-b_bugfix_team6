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
        <button className="button join-button" onClick={() => play()}>
            <Image
                src="/circleplus-icon.svg"
                alt="Creating a room icon"
                // This changes the width and height of the svg
                width={30}
                height={30}
                className="icon-spacing"
            />

            <span>Create</span>
        </button>
    );
};

/*Join room Button*/
export const JoinButton: React.FC = () => {
    const [play]= useSound(popClick); // use sound hook, play sound

    return (
        <button className="button create-button" onClick={() => play()}>
            <Image
                src="/game-icon.svg"
                alt="Joining a room icon"
                width={30}
                height={30}
                className="icon-spacing"
            />
            <span>Join</span>
        </button>
    );
};

/*Back Button - Used on Create Room Page */
export const BackButton: React.FC = () => {
    const [play]= useSound(backClick); // use sound hook, play sound

    return (
        <button className="button back-button" onClick={() => play()}>
            <Image
                src="/pics/backspace.svg"
                alt="Backspace icon"
                width={30}
                height={30}
                className="icon-spacing"
            />
            <span>Back</span>
        </button>
    );
};


/*Profile button*/
export const ProfileButton: React.FC = () => {
    const [play]= useSound(popClick); // use sound hook, play sound

    return (
        <button className="button profile-button" onClick={() => play()}>
            <Image
                src="/profile-icon.svg"
                alt="profile icon"
                width={30}
                height={30}
                className="icon-spacing"
            />
            <span>Profile</span>
        </button>
    );
};


/*TemporaryTestingGameButton*/
/* This method will be removed when we implement the room hosting feature */
export const TemporaryTestingGameButton: React.FC = () => {
    const gameplayStart = '/sounds/gameplay-start.mp3';
    const [playGameplayStart]= useSound(gameplayStart); // use sound hook

    return (
        <button className="button test-button" onClick={() => playGameplayStart()}>
            <span>Gameplay</span>
        </button>
    );
};