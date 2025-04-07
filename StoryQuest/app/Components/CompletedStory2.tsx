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
  const isLastPhrase = index === completedPhrases.length - 1;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (isLastPhrase) {
      setCurrentIndex(0); // Start from the beginning when phrase is "The End!"
    }
  }, [isLastPhrase]);

  // Only run once the story is completed
  if (!isLastPhrase) return null;

  const handlePhraseComplete = async () => {


    if (currentIndex < completedPhrases.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      onComplete(); // All phrases spoken
    }

    await updateDoc(doc(db, "games", roomId), {
        ttsDone: true
      });
  };

  return (
    <TextToSpeechTextOnly2
      key={currentIndex}
      text={completedPhrases[currentIndex]}
      onComplete={handlePhraseComplete}
    />
  );
};

export default CompletedStory2;