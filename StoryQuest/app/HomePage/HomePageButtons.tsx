"use client";

import React from "react";
import "./HomePageButtonStyles.css";
import Image from "next/image";

/*Create room Button*/
export const CreateButton: React.FC = () => {
    return (
        <button className="button join-button">
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
    return (
        <button className="button create-button">
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
    return (
        <button className="button back-button">
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


/*TemporaryTestingGameButton*/
/* This method will be removed when we implement the room hosting feature */
export const TemporaryTestingGameButton: React.FC = () => {
    return (
        <button className="button test-button">
            <span>Gameplay</span>
        </button>
    );
};



/* This method will be removed soon test */
export const CompletionTestButton: React.FC = () => {
    return (
        <button className="button test-button">
            <span>Completion TEst</span>
        </button>
    );
};