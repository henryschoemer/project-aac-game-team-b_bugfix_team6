'use client';

import React, {useEffect, useRef, useState} from 'react';
import './AnimatedTitleStyles.css'; // Import the styles

const AnimatedTitle: React.FC = () => {
    const divRef = useRef<HTMLDivElement | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isWaving, setIsWaving] = useState(false);

    const title = ['S', 't', 'o', 'r', 'y', 'Q', 'u', 'e', 's', 't'];


    useEffect(() => {
        setTimeout(() => {
            if (divRef.current) {
                setIsLoaded(true);
            }
        }, 500);

        // Trigger wave effect after initial animation
        setTimeout(() => {
            setIsWaving(true);
        }, 1500);
    }, []);

    return (
        <div
            ref={divRef}
            className={`animated-title ${isLoaded ? 'loaded' : ''} ${isWaving ? 'wave' : ''}`}
        >
            {title.map((char, index) => (
                <span key={index}><span>{char}</span></span>
            ))}
        </div>
    );
};

export default AnimatedTitle;