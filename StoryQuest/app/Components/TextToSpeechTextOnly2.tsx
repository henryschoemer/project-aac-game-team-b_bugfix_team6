import React, { useEffect, useState } from "react";

interface TextToSpeechCompletedStoryProps {
  text: string;
  onComplete?: () => void; // Callback when TTS ends
}

const TextToSpeechTextOnly2: React.FC<TextToSpeechCompletedStoryProps> = ({
  text,
  onComplete,
}) => {
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [isVoiceReady, setIsVoiceReady] = useState(false);

  // Select preferred voice
  const selectVoice = () => {
    const voices = speechSynthesis.getVoices();
    const preferredVoices = [
      "Google UK English Male",
      "Microsoft David - English (United States)",
      "Daniel",
    ];
    return voices.find((v) => preferredVoices.includes(v.name)) || voices[0] || null;
  };

  // Wait for voices to load
  useEffect(() => {
    const synth = window.speechSynthesis;
    

    const loadVoices = () => {
      const voice = selectVoice();
      if (voice) {
        setSelectedVoice(voice);
        setIsVoiceReady(true);
      }
    };

    // If voices are already available
    if (synth.getVoices().length > 0) {
      loadVoices();
    } else {
      // Wait for voices to be loaded asynchronously
      synth.addEventListener("voiceschanged", loadVoices);
    }

    return () => {
      synth.removeEventListener("voiceschanged", loadVoices);
    };
  }, []);

  // Trigger speech when text or selectedVoice changes
  useEffect(() => {
    if (!text || !selectedVoice || !isVoiceReady) return;

    const utterance = new SpeechSynthesisUtterance(text.replace(/_/g, " "));
    utterance.voice = selectedVoice;
    utterance.rate = 0.9;

    utterance.onend = () => {
      onComplete?.();
    };

    utterance.onerror = (e) => {
      console.warn("Speech synthesis error:", e);
    };

    window.speechSynthesis.cancel(); // cancel ongoing first
    window.speechSynthesis.speak(utterance);

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [text, selectedVoice, isVoiceReady, onComplete]);

  return null;
};

export default TextToSpeechTextOnly2;
