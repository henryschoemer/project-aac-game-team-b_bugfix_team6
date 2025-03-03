import React, { useState, useEffect } from "react";

// Text to speech phrases component
const TextToSpeechCompletedStory = ({ text }) => {
    const [utterance, setUtterance] = useState(null);

    useEffect(() => {
        if (typeof window !== "undefined" && window.speechSynthesis) {
            const synth = window.speechSynthesis;

            if (text) {
                const u = new SpeechSynthesisUtterance(text);
                setUtterance(u);

                // Play speech
                synth.speak(u);

                // Cleanup on component unmount
                return () => {
                    synth.cancel();
                };
            }
        }
    }, [text]);

    return null;
};

export default TextToSpeechCompletedStory;
