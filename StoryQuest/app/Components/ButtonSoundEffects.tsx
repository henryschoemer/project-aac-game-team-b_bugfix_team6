'use client';
import React from 'react';
import useSound from 'use-sound';

const ButtonSoundEffects = () => {
    const soundUrl = '/sounds/select-sound.mp3';
    const [play]= useSound(soundUrl); // play sound


    return (
        <button onClick={() => play()}>
            Play Sound
        </button>
    );
};

export default ButtonSoundEffects;
