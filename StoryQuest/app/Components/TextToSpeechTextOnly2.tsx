//AutoReader fix for after you join a room, uncomment if wrong for the Join Room Functionality!
/*import React, { useEffect, useState } from "react";

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
*/

import React, { useEffect, useState } from "react";

interface TextToSpeechCompletedStoryProps {
  text: string;
  onComplete?: () => void;
}

const TextToSpeechTextOnly2: React.FC<TextToSpeechCompletedStoryProps> = ({
  text,
  onComplete,
}) => {
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [isVoiceReady, setIsVoiceReady] = useState(false);

  // Select preferred voice
  const selectVoice = () => {
    const voices = window.speechSynthesis.getVoices();
    const preferredVoices = [
      "Google UK English Male",
      "Microsoft David - English (United States)",
      "Daniel",
    ];
    return voices.find((v) => preferredVoices.includes(v.name)) || voices[0] || null;
  };

  // New: Robust voice loading with retry logic
  const initializeTTS = () => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      setTimeout(initializeTTS, 100);
      return;
    }

    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      const voice = selectVoice();
      setSelectedVoice(voice);
      setIsVoiceReady(true);
    } else {
      window.speechSynthesis.addEventListener('voiceschanged', () => {
        const voice = selectVoice();
        setSelectedVoice(voice);
        setIsVoiceReady(true);
      });
    }
  };

  useEffect(() => {
    initializeTTS();
    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  // New: Speech execution with ready checks
  useEffect(() => {
    if (!text) return;

    const speakWhenReady = () => {
      if (!window.speechSynthesis || !selectedVoice) {
        setTimeout(speakWhenReady, 100);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text.replace(/_/g, " "));
      utterance.voice = selectedVoice;
      utterance.rate = 0.9;

      utterance.onend = () => onComplete?.();
      utterance.onerror = (e) => console.warn("Speech error:", e);

      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    };

    speakWhenReady();
  }, [text, selectedVoice, onComplete]);

  return null;
};

export default TextToSpeechTextOnly2;