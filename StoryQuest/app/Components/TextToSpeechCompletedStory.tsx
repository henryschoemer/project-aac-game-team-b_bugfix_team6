import React, { useState, useEffect } from "react";

// text to speech phrase
const TextToSpeechCompletedStory = ({ text }) => {
    const [utterance, setUtterance] = useState(null);

    useEffect(() => {
        const synth = window.speechSynthesis;
        const u = new SpeechSynthesisUtterance(text);
        setUtterance(u);

        // play speech
        synth.speak(u);

        return () => {
            synth.cancel();
        };
    }, [text]);

    return null;
};

export default TextToSpeechCompletedStory;
