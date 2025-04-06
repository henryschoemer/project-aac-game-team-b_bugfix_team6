"use client";

import React, { useState, useEffect } from "react";
import stories, { Story, StorySection } from "../../stories";//import the stories interface
import { useParams } from "next/navigation";//To retrieve story based on room settings
import AACKeyboard from "../../../Components/AACKeyboard";
import useSound from 'use-sound';
import TextToSpeechAACButtons from "../../../Components/TextToSpeechAACButtons";
import CompletedStory from "@/Components/CompletedStory";
import {motion, AnimatePresence} from "framer-motion";
import {SpinEffect,PulseEffect,FadeEffect,SideToSideEffect, UpAndDownEffect,ScaleUpEffect,BounceEffect,FlipEffect} from "../../../Components/animationUtils";
import CompletionPage from "../../../CompletionPage/page";
import TextToSpeechTextOnly from "@/Components/TextToSpeechTextOnly";
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
  useEffect(() => {

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
  }, [storyTitle]);

  useEffect(() => {
    // Just for demo: alternate between player 1 and 2 randomly
    const storedPlayer = sessionStorage.getItem(`player-${roomId}`);
    if (storedPlayer) {
      setPlayerNumber(parseInt(storedPlayer));
    } else {
      const newPlayer = Math.random() < 0.5 ? 1 : 2;
      sessionStorage.setItem(`player-${roomId}`, newPlayer.toString());
      setPlayerNumber(newPlayer);
    }
  }, [roomId]);


  /*useEffect(() => {
    setIsMounted(true);
    if (stories.length > 0) {
      setCurrentStory(stories[0]);
      setPhrase(stories[0].sections[0].phrase);
    }
  }, []);*/

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
    

     //This is where game state gets updated in firestore
     const gameRef = doc(db, "games", roomId);
     const docSnap = await getDoc(gameRef);

     const isLastSection = currentSectionIndex >= currentStory.sections.length - 1;

     //if game already exists just update game document, else create new game document
     if (docSnap.exists()) {
      await updateDoc(gameRef, {
        completedPhrases: [...completedPhrases, newPhrase],
        completedImages: [...completedImages, newImage],
        currentSectionIndex: currentSectionIndex < currentStory.sections.length - 1
          ? currentSectionIndex + 1
          : currentSectionIndex,
        currentPhrase: currentSectionIndex < currentStory.sections.length - 1
          ? currentStory.sections[currentSectionIndex + 1].phrase
          : "The End!",
        lastWordSelected: {
          word,
          timestamp: new Date(),
        },
        currentTurn: currentTurn === 1 ? 2 : 1,
        lastUpdated: new Date(),
        gameStatus: isLastSection ? "completed" : "in_progress",
      });
     } else {
      await setDoc(gameRef, {
        completedPhrases: [...completedPhrases, newPhrase],
        completedImages: [...completedImages, newImage],
        currentSectionIndex: currentSectionIndex < currentStory.sections.length - 1
          ? currentSectionIndex + 1
          : currentSectionIndex,
        currentPhrase: currentSectionIndex < currentStory.sections.length - 1
          ? currentStory.sections[currentSectionIndex + 1].phrase
          : "The End!",
        lastWordSelected: {
          word,
          timestamp: new Date(),
        },
        currentTurn: 1,
        lastUpdated: new Date(),
        gameStatus: isLastSection ? "completed" : "in_progress",
      });
     }

     setCompletedPhrases([...completedPhrases, newPhrase]); //store completed sentence
     setCompletedImages([...completedImages, newImage]); //store completed image
     setShowSparkles((prev) => [...prev, true]); // Trigger sparkle effect for the new image.
     setCurrentPlayer(prev => (prev === 1 ? 2 : 1));

     if (currentSectionIndex < currentStory.sections.length - 1) {
       setCurrentSectionIndex(currentSectionIndex + 1);
       setPhrase(currentStory.sections[currentSectionIndex + 1].phrase);
     } else {
       setPhrase("The End!");
     }
   };

    // Delay completion page overlay by 3 seconds
    useEffect(() => {
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
    }, [storyCompleted]);

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
      play({ id: word });
  };

  const handleAACSelect = (word: string) => {
    if (playerNumber !== currentTurn) {
      alert("It's not your turn!");
      return;
    }
    console.log("AAC Button Clicked:", word);
    playIndividualIconSounds(word)
    handleWordSelect(word);
  };


  return (
    <div className="flex w-screen h-screen">

      {/* Left Panel: AAC Tablet */}
       <div className="w-1/3 bg-[hsl(45,93%,83%)] p-8 flex flex-col justify-center items-center rounded-lg shadow-lg border-[10px] border-[#e09f3e] transform transition duration-500 hover:scale-105" >
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

            <div className="flex justify-around mb-6">
              <div className={`p-4 rounded-lg text-center w-1/3 font-bold text-lg transition-all
                ${currentTurn === 1 ? 'bg-yellow-300 border-4 border-yellow-500 shadow-md' : 'bg-gray-200'}`}>
                Player 1
              </div>
              <div className={`p-4 rounded-lg text-center w-1/3 font-bold text-lg transition-all
                ${currentTurn === 2 ? 'bg-blue-300 border-4 border-blue-500 shadow-md' : 'bg-gray-200'}`}>
                Player 2
              </div>
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
        className="w-2/3 relative bg-cover bg-center flex justify-center items-center"
        style={{
          backgroundImage: `url('/images/${currentStory?.backgroundImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Completed Phrases (positioned with the text) */}
          <div className="absolute bottom-0 left-0 w-full bg-white p-4 rounded-t-lg shadow-lg border-t border-gray-300 min-h-[80px] flex items-center gap-2 overflow-hidden whitespace-nowrap">
              {completedPhrases.map((completedPhrase, index) => (
                  <span key={index} className="text-lg text-gray-700">{completedPhrase}</span>
              ))}
              <span key={phrase} className="text-xl font-semibold text-black">
              <span className="inline-block border-r-2 border-black pr-2 overflow-hidden w-0 animate-typewriter">
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
          <div key={index} className="absolute" style={{ left: `${image.x}%`, top: `${image.y}%` }}>
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
          <TextToSpeechTextOnly text={phrase}/>

          {/* Text to speech completed story*/}
          {phrase === "The End!" && (
              <div>
                  {/*Call completedstory button and pass completedphrase map*/}
                  <CompletedStory
                      index={completedPhrases.length - 1}
                      completedPhrases={completedPhrases}
                      onComplete={() => {
                          console.log("Gameplay: Story is completed!");
                          setStoryCompleted(true); // Update state when completed text to speech is done
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
        {/* Current Phrase and Images */}
        <p className="mb-2 absolute" style={{ color: "black" }}>
          {phrase}
        </p>
      </div>
    </div>
  );
}