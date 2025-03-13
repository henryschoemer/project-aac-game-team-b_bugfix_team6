'use client';

import React, {useState} from 'react';

export const HomePageBackgroundMusic: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlayMusic = () => {
        const audio = document.getElementById("HomePageBackgroundMusic") as HTMLAudioElement;
        if (audio) {
            audio.play().catch(error => {
                console.log("Error with autoplay:", error);
            });
            setIsPlaying(true);
        }
    };

    return (
        <div>
            {!isPlaying && (
            <button onClick={handlePlayMusic}>Play Music</button>
            )}
            <audio id="HomePageBackgroundMusic" loop>
                <source src="/sounds/StoryQuestHomePageMusic.mp3" type="audio/mp3"/>
                Your browser does not support the audio element.
            </audio>
        </div>
    );
}