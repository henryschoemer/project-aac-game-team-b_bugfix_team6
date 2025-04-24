// StoryQuest/app/Components/useAACSounds.ts
import { useEffect, useState } from 'react';
import useSound from 'use-sound';

const useAACSounds = () => {
  const soundBaseUrl = '/aacSounds/';
  const [isAudioUnlocked, setIsAudioUnlocked] = useState(false);
  const volumeLevel = 0.5; // use-sound expects 0-1 range

  // Dynamic sound loading
  const soundMap: Record<string, () => void> = {};
  const soundWords = [
    'apples', 'airplane', 'alien', 'astronaut', 'balloon', 'basket',
    'bear', 'bee', 'bird', 'birds', 'book', 'boy', 'butterfly',
    'car', 'cherries', 'cloud', 'comet', 'cow', 'flag', 'flowers',
    'helicopter', 'hero', 'ladybug', 'lanterns', 'monkey', 'moon',
    'mouse', 'oranges', 'planet', 'rainbow', 'robot', 'rock', 'rocket',
    'shootingStar', 'spaceCat', 'spaceDog', 'spaceDragon', 'squirrel',
    'star', 'sun', 'treasure', 'UFO', 'witch', 'wizard'
  ];

  // Initialize sounds
  soundWords.forEach(word => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [playFn] = useSound(`${soundBaseUrl}${word}.mp3`, { 
      volume: volumeLevel,
      preload: true, // Critical for iOS
      html5: true // Better for mobile
    });
    soundMap[word] = playFn;
  });

  // iOS audio unlock handler
  useEffect(() => {
    const unlockAudio = () => {
      document.body.removeEventListener('touchstart', unlockAudio);
      document.body.removeEventListener('click', unlockAudio);
      setIsAudioUnlocked(true);
      
      // Create and play silent audio
      const silentAudio = new Audio();
      silentAudio.src = 'data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU...';
      silentAudio.volume = 0;
      silentAudio.play()
        .then(() => console.log('Audio context unlocked'))
        .catch(e => console.error('Audio unlock failed:', e));
    };

    if (!isAudioUnlocked) {
      document.body.addEventListener('touchstart', unlockAudio, { once: true });
      document.body.addEventListener('click', unlockAudio, { once: true });
    }

    return () => {
      document.body.removeEventListener('touchstart', unlockAudio);
      document.body.removeEventListener('click', unlockAudio);
    };
  }, [isAudioUnlocked]);

  const playSound = (word: string) => {
    if (!isAudioUnlocked) {
      console.warn('Audio not unlocked - triggering unlock now');
      const silentAudio = new Audio();
      silentAudio.src = 'data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU...';
      silentAudio.play().catch(e => console.error('Unlock attempt failed:', e));
      return;
    }

    const playFunction = soundMap[word];
    if (playFunction) {
      try {
        playFunction();
      } catch (e) {
        console.error('useSound playback error:', e);
        // Fallback to native audio
        new Audio(`${soundBaseUrl}${word}.mp3`)
          .play()
          .catch(e => console.error('Native audio fallback failed:', e));
      }
    } else {
      console.warn(`No sound found for word: ${word}`);
    }
  };

  return { playSound };
};

export default useAACSounds;