"use client";

import React from "react";
import "./HomePageButtonStyles.css";
import Image from "next/image";
import useSound from "use-sound";
import useTextToSpeech from "@/Components/useTextToSpeech";
import useButtonFeedback from "@/Components/useButtonClickSounds";

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
        buttonHandler('pop', "Please follow the pictures on the screen, and scan the QR code using the camera", speak);
    };
    return (
        <div className="button-with-attached-circle">
            <div className="button-circle">
                <div className="svg-icon">
                <Image
                    src="/Join-Room2.svg"
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

interface ExitButtonProps {
  asLink?: boolean;
  href?: string;
  className?: string;
}

/*Back Button - Used on Create Room Page and join room page */export const ExitButton: React.FC<ExitButtonProps> = ({ asLink = false, href, className = '' }) => {
    const { speak } = useTextToSpeech();
    const { buttonHandler, isSpeaking } = useButtonFeedback();
    
    const handleClick = (text: string) => {
        buttonHandler('back', text, speak);
        if (asLink && href) {
            window.location.href = href; // Programmatic navigation
        }
    };

    // const handleOnMouseEnter = (text: string) => {
    //     if (!isSpeaking) {
    //         speak(text);
    //     }
    // };

    return (
        <button
            className={`button back-button ${className}`}
            onClick={() => handleClick("Exit")}
            onMouseEnter={() => handleOnMouseEnter("Exit")}
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


/*TemporaryTestingGameButton*/
/* This method will be removed when the room hosting feature is fully functional*/
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
