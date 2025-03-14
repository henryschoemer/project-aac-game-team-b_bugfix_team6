'use client';

import React, {useState} from 'react';
import "./MusicSliderStyling.css";
export const HomePageBackgroundMusic: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(50); // volume range

    const handlePlayMusic = () => {
        const audio = document.getElementById("HomePageBackgroundMusic") as HTMLAudioElement;
        if (audio) {
            audio.play().catch(error => {
                console.log("Error with autoplay:", error);
            });
            setIsPlaying(true);
        }
    };

    const handleStopMusic = () =>{
        const audio = document.getElementById("HomePageBackgroundMusic") as HTMLAudioElement;
        if (audio) {
            audio.pause();
            audio.currentTime = 0; // Resets playback to the start
            setIsPlaying(false);
        }
    }

    const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = Number(event.target.value);
        setVolume(newVolume);

        const audio = document.getElementById("HomePageBackgroundMusic") as HTMLAudioElement;
        if (audio) {
            audio.volume = newVolume / 100;
        }
    };

    return (
        <div>
            {isPlaying ? (
                <button onClick={handleStopMusic}>Stop Music</button>
            ) : (
                <button onClick={handlePlayMusic}>Play Music</button>
            )}

            <div>
            <input type="range" min="0" max="100" value={volume} onChange={handleVolumeChange} />
            </div>

            <audio id="HomePageBackgroundMusic" loop>
                <source src="/sounds/StoryQuestHomePageMusic.mp3" type="audio/mp3"/>
                Your browser does not support the audio element.
            </audio>

        </div>
    );
}