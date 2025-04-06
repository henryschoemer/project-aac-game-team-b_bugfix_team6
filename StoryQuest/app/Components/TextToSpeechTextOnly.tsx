import React, { useState, useEffect } from "react";

interface TextToSpeechCompletedStoryProps {
    text: string;
    onComplete?: () => void; // when text to speech is done
}


// Text to speech phrases component
const TextToSpeechTextOnly: React.FC<TextToSpeechCompletedStoryProps> = ({ text, onComplete }) => {
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

            synth.addEventListener("voiceschanged", handleVoicesChanged); // Synth Event listener
            handleVoicesChanged();

            // Cleanup on component unmount and remove event listener
            return () => {
                synth.removeEventListener("voiceschanged", handleVoicesChanged);
            };
        }
    }, []);

    // Text to speech
    useEffect(() => {
        if (typeof window !== "undefined" && window.speechSynthesis && selectedVoice) {
            const synth = window.speechSynthesis;

            if (text) {
                const u = new SpeechSynthesisUtterance(text.replace(/_/g, ' '));

                // Set the selected voice
                u.voice = selectedVoice;

                // Update speech rate to 0.9
                u.rate = 0.9;

                // onend event listener
                u.onend = () => {
                        onComplete?.(); // Trigger the callback when TTS is done
                };

                // speech error
                u.onerror = (event) => {
                    if (onComplete) {
                        onComplete(); // Trigger the callback when TTS is done
                    }
                };

                // Play speech
                synth.speak(u);

                // Cleanup on component unmount
                return () => {
                    synth.cancel();
                    setUtterance(null)
                };
            }
        }
    }, [text, selectedVoice]);

    return null;
};

export default TextToSpeechTextOnly;