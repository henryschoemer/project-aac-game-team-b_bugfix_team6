import React, { useState, useEffect } from "react";
import TextToSpeechCompletedStory from "@/Components/TextToSpeechCompletedStory";

interface TextToSpeechCompletedStoryProps {
    index: number;
    completedPhrases: string[];
}

{/*Button that text to speech all lines of the story*/}
const CompletedStoryButton: React.FC<TextToSpeechCompletedStoryProps> =({index, completedPhrases}) => {
    const isLastPhrase = index === completedPhrases.length - 1; // check story is complete
    if (!isLastPhrase) return null; // story is not complete yet

    const mapCopy = new Map<number, string>(completedPhrases.map((phrase, idx) => [idx, phrase])); // Copy phrase map

    {/* iterate through the phrase map and pass phrases to TextToSpeech */}
    const playStory = () => {
        //console.log("Button clicked!");
        return Array.from(mapCopy.values()).map((phrase, index) => (
            <TextToSpeechCompletedStory key={index} text={phrase} />
        ));
    };

    // Currently there are bugs with clicking the button on the gameplay screen
    // Text to speech of the whole story is completely functional
    return (

        <div>
            {playStory()}
        </div>

    );

}
export default CompletedStoryButton;