"use client";

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
                height={30} // This changes the width and hight of the svg not the button
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

export const ProfileButton: React.FC = () => {
    return (
        <button className="button profile-button">
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

/* This method will be removed when we implement the room hosting feature */
export const TemporaryTestingGameButton: React.FC = () => {
    return (
        <button className="button test-button">
            <span>Gameplay</span>
        </button>
    );
};