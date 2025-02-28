'use client';

import React, {useEffect, useRef, useState} from 'react';
import './AnimatedTitleStyles.css'; // Import the styles

const AnimatedTitle: React.FC = () => {
    const divRef = useRef<HTMLDivElement | null>(null); // reference of div that contains title
    const [isLoaded, setIsLoaded] = useState(false); // if title is loaded in
    const [isWaving, setIsWaving] = useState(false); // if waving animation is triggered

    // Characters of the title "StoryQuest"
    const title = ['S', 't', 'o', 'r', 'y', 'Q', 'u', 'e', 's', 't'];


    useEffect(() => {

        // Intial animation visable after 500ms
        setTimeout(() => {
            if (divRef.current) {
                setIsLoaded(true); // title is loaded in
            }
        }, 500);

        // Trigger wave effect after initial animation, after 1500ms
        setTimeout(() => {
            setIsWaving(true); // Activate waving animation
        }, 1500);
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