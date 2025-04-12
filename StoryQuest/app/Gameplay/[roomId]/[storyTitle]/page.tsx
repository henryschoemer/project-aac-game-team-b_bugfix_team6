"use client";

import React, { useState, useEffect, useCallback } from "react";
import stories, { Story, StorySection } from "../../stories";//import the stories interface
import { useParams } from "next/navigation";//To retrieve story based on room settings
import AACKeyboard from "../../../Components/AACKeyboard";
import useSound from 'use-sound';
import TextToSpeechAACButtons from "../../../Components/TextToSpeechAACButtons";
import CompletedStory2 from "@/Components/CompletedStory2";
import {motion, AnimatePresence} from "framer-motion";
import {SpinEffect,PulseEffect,FadeEffect,SideToSideEffect, UpAndDownEffect,ScaleUpEffect,BounceEffect,FlipEffect, SlideAcrossEffect} from "../../../Components/animationUtils";
import CompletionPage from "../../../CompletionPage/page";
import TextToSpeechTextOnly2 from "@/Components/TextToSpeechTextOnly2";
import useAACSounds from '@/Components/useAACSounds';
import { db } from "../../../../firebaseControls/firebaseConfig";
import { doc, getDoc, setDoc, updateDoc, onSnapshot } from "firebase/firestore"; // to update the firestore database with game data

// SparkleEffect: A visual effect that simulates a sparkle animation.
const SparkleEffect = ({ onComplete }: { onComplete: () => void }) => {
  return (
    <motion.div
      className="absolute w-20 h-20 bg-white rounded-full"
      style={{ filter: "blur(4px)", opacity: 0.7 }}
      initial={{ scale: 0, opacity: 1 }}
      animate={{ scale: [0, 1.5, 0], opacity: [1, 0.8, 0] }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      onAnimationComplete={onComplete} // Calls the provided function when the animation finishes.
    />
  );
};

// getImageAnimation: Returns a reusable animation configuration for images.
const getImageAnimation = () => ({
  initial: { opacity: 0, scale: 0.5 }, // Start with a small, transparent image.
  animate: { opacity: 1, scale: 1 },   // Animate to full size and opacity.
  exit: { opacity: 0, scale: 0.5 },      // Animate out by shrinking and fading.
  transition: { duration: 0.8, ease: "easeOut" }, // Smooth animation with a standard easing.
});

export default function Home() {
  const [currentStory, setCurrentStory] = useState<Story | null>(null);
  const { playSound } = useAACSounds(); // aac mp3 sound hook
  const [phrase, setPhrase] = useState("");
  const [userInput, setUserInput] = useState("");
  const [addedImage, setAddedImage] = useState<string | null>(null);
  const [images, setImages] = useState<{ src: string; alt: string; x: number; y: number }[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [completedPhrases, setCompletedPhrases] = useState<string[]>([]);
  const [completedImages, setCompletedImages] = useState<{ src: string; alt: string; x: number; y: number }[]>([]);
  const [currentImage, setCurrentImage] = useState<{ src: string; alt: string; x: number; y: number } | null>(null);
  const [currentTurn, setCurrentTurn] = useState<number>(1);
  const [playerNumber, setPlayerNumber] = useState<number | null>(null);
  const [lastPlayedWord, setLastPlayedWord] = useState<string | null>(null);
  const [ttsReady, setTtsReady] = useState(false);
  const [showSparkles, setShowSparkles] = useState<boolean[]>([]);
  const [storyCompleted, setStoryCompleted] = useState(false); // Used as a check for the story completion overlay
  const [showOverlay, setShowOverlay] = useState(false); // Is shown after storycompleted = true, with a delay
    const soundUrl = '/sounds/aac_audios.mp3';
  const [play] = useSound(soundUrl, {
    sprite: {
        basket: [0, 650],
        bear: [2400, 450],
        bee: [4400, 280],
        bird: [6330, 420],
        boy: [8390, 390],
        butterfly: [10400, 700],
        ladybug: [12800, 700],
        lanterns: [15100, 600],
        mouse: [17300, 550],
        squirrel: [19400, 650],
        }
    });

//Grabbing roomID and story title from URL
//roomID stores in firestore
//story chosen from create room becomes default story
const params = useParams();
console.log("Params:", params); // Debugging

const roomId = params.roomId as string;
const storyTitleURL = params.storyTitle as string | undefined;
const storyTitle = storyTitleURL ? decodeURIComponent(storyTitleURL) : null;

//This is the snapshot used to retrieve game state in firestore
useEffect(() => {
  if (!roomId) return;

  const gameRef = doc(db, "games", roomId);

  const unsubscribe = onSnapshot(gameRef, (snapshot) => {
    if (snapshot.exists()) {
      const gameData = snapshot.data();
      console.log("Firestore data received:", gameData);

      setCurrentSectionIndex(gameData.currentSectionIndex);
      setPhrase(gameData.currentPhrase);
      setCompletedPhrases(gameData.completedPhrases || []);
      setCompletedImages(gameData.completedImages || []);
      setCurrentTurn(gameData.currentTurn || 1);
      setStoryCompleted(gameData.gameStatus === "completed");

      if (gameData.gameStatus === "completed" && gameData.ttsDone) {
        setTimeout(() => {
          setShowOverlay(true);
        }, 3000);
      }

      const lastWord = gameData.lastWordSelected?.word;
      if (lastWord && lastWord !== lastPlayedWord) {
        play({ id: lastWord });
        setLastPlayedWord(lastWord);
      }
    }
  });

  return () => unsubscribe();
}, [roomId, play, lastPlayedWord]);

  //Finding story name in URL
  /*useEffect(() => {

    console.log("Story Title from URL:", storyTitle);
    if (!storyTitle) return; // Prevent errors if no title is in the URL
  
    setIsMounted(true);
  
    if (stories.length > 0) {
      const selectedStory = stories.find((s) => s.title === storyTitle);
  
      if (selectedStory) {
        setCurrentStory(selectedStory);
        setPhrase(selectedStory.sections[0].phrase);
      } else {
        setCurrentStory(stories[0]); // Default to first story if not found
        setPhrase(stories[0].sections[0].phrase);
      }
    }
  }, [storyTitle]);*/

  useEffect(() => {
    if (!storyTitle || stories.length === 0) return;
  
    const selectedStory = stories.find((s) => s.title === storyTitle);
    const storyToUse = selectedStory || stories[0];
  
    setCurrentStory(storyToUse);
    setPhrase(storyToUse.sections[0].phrase);
    setIsMounted(true);
  }, [storyTitle, stories]);

  useEffect(() => {
    if (!roomId || !currentStory) return;
  
    const assignPlayer = async () => {
      const gameRef = doc(db, "games", roomId);
      const docSnap = await getDoc(gameRef);
  
      if (docSnap.exists()) {
        const data = docSnap.data();
        const myId = sessionStorage.getItem("player-uid") || crypto.randomUUID();
        sessionStorage.setItem("player-uid", myId);
  
        if (data.player1Id === myId) {
          setPlayerNumber(1);
        } else if (data.player2Id === myId) {
          setPlayerNumber(2);
        } else if (!data.player1Id) {
          await updateDoc(gameRef, { player1Id: myId });
          setPlayerNumber(1);
        } else if (!data.player2Id) {
          await updateDoc(gameRef, { player2Id: myId });
          setPlayerNumber(2);
        } else {
          alert("Room is full!");
        }
      } else {
        // Game doesn't exist, create new game with player1
        const myId = crypto.randomUUID();
        sessionStorage.setItem("player-uid", myId);
  
        await setDoc(gameRef, {
          player1Id: myId,
          currentTurn: 1,
          completedPhrases: [],
          completedImages: [],
          currentSectionIndex: 0,
          currentPhrase: currentStory.sections[0].phrase,
          lastUpdated: new Date(),
          gameStatus: "in_progress",
        });
  
        setPlayerNumber(1);
      }
    };
  
    assignPlayer();
  }, [roomId, currentStory]);


  /*useEffect(() => {
    setIsMounted(true);
    if (stories.length > 0) {
      setCurrentStory(stories[0]);
      setPhrase(stories[0].sections[0].phrase);
    }
  }, []);*/

  const handleStart = () => {
    speechSynthesis.getVoices(); // Prime voice loading
    setTtsReady(true);
  };

  const handleStoryChange = (story: Story) => {
    setCurrentStory(story);
    setPhrase(story.sections[0].phrase);
    setCurrentSectionIndex(0);
    setImages([]);
    setCompletedPhrases([]);
    setCompletedImages([]);
    setCurrentImage(null);
    setShowSparkles([]); // Reset sparkle effects when changing stories
  };

  const handleWordSelect = async (word: string) => {
     //setUserInput(word);
     if (!currentStory) return;

   const currentWords = currentStory.sections[currentSectionIndex].words;

   if (!currentWords[word]) {
     alert(`Word "${word}" not found in current section!`);
     return;
   }
     const selectedWordData = currentStory?.sections[currentSectionIndex]?.words[word];
     /*setCurrentImage({
       src: `/images/${selectedWordData?.image || null}`, //making the path based on the word button cliked (they are inside my-game/public/images )
       alt: word,
       x: selectedWordData?.x || 0,
       y: selectedWordData?.y || 0,
     });*/

     if (!selectedWordData) return;

     const newImage= {
       src: `/images/${selectedWordData?.image || null}`,
       alt: word,
       x: selectedWordData.x || 0,
       y: selectedWordData.y || 0,
     }

     const newPhrase = phrase.replace("___", word);
    
     if (!playerNumber) {
      console.warn("Player number not yet available. Aborting update.");
      return;
    }
     //This is where game state gets updated in firestore
     const gameRef = doc(db, "games", roomId);
     const docSnap = await getDoc(gameRef);

     const isLastSection = currentSectionIndex >= currentStory.sections.length - 1;
     const nextTurn = currentTurn === 1 ? 2 : 1;

     //if game already exists just update game document, else create new game document
     const gameDataToSave = {
      completedPhrases: [...completedPhrases, newPhrase],
      completedImages: [...completedImages, newImage],
      currentSectionIndex: isLastSection ? currentSectionIndex : currentSectionIndex + 1,
      currentPhrase: isLastSection
        ? "The End!"
        : currentStory.sections[currentSectionIndex + 1].phrase,
      lastWordSelected: {
        word,
        timestamp: new Date(),
      },
      currentTurn: nextTurn,
      lastUpdated: new Date(),
      gameStatus: isLastSection ? "completed" : "in_progress",
    };
    
    if (docSnap.exists()) {
      await updateDoc(gameRef, gameDataToSave);
    } else {
      await setDoc(gameRef, gameDataToSave);
    }

     setCompletedPhrases([...completedPhrases, newPhrase]); //store completed sentence
     setCompletedImages([...completedImages, newImage]); //store completed image
     setShowSparkles((prev) => [...prev, true]); // Trigger sparkle effect for the new image.
     //setCurrentTurn(prev => (prev === 1 ? 2 : 1));

     if (currentSectionIndex < currentStory.sections.length - 1) {
       setCurrentSectionIndex(currentSectionIndex + 1);
       setPhrase(currentStory.sections[currentSectionIndex + 1].phrase);
     } else {
       setPhrase("The End!");
     }
   };

    // Delay completion page overlay by 3 seconds
    /*useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        if (storyCompleted) {
            // 3 sec delay
            timeoutId = setTimeout(() => {
                setShowOverlay(true); // Update show completion page overlay
            }, 3000);
        }

        // Cleanup the timeout if the component unmounts
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [storyCompleted]);*/

    const handleAddImage = () => {
    if (userInput.trim() !== "" && currentImage && currentStory) {
      const newPhrase = phrase.replace("___", userInput);

      setCompletedPhrases([...completedPhrases, newPhrase]);
      setCompletedImages([...completedImages, currentImage]);

      if (currentSectionIndex < currentStory.sections.length - 1) {
        setCurrentSectionIndex(currentSectionIndex + 1);
        setPhrase(currentStory.sections[currentSectionIndex + 1].phrase);
        setUserInput("");
        setAddedImage(null);
        setImages([]);
        setCurrentImage(null);
      } else {
        setPhrase("The End!");
        setUserInput("");
        setAddedImage(null);
        setImages([]);
        setCurrentImage(null);
      }
    } else {
      alert("Please select a word from the AAC tablet."); //at the end of the story still asks to select word. need to change that
    }
  };

  if (!isMounted || !currentStory) return null;
  const playIndividualIconSounds = (word: string) => {
      playSound(word);
  };

  const handleAACSelect = (word: string) => {
    if (playerNumber !== currentTurn) {
      alert("Waiting for other player");
      return;
    }
    console.log("AAC Button Clicked:", word);
    playIndividualIconSounds(word);
    handleWordSelect(word);
  };

  if (!ttsReady) {
    return (
      <div className="flex items-center justify-center h-screen bg-yellow-100">
        <button
          onClick={handleStart}
          className="w-[80%] h-[30vh] text-5xl bg-orange-500 text-white font-extrabold rounded-[2rem] shadow-2xl hover:bg-orange-600 transition-all duration-300 flex items-center justify-center animate-pulse"
        >
          🎮 START GAME
        </button>
      </div>
    );
  }


  return (
    <div className="flex w-screen h-screen">

      {/* Left Panel: AAC Tablet */}
       <div className="w-1/3 bg-[hsl(45,93%,83%)] p-8 flex flex-col justify-center items-center rounded-lg shadow-lg border-[10px] border-[#e09f3e]" >
         <h2 style={{ color: "black" }} className="text-xl font-bold mb-4">
            {/* Story Selection */}
            <label htmlFor="story-select" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white bg-[#8ae2d5] p-2 rounded-lg">
              Select Story:
            </label>
            <select
              id="story-select"
              value={currentStory?.title || ""}
              onChange={(e) => {
                const selectedStory = stories.find((s) => s.title === e.target.value);
                if (selectedStory) {
                  handleStoryChange(selectedStory);
                }
              }}
              className="bg-[#8ae2d5] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              {stories.map((story) => (
                <option key={story.title} value={story.title}>
                  {story.title}
                </option>
              ))}

            </select>

            <div className="flex flex-col items-center justify-center mb-6 space-y-4">
              {/* Player Boxes */}
              <div className="flex space-x-8">
                <div className={`p-6 rounded-2xl w-40 text-center text-2xl font-extrabold transition-all border-4
                  ${currentTurn === 1 ? 'bg-yellow-300 border-yellow-600 shadow-lg scale-105' : 'bg-gray-200 border-gray-400'}`}>
                  👤 Player 1
                </div>
                <div className={`p-6 rounded-2xl w-40 text-center text-2xl font-extrabold transition-all border-4
                  ${currentTurn === 2 ? 'bg-blue-300 border-blue-600 shadow-lg scale-105' : 'bg-gray-200 border-gray-400'}`}>
                  👤 Player 2
                </div>
              </div>

              {/* Turn Status Message */}
              {playerNumber && (
                <div className="mt-4 text-center">
                  {playerNumber === currentTurn ? (
                    <p className="text-4xl font-extrabold text-green-600 animate-pulse">
                      ✅ YOUR TURN!
                    </p>
                  ) : (
                    <p className="text-3xl text-gray-600">
                      ⏳ Waiting for <span className="font-bold">Player {currentTurn}</span>...
                    </p>
                  )}
                </div>
              )}
            </div>
           <AACKeyboard
           onSelect={handleAACSelect}
           symbols={currentStory?.sections[currentSectionIndex]
           ? Object.entries(currentStory.sections[currentSectionIndex].words).map(
           ([word, data]) => ({
           word: word,
           image: `/images/${data.image}`,
           displayText: word
         }))
         : []
       }
       backgroundColor={currentStory?.colorTheme.backgroundColor}
       buttonColor={currentStory?.colorTheme.buttonColor}
         />
        </h2>
           <TextToSpeechAACButtons text={phrase} />
      </div>


        {/* Right Panel: Game Scene */}
      <div
        className="w-2/3 relative bg-cover bg-center flex justify-center items-center pb-20"
        style={{
          backgroundImage: `url('/images/${currentStory?.backgroundImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Completed Phrases (positioned with the text) */}
        <div className="absolute bottom-0 left-0 w-full bg-white p-4 rounded-t-lg shadow-lg border-t border-gray-300 whitespace-normal">
              <div className="flex flex-wrap items-center gap-2 whitespace-normal">
                  {completedPhrases.map((completedPhrase, index) => (
                      <span key={index} className="text-lg text-gray-700 text-nowrap">{completedPhrase}</span>
                  ))}
              </div>
              <span key={phrase} className="text-xl font-semibold text-black">
              <span className="inline-block border-r-2 border-black pr-2 overflow-hidden text-nowrap animate-typewriter"  style={{ "--tw-typewriter-width": `${phrase.length}ch` } as React.CSSProperties} >
                {phrase}
              </span>
            </span>
          </div>

        {/* Animated Images with Sparkles: Shows selected images with a sparkle effect. */}
        <AnimatePresence>
      {completedImages.map((image, index) => {
        const imageData = currentStory?.sections.flatMap(section => Object.values(section.words)).find(data => `/images/${data.image}` === image.src);
        const effect = imageData?.effect || 'none'; // Get the effect, default to 'none'

        let effectComponent = null;
if (effect === 'spin') {
  effectComponent = (
    <SpinEffect>
      <img src={image.src} alt={image.alt} className="w-48 h-48" {...getImageAnimation()} />
    </SpinEffect>
  );
} else if (effect === 'pulse') {
  effectComponent = (
    <PulseEffect>
      <img src={image.src} alt={image.alt} className="w-48 h-48" {...getImageAnimation()} />
    </PulseEffect>
  );
} else if (effect === 'fade') {
  effectComponent = (
    <FadeEffect>
      <img src={image.src} alt={image.alt} className="w-64 h-64" {...getImageAnimation()} />
    </FadeEffect>
  );
} else if (effect === 'sideToSide') {
  effectComponent = (
    <SideToSideEffect>
      <img src={image.src} alt={image.alt} className="w-48 h-48" {...getImageAnimation()} />
    </SideToSideEffect>
  );
} else if (effect === 'upAndDown') {
    effectComponent = (
      <UpAndDownEffect>
        <img src={image.src} alt={image.alt} className="w-48 h-48" {...getImageAnimation()} />
      </UpAndDownEffect>
    );

} else if (effect === 'scaleUp') {
  effectComponent = (
    <ScaleUpEffect>
      <img src={image.src} alt={image.alt} className="w-64 h-64" {...getImageAnimation()} />
    </ScaleUpEffect>
  );
} else if (effect === 'bounce') {
  effectComponent = (
    <BounceEffect>
      <img src={image.src} alt={image.alt} className="w-64 h-64" {...getImageAnimation()} />
    </BounceEffect>
  );

}else if (effect === 'SlideAcrossEffect') {
  effectComponent = (
    <SlideAcrossEffect>
        <img src={image.src} alt={image.alt} className="w-48 h-48" {...getImageAnimation()} />
    </SlideAcrossEffect>
  );
}else if (effect === 'flip'){
    effectComponent = (
        <FlipEffect>
            <img src={image.src} alt={image.alt} className="w-48 h-48" {...getImageAnimation()} />
        </FlipEffect>
    );
} else {
  effectComponent = (
    <motion.img src={image.src} alt={image.alt} className="w-64 h-64" {...getImageAnimation()} />
  );
}

return (
  <div key={index} className="absolute" style={{left: `${image.x}%`, top: `${Math.min(image.y, 60)}%`,}}>
            {showSparkles[index] ? (
              <SparkleEffect
                onComplete={() =>
                  setShowSparkles((prev) => {
                    const newState = [...prev];
                    newState[index] = false;
                    return newState;
                  })
                }
              />
            ) : (
              effectComponent // Render the effect component or the plain image
            )}
          </div>
        );
      })}
    </AnimatePresence>

          {/* Calls AutomaticTextToSpeech, which speech texts the current fill in the blank phrase*/}
          {phrase && (
            <TextToSpeechTextOnly2 key={phrase} text={phrase} />
)}

          {/* Text to speech completed story*/}
          {phrase === "The End!" && (
              <div>
                  {/*Call completedstory button and pass completedphrase map*/}
                  <CompletedStory2
                      index={completedPhrases.length - 1}
                      completedPhrases={completedPhrases}
                      roomId={roomId}
                      onComplete={() => {
                        console.log("Gameplay: Story is completed!");
                        setStoryCompleted(true);
                        //setShowOverlay(true); // Show the CompletionPage immediately after speech finishes
                      }}
                  />
              </div>
          )}

          {/*Completion page overlay that pops up*/}
          {showOverlay && (
              <div className="overlay">
                  <CompletionPage/>
              </div>
          )}
      </div>
    </div>
  );
}