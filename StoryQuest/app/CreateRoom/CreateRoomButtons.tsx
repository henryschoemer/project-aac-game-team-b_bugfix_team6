"use client";
import React from "react";
import "./CreateRoomButtonStyles";
import Image from "next/image";

export const TheGardenAdventureButton: React.FC = () => {
    return (
        <button className= "button the-garden-adventure-button">
            <Image
                src="/circleplus-icon.svg"
                alt="Creating a room icon"
                width={30}
                height={30} // This changes the width and hight of the svg not the button
                className="icon-spacing"
            />
            <span>The Garden Adventure</span>
        </button>
    );
};