//StoryQuest/app/Components/TextToSpeechAACButtons.tsx
import React, { useState, useEffect, useRef } from "react";

interface TextToSpeechProps {
    text: string;
    onSpeechEnd?: () => void;
}

const TextToSpeechAACButtons: React.FC<TextToSpeechProps> = ({ text, onSpeechEnd }) => {
    const [isSupported, setIsSupported] = useState<boolean | null>(null);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const synthRef = useRef<typeof window.speechSynthesis | null>(null);
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

    useEffect(() => {
        // Check support and initialize
        const checkSupport = () => {
            if (!('speechSynthesis' in window)) {
                setIsSupported(false);
                return false;
            }
            
            synthRef.current = window.speechSynthesis;
            
            // iOS requires voices to be loaded first
            const loadVoices = () => {
                if (synthRef.current?.getVoices().length) {
                    setIsSupported(true);
                } else {
                    // Some browsers need this event
                    synthRef.current?.addEventListener('voiceschanged', () => {
                        setIsSupported(!!synthRef.current?.getVoices().length);
                    }, { once: true });
                }
            };
            
            loadVoices();
            return true;
        };

        const supported = checkSupport();
        if (!supported) return;

        return () => {
            synthRef.current?.cancel();
            if (utteranceRef.current) {
                utteranceRef.current.onend = null;
                utteranceRef.current.onerror = null;
            }
        };
    }, []);

    const handlePlay = (e: React.TouchEvent | React.MouseEvent) => {
        e.preventDefault();
        if (!synthRef.current || !isSupported) return;

        // iOS requires fresh utterance each time
        const utterance = new SpeechSynthesisUtterance(text);
        utteranceRef.current = utterance;

        // Configure voice (iOS specific)
        if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
            const voices = synthRef.current.getVoices();
            const preferredVoice = voices.find(v => v.lang.includes('en')) || voices[0];
            if (preferredVoice) utterance.voice = preferredVoice;
            
            utterance.rate = 0.9; // Slightly slower for clarity
            utterance.pitch = 1.1; // Slightly higher pitch
        }

        // Event handlers
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => {
            setIsSpeaking(false);
            onSpeechEnd?.();
        };
        utterance.onerror = (e) => {
            console.error('Speech error:', e);
            setIsSpeaking(false);
            
            // iOS specific fallback
            if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
                alert('Please enable speech in Safari settings:\nSettings > Safari > Advanced > Web Speech');
            }
        };

        try {
            synthRef.current.cancel(); // Stop any current speech
            synthRef.current.speak(utterance);
        } catch (error) {
            console.error('Speech synthesis failed:', error);
            setIsSpeaking(false);
        }
    };

    const handleStop = () => {
        synthRef.current?.cancel();
        setIsSpeaking(false);
    };

    if (isSupported === false) {
        return (
            <div className="text-red-500 text-sm p-2">
                Text-to-speech not supported on this device
            </div>
        );
    }

    // Show loading state while checking support
    if (isSupported === null) {
        return (
            <div className="text-gray-500 text-sm p-2">
                Loading speech engine...
            </div>
        );
    }

    return (
        <div className="flex gap-2 mt-1">
            <button
                onTouchStart={handlePlay}
                onClick={handlePlay}
                disabled={!text}
                aria-label={isSpeaking ? "Replay speech" : "Play speech"}
                className={`px-4 py-2 text-white rounded transition-colors ${
                    !text ? 'bg-gray-400 cursor-not-allowed' : 
                    isSpeaking ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'
                }`}
            >
                {isSpeaking ? 'Replay ↻' : 'Play ⏵'}
            </button>
            
            <button
                onClick={handleStop}
                onTouchStart={(e) => {
                    e.preventDefault();
                    handleStop();
                }}
                disabled={!isSpeaking}
                aria-label="Stop speech"
                className={`px-4 py-2 text-white rounded transition-colors ${
                    !isSpeaking ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'
                }`}
            >
                Stop ⏹
            </button>
        </div>
    );
};

export default TextToSpeechAACButtons;