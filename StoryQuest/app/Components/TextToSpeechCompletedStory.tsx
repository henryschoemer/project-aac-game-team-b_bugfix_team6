import React, { useState, useEffect } from "react";

interface TextToSpeechCompletedStoryProps {
    text: string;
}

// Text to speech phrases component
const TextToSpeechCompletedStory: React.FC<TextToSpeechCompletedStoryProps> = ({ text }) => {
    const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);
    const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);

    // Select voice
    function selectVoice() {
        const voices = speechSynthesis.getVoices();

        // List of voices
        const voiceNames = [
            "Google UK English Male",  // Chrome
            "Microsoft David - English (United States)",  // Edge, Windows
            "Daniel",  // macOS
        ];

        return voices.find(voice => voiceNames.includes(voice.name)) || null; // if voices in list are not available it just uses the default voice on the device.
    }

    // Loads in voices
    useEffect(() => {
        if (typeof window !== "undefined" && window.speechSynthesis) {
            const synth = window.speechSynthesis;

            const handleVoicesChanged = () => {
                const voice = selectVoice(); // Selects a voice
                setSelectedVoice(voice); // Save voice
            };

            synth.onvoiceschanged = handleVoicesChanged; // Event listener for synth
            handleVoicesChanged();

            // Cleanup on component unmount and remove event listener
            return () => {
                synth.onvoiceschanged = null;
            };
        }
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined" && window.speechSynthesis && selectedVoice) {
            const synth = window.speechSynthesis;

            if (text && selectedVoice) {
                const u = new SpeechSynthesisUtterance(text);
                setUtterance(u);

                // Set the selected voice
                u.voice = selectedVoice;

                // Update speech rate to 0.9
                u.rate = 0.9;

                // Play speech
                synth.speak(u);

                // Cleanup on component unmount
                return () => {
                    synth.cancel();
                };
            }
        }
    }, [text, selectedVoice]);

    return null;
};

export default TextToSpeechCompletedStory;