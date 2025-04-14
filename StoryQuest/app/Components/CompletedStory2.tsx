import React, { useEffect, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/../firebaseControls/firebaseConfig";
import TextToSpeechTextOnly2 from "@/Components/TextToSpeechTextOnly2";

interface TextToSpeechCompletedStoryProps {
  index: number;
  completedPhrases: string[];
  onComplete: () => void;
  roomId: string;
}

const CompletedStory2: React.FC<TextToSpeechCompletedStoryProps> = ({
  index,
  completedPhrases,
  onComplete,
  roomId,
}) => {
  // Expect index to be completedPhrases.length - 1 indicating that the game is done.
  const isLastPhrase = index === completedPhrases.length - 1;

  // currentIndex for individual phrase tracking.
  const [currentIndex, setCurrentIndex] = useState(0);
  // When true, we switch from individual phrase reading to full-story reading.
  const [finalRead, setFinalRead] = useState(false);

  // When the game is complete, start with the first phrase.
  useEffect(() => {
    if (isLastPhrase) {
      setCurrentIndex(0);
    }
  }, [isLastPhrase]);

  // Render nothing unless the story is complete.
  if (!isLastPhrase) return null;

  const handlePhraseComplete = async () => {
    if (!finalRead) {
      // If we haven't started reading the full story yet:
      if (currentIndex < completedPhrases.length - 1) {
        // Continue reading the next individual phrase.
        setCurrentIndex((prev) => prev + 1);
      } else {
        // All individual phrases have been read.
        // Switch to final reading mode.
        setFinalRead(true);
      }
    } else {
      // Final full-story reading is complete:
      // Update Firestore so that other players know the TTS finished.
      await updateDoc(doc(db, "games", roomId), {
        ttsDone: true,
      });
      // Optionally, add a short delay before calling onComplete.
      setTimeout(() => {
        onComplete();
      }, 1000);
    }
  };

  // Decide what text to read.
  // If in finalRead mode, join all completed phrases into one continuous string.
  const textToSpeak = finalRead
    ? completedPhrases.join(" ")
    : completedPhrases[currentIndex];

  return (
    <TextToSpeechTextOnly2
      key={finalRead ? "final" : currentIndex}
      text={textToSpeak}
      onComplete={handlePhraseComplete}
    />
  );
};

export default CompletedStory2;