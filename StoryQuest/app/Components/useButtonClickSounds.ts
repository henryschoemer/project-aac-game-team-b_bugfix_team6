import useSound from "use-sound";
import {useState} from "react";

// Hook for interface button clicks and text to speech
// Uses mp3 for the click sound
// Allows for text to speech on passed text
// Hook for interface button clicks and text to speech
const useButtonFeedback = () => {
    const [isSpeaking, setIsSpeaking] = useState(false);
    // button sounds
    const [playCreate] = useSound('/sounds/createroom-click.mp3');
    const [playSelect] = useSound('/sounds/select-click.mp3');
    const [playBack] = useSound('/sounds/back-click.mp3');
    const [playPop] = useSound('/sounds/pop-click.mp3');
    const [playGameplay] = useSound('/sounds/gameplay-start.mp3');

    // button handler with improved timing
    const buttonHandler = (
        soundType: 'create' | 'select' | 'back' | 'pop'| 'gameplay', // Button mp3 sounds
        text: string, // passed text
        speakFn: (text: string) => void // speak hook that was passed
    ) => {
        // Flag to track speaking state
        setIsSpeaking(true);
        
        const soundMap = {
            create: playCreate,
            select: playSelect,
            back: playBack,
            pop: playPop,
            gameplay: playGameplay
        };
        
        // Play the button sound
        soundMap[soundType]();
        
        // Give more time for the sound to finish before starting speech
        // This is crucial for Android devices that often can't handle overlapping audio contexts
        setTimeout(() => {
            speakFn(text); // Speak the button text
            
            // Estimate when speech will finish - add more time for mobile devices
            const minDuration = 500; // minimum duration in ms
            const estimatedDuration = Math.max(minDuration, text.length * 120);
            
            setTimeout(() => {
                setIsSpeaking(false);
            }, estimatedDuration);
        }, 350); // Longer delay before speech starts
    };

    return { buttonHandler, isSpeaking };
};

export default useButtonFeedback;