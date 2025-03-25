'use client';

import React, {useEffect, useRef, useState} from 'react';
import './AnimatedTitleStyles.css'; // Import the styles

const AnimatedTitle: React.FC = () => {
    const divRef = useRef<HTMLDivElement | null>(null); // reference of div that contains title
    const [isLoaded, setIsLoaded] = useState(false); // if title is loaded in
    const [isWaving, setIsWaving] = useState(false); // if waving animation is triggered

    // Characters of the title "StoryQuest"
    const title = ['S', 't', 'o', 'r', 'y', 'Q', 'u', 'e', 's', 't'];

    // Delay times in ms
    const initialDelay= 500;
    const waveDelay = 1500;
    const waveEndDelay = 3650;

    useEffect(() => {

        const initialTimer =setTimeout(() => {
            if (divRef.current) {
                setIsLoaded(true); // title is loaded in
            }
        }, initialDelay);

        // Trigger wave effect after initial animation, after 1500ms
        const waveTimer = setTimeout(() => {
            setIsWaving(true); // Activate waving animation
        }, waveDelay);

        // Waves through the letters once
        const waveEndTimer =setTimeout(() => {
            setIsWaving(false); // turn off waving animation to prevent motion sickness
        }, waveEndDelay);

        // cleanup on timers to avoid memory leaks
        return () => {
            clearTimeout(initialTimer);
            clearTimeout(waveTimer);
            clearTimeout(waveEndTimer);
        };
    }, []);

    return (
        <div
            ref={divRef}
            className={`animated-title ${isLoaded ? 'loaded' : ''} ${isWaving ? 'wave' : ''}`}
        >
            {/*Map each title character in span*/}
            {title.map((char, index) => (
                <span key={index}><span>{char}</span></span>
            ))}
        </div>
    );
};

export default AnimatedTitle;