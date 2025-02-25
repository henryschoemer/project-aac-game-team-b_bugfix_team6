import React from "react";
import "./HomePageButtonStyles.css";
import Image from "next/image";


export const CreateButton: React.FC = () => {
    return (
        <button className="button join-button">
            <Image
                src="/circleplus-icon.svg"
                alt="Creating a room icon"
                width={30}
                height={30}
                className="icon-spacing"
            />
            <span>Create</span>
        </button>
    );
};

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
