import React, {useState, useEffect, useRef} from "react";

// Text to speech phrases hook, used for button or quick sounds
const useTextToSpeech = () => {
    const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
    const currentUtterance = useRef<SpeechSynthesisUtterance | null>(null);
    const [isExternalSpeaking, setIsExternalSpeaking] = useState(false); // if the texttospeechphrases compoent is speaking


    // Select voice
    const selectVoice = () => {
        if (typeof window === "undefined" || !window.speechSynthesis) return null;

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
                stop(); // Clean up any ongoing speech
            };
        }
    }, []);

    // Text to speech
    const speak = (text: string ) => {
        if (typeof window === "undefined" || !window.speechSynthesis || !selectedVoice || isExternalSpeaking) return;

        stop();

        const u = new SpeechSynthesisUtterance(text.replace(/_/g, " ")); // Create utterance
        u.voice = selectedVoice; // Set the selected voice
        u.rate = 1; // Update speech rate to 1
        currentUtterance.current = u;

        u.onstart = () => {
            console.log("tts started:", text);
        };

        // onend event listener
        u.onend = () => {
            console.log("tts completed:", text);
            currentUtterance.current = null;
        };

        u.onerror=()=>{
            console.log("tts error:", text);
        }

        window.speechSynthesis.speak(u); // Play speech
    };

    const stop = () => {
        if (typeof window !== "undefined" && window.speechSynthesis) {
            window.speechSynthesis.cancel();
            currentUtterance.current = null;
        }
    };


    return { speak, stop , setExternalSpeaking: setIsExternalSpeaking}; // return the speak function, used as a hook
};

export default useTextToSpeech;