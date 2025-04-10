import useSound from "use-sound";
import {useState} from "react";

const useButtonFeedback = () => {
    const [isSpeaking, setIsSpeaking] = useState(false);
    // button sounds
    const [playCreate] = useSound('/sounds/createroom-click.mp3');
    const [playSelect] = useSound('/sounds/select-click.mp3');
    const [playBack] = useSound('/sounds/back-click.mp3');
    const [playPop] = useSound('/sounds/pop-click.mp3');
    const [playGameplay] = useSound('/sounds/gameplay-start.mp3');

    // button handler
    const buttonHandler = (
        soundType: 'create' | 'select' | 'back' | 'pop'| 'gameplay',
        text: string,
        speakFn: (text: string) => void
    ) => {

        const soundMap = {
            create: playCreate,
            select: playSelect,
            back: playBack,
            pop: playPop,
            gameplay: playGameplay
        };
        soundMap[soundType]();

        const estimatedDuration = text.length * 100;

        setTimeout(() => {
            speakFn(text); // button click text to speech
            setTimeout(() => setIsSpeaking(false), estimatedDuration);
        }, 100);
    };

    return { buttonHandler, isSpeaking };
};

export default useButtonFeedback;