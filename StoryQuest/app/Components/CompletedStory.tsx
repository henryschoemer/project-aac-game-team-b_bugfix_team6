import React, { useState, useEffect } from "react";
import TextToSpeechTextOnly from "@/Components/TextToSpeechTextOnly";

interface TextToSpeechCompletedStoryProps {
    index: number;
    completedPhrases: string[];
    onComplete: () => void; // when text to speech is done
}

{/*Button that text to speech all lines of the story*/}
const CompletedStory: React.FC<TextToSpeechCompletedStoryProps> =({index, completedPhrases, onComplete}) => {
    const isLastPhrase = index === completedPhrases.length - 1; // check story is complete
    if (!isLastPhrase) return null; // story is not complete yet

    const mapCopy = new Map<number, string>(completedPhrases.map((phrase, idx) => [idx, phrase])); // Copy phrase map

    {/* iterate through the phrase map and pass phrases to TextToSpeechAACButtons */}
    const playStory = () => {
        //console.log("Button clicked!");
        return Array.from(mapCopy.values()).map((phrase, index) => (
            <TextToSpeechTextOnly key={index} text={phrase} onComplete={index === completedPhrases.length - 1 ? onComplete : undefined}
            />
        ));
    };

    return (
        playStory()
    );

}
export default CompletedStory;