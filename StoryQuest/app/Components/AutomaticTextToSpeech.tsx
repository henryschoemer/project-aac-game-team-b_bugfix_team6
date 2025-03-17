import React, { useState, useEffect } from "react";
import TextToSpeechCompletedStory from "@/Components/TextToSpeechCompletedStory";

interface TextProps {
    speechText: string;
}

// Text to Speech on text without a button click, mainly used for descriptions
const AutomaticTextToSpeech: React.FC<TextProps> =({speechText}) => {
    return <TextToSpeechCompletedStory text={speechText} />
};

export default AutomaticTextToSpeech;