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

                // Get speech voices
                const voices = speechSynthesis.getVoices();
                const selectedVoice = voices.find(voice => voice.name === "Google UK English Male"); // man voice

                if (!selectedVoice) {
                    console.warn("Voice not found, make sure voices are loaded.");
                    return;
                }

                // Set speech voices
                u.voice = selectedVoice;

                // Update speech rate to 0.9
                u.rate= 0.9;

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
