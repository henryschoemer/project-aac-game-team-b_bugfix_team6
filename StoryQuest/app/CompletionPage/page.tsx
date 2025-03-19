import "./CompletionPageStyling.css";
import React from 'react';
import Image from "next/image";
import "@/CreateRoom/CreateRoomButtonStyles.css"

export default function Home() {
    return (
        <div className="page-container"
             style={{
                 backgroundImage: "url('HomePage-Images/Background.jpg')",
                 backgroundSize: "cover",
             }}>
            <div className="page-content-container">
                <div className="flex flex-col items-center p-4 w-full max-w-md mx-auto">
                    <div className="flex flex-col w-full mt-6 space-y-4 bg-white shadow-lg rounded-lg p-6 border border-gray-300"> {/*creates the white card background*/}

                        <div className="star-container">
                            <Image
                                src="/star-icon.svg"
                                alt="Star icon"
                                width={100}
                                height={100}
                                className="icon-spacing"
                            />
                            <Image
                                src="/star-icon.svg"
                                alt="Star icon"
                                width={100}
                                height={100}
                                className="icon-spacing"
                            />
                            <Image
                                src="/star-icon.svg"
                                alt="Star icon"
                                width={100}
                                height={100}
                                className="icon-spacing"
                            />
                        </div>

                        <div className="header-container">
                            <h1>Story Completed</h1>
                        </div>

                        <div className="header2-container">
                            <h1>Great Work!</h1>
                        </div>

                        <div>
                            <button className="story-button">Pick a new story!</button>
                        </div>

                        <div>
                            <button className="story-button">End Game</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
)
    ;
}
