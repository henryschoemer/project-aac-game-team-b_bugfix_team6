"use client";

import React, {useCallback} from "react";
import "./HomePageButtonStyles.css";
import Image from "next/image";
import useSound from "use-sound";
import useTextToSpeech from "@/Components/useTextToSpeech";
import useButtonFeedback from "@/Components/ButtonClickSounds";

/*Create room Button*/
export const CreateButton: React.FC = () => {
    const {speak} = useTextToSpeech(); // useTextToSpeech hook
    const {buttonHandler} = useButtonFeedback();
    const handleClick = () => {
        buttonHandler('pop', "Create Room, Lets Create a Game!", speak);
    };

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
            <button className="button create-button" onClick={handleClick}>
            <span>Create</span>
        </button>
        </div>
    );
};

/*Join room Button*/
export const JoinButton: React.FC = () => {
    const {speak} = useTextToSpeech(); // useTextToSpeech hook
    const {buttonHandler} = useButtonFeedback();
    const handleClick = () => {
        buttonHandler('pop', "Join Room, Please scan a room QR code", speak);
    };
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
            <button className="button join-button" onClick={handleClick}>
                <span>Join</span>
            </button>
        </div>
    );
};

/*Back Button - Used on Create Room Page and join room page */
export const ExitButton: React.FC = () => {
    const {speak} = useTextToSpeech(); // useTextToSpeech hook
    const { buttonHandler, isSpeaking } = useButtonFeedback();
    const handleClick = () => {
        if (!isSpeaking)
        buttonHandler('back', "Exit", speak);
    };


    return (
        <button
            className="button back-button"
            onClick={handleClick}
        >
            <div className="svg-icon">
            <Image
                src="/back-icon.svg"
                alt="back icon"
                width={40}
                height={40}
                className="icon-spacing"
            />
            </div>
            <span>Exit</span>
        </button>
    );
};

/*Home Button - Used on Create Room Page */
export const HomeButton: React.FC = () => {
    const {speak} = useTextToSpeech(); // useTextToSpeech hook
    const {buttonHandler} = useButtonFeedback();
    const handleClick = () => {
        buttonHandler('back', "Home Menu", speak);
    };

    return (
        <button className="button home-button" onClick={handleClick}
                onMouseEnter={() => speak("Home Menu")}
        >
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
    const {speak} = useTextToSpeech(); // useTextToSpeech hook
    const {buttonHandler} = useButtonFeedback();
    const handleClick = () => {
        buttonHandler('gameplay', "Gameplay Test", speak);
    };

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
        <button className="button test-button" onClick={handleClick}
        >
            <span>Game</span>
        </button>
    </div>
    );
};
