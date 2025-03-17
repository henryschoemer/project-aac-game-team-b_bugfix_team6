'use client';
import React from 'react';
import useSound from 'use-sound';

const ButtonSoundEffects = () => {
    const soundUrl = '/sounds/select-sound';
    const [play, { loaded, error }] = useSound(soundUrl); // play sound

    if (error) {
        console.error("Sound error:", error); // error
    }

    if (!loaded) {
        return <div>Loading sound...</div>; // Show loading if sound isn't loaded
    }
    return (
        <button onClick={() => play()}>
            Play Sound
        </button>
    );
};

export default ButtonSoundEffects;
