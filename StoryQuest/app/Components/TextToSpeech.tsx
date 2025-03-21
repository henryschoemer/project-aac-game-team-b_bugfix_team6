/*
import React, { useState, useEffect } from "react";

interface TextToSpeechProps {
    text: string;
}

const TextToSpeech: React.FC<TextToSpeechProps> = ({ text }) => {

    const [isPaused, setIsPaused] = useState(false);
    const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);
    

    useEffect(() => {
        const synth = window.speechSynthesis;
        const u = new SpeechSynthesisUtterance(text);

        setUtterance(u);

        return () => {
            synth.cancel();
        };
    }, [text]);

    const handlePlay = () => {
        const synth = window.speechSynthesis;

        if (isPaused) {
            synth.resume();
        }

        if (utterance) {
            synth.speak(utterance); 
        }

        setIsPaused(false);
    };

    const handlePause = () => {
        const synth = window.speechSynthesis;

        synth.pause();

        setIsPaused(true);
    };

    const handleStop = () => {
        const synth = window.speechSynthesis;

        synth.cancel();

        setIsPaused(false);
    };

    return (
        <button onClick={handlePlay} aria-label="Play phrase" className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
            Click to hear phrase! 🔊
        </button>
    );
};

export default TextToSpeech;
*/
import React, { useState, useEffect } from "react";

interface TextToSpeechProps {
    text: string;
    onSpeechEnd?: () => void; // Callback for when speech ends
}

const TextToSpeech: React.FC<TextToSpeechProps> = ({ text, onSpeechEnd }) => {
    const [isPaused, setIsPaused] = useState(false);
    const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);

    useEffect(() => {
        const synth = window.speechSynthesis;
        const u = new SpeechSynthesisUtterance(text);

        const handleEnd = () => {
            setIsPaused(false);
            onSpeechEnd?.(); // Notify parent when speech ends
        };

        const handlePause = () => {
            setIsPaused(true);
        };

        u.addEventListener("end", handleEnd);
        u.addEventListener("pause", handlePause);

        setUtterance(u);

        return () => {
            synth.cancel(); // Cancel any ongoing speech when the component unmounts or text changes
            u.removeEventListener("end", handleEnd);
            u.removeEventListener("pause", handlePause);
        };
    }, [text, onSpeechEnd]); // Recreate utterance when text changes

    const handlePlay = () => {
        const synth = window.speechSynthesis;
        if (!utterance) return;

        // Cancel any ongoing speech before starting a new one
        synth.cancel();

        if (isPaused) {
            synth.resume(); // Resume if paused
        } else {
            synth.speak(utterance); // Start speaking the current sentence
        }

        setIsPaused(false);
    };

    const handlePause = () => {
        const synth = window.speechSynthesis;
        synth.pause(); // Pause the speech
        setIsPaused(true);
    };

    const handleStop = () => {
        const synth = window.speechSynthesis;
        synth.cancel(); // Stop the speech
        setIsPaused(false);
    };

    return (
        <div className="flex gap-2 mt-4">
            <button
                onClick={handlePlay}
                aria-label={isPaused ? "Resume speech" : "Play speech"}
                className="px-4 py-2 bg-green-500 text-white rounded"
            >
                Play ⏵
            </button>

            <button
                onClick={handleStop}
                aria-label="Stop speech"
                className="px-4 py-2 bg-red-500 text-white rounded"
                disabled={!utterance} // Disable if no utterance
            >
                Stop ⏹
            </button>
        </div>
    );
};

export default TextToSpeech;