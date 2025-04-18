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
import { doc, getDoc, setDoc, updateDoc, onSnapshot, runTransaction } from "firebase/firestore"; // to update the firestore database with game data

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

const availableAvatars = ["🐯", "🐻", "🐘", "🐵", "🐬", "🦋"];

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
  const [maxPlayers, setMaxPlayers] = useState<number>(4);
  const [lastPlayedWord, setLastPlayedWord] = useState<string | null>(null);
  const [ttsReady, setTtsReady] = useState(false);
  const [avatarModalOpen, setAvatarModalOpen] = useState<boolean>(false);//Opens window for player to choose avatar
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [playerAvatars, setPlayerAvatars] = useState<{ [key: number]: string | undefined }>({});
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
  
      setMaxPlayers(gameData.maxPlayers || 4);
      setCurrentSectionIndex(gameData.currentSectionIndex);
      setPhrase(gameData.currentPhrase);
      setCompletedPhrases(gameData.completedPhrases || []);
      setCompletedImages(gameData.completedImages || []);
      setCurrentTurn(gameData.currentTurn || 1);
      setStoryCompleted(gameData.gameStatus === "completed");

      //Sets avatars in array to match with player numbers
      setPlayerAvatars({
        1: gameData.player1Avatar,
        2: gameData.player2Avatar,
        3: gameData.player3Avatar,
        4: gameData.player4Avatar,
      });

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

  useEffect(() => {
    if (!storyTitle || stories.length === 0) return;
  
    const selectedStory = stories.find((s) => s.title === storyTitle);
    const storyToUse = selectedStory || stories[0];
  
    setCurrentStory(storyToUse);
    setPhrase(storyToUse.sections[0].phrase);
    setIsMounted(true);
  }, [storyTitle, stories]);


  //Assigning player #'s
  useEffect(() => {
    if (!roomId || !currentStory) return;
  
    const assignPlayer = async () => {
      const gameRef = doc(db, "games", roomId);
      // Also retrieve the room doc to access numPlayers if needed
      const roomRef = doc(db, "rooms", roomId);
      const roomSnap = await getDoc(roomRef);
      let roomNumPlayers = 4; // default
      if (roomSnap.exists()) {
        const roomData = roomSnap.data();
        roomNumPlayers = roomData.numPlayers;
      }
  
      const myId = sessionStorage.getItem("player-uid") || crypto.randomUUID();
      sessionStorage.setItem("player-uid", myId);
  
      try {
        await runTransaction(db, async (transaction) => {
          const gameDoc = await transaction.get(gameRef);
  
          // If the game doc doesn't exist, create it.
          if (!gameDoc.exists()) {
            transaction.set(gameRef, {
              player1Id: myId,
              player1Avatar: selectedAvatar,
              currentTurn: 1,
              maxPlayers: roomNumPlayers, // using value from room document
              completedPhrases: [],
              completedImages: [],
              currentSectionIndex: 0,
              currentPhrase: currentStory.sections[0].phrase,
              lastUpdated: new Date(),
              gameStatus: "in_progress",
            });
            setPlayerNumber(1);
            return;
          }
  
          // check what player slot is available in the transaction
          const data = gameDoc.data();
  
          if (data.player1Id === myId) {
            setPlayerNumber(1);
            return;
          } else if (data.player2Id === myId) {
            setPlayerNumber(2);
            return;
          } else if (data.player3Id === myId) {
            setPlayerNumber(3);
            return;
          } else if (data.player4Id === myId) {
            setPlayerNumber(4);
            return;
          }
  
          // Assign the next free slot, using maxPlayers (or roomNumPlayers)
          if (!data.player1Id) {
            transaction.update(gameRef, { player1Id: myId, player1Avatar: selectedAvatar });
            setPlayerNumber(1);
          } else if (!data.player2Id && (data.maxPlayers || roomNumPlayers) > 1) {
            transaction.update(gameRef, { player2Id: myId, player2Avatar: selectedAvatar });
            setPlayerNumber(2);
          } else if (!data.player3Id && (data.maxPlayers || roomNumPlayers) > 2) {
            transaction.update(gameRef, { player3Id: myId, player3Avatar: selectedAvatar });
            setPlayerNumber(3);
          } else if (!data.player4Id && (data.maxPlayers || roomNumPlayers) > 3) {
            transaction.update(gameRef, { player4Id: myId, player4Avatar: selectedAvatar });
            setPlayerNumber(4);
          } else {
            throw new Error("Room is full!");
          }
        });
      } catch (error) {
        console.error("Player assignment transaction failed: ", error);
        alert("Failed to join the room. Please try again.");
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
    // If no avatar is selected yet, open the modal.
    if (!selectedAvatar) {
      setAvatarModalOpen(true);
    } else {
      speechSynthesis.getVoices(); // Prime voice loading
      setTtsReady(true);
    }
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
    
     
     //This is where game state gets updated in firestore
     const gameRef = doc(db, "games", roomId);
     const docSnap = await getDoc(gameRef);

     if (docSnap.exists()) {
      const data = docSnap.data();
      const maxPlayers = data.maxPlayers || 4;
      const nextTurn = currentTurn === maxPlayers ? 1 : currentTurn + 1;
      const isLastSection = currentSectionIndex >= currentStory.sections.length - 1;

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
      <>
        {/* Render the Avatar Selection Modal if it should be open */}
        {/*Gives player window to choose an avatar*/}
        {avatarModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg max-w-xs mx-auto">
              <h2 className="text-2xl font-bold mb-4 text-center text-black">Choose Your Avatar</h2>
              <div className="grid grid-cols-2 gap-4">
                {availableAvatars.map((avatar) => (
                  <button
                    key={avatar}
                    onClick={() => setSelectedAvatar(avatar)}
                    className={`text-4xl p-2 rounded-full border-4 ${
                      selectedAvatar === avatar ? "border-green-500" : "border-transparent"
                    }`}
                  >
                    {avatar}
                  </button>
                ))}
              </div>
              <button
                onClick={() => {
                  if (selectedAvatar) {
                    setAvatarModalOpen(false);
                    // Now that the avatar is selected, set TTS as ready.
                    speechSynthesis.getVoices();
                    setTtsReady(true);
                  } else {
                    alert("Please select an avatar.");
                  }
                }}
                className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
              >
                ✅
              </button>
            </div>
          </div>
        )}

        {/* If the avatar modal is not open, render the START GAME button */}
        <div className="flex items-center justify-center h-screen bg-yellow-100">
          <button
            onClick={handleStart}
            className="w-[80%] h-[30vh] text-5xl bg-orange-500 text-white font-extrabold rounded-[2rem] shadow-2xl hover:bg-orange-600 transition-all duration-300 flex items-center justify-center animate-pulse"
          >
            🎮 START GAME
          </button>
        </div>
      </>
    );
  }

  return (
    <div className="flex w-screen h-screen">

      {/* Left Panel: AAC Tablet */}
       <div className="w-[38%] bg-[hsl(45,93%,83%)] p-4 flex flex-col justify-center items-center rounded-lg shadow-lg border-[10px] border-[#e09f3e]" >
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
            
            {/* Displays player turns on AAC panel*/}
            {playerNumber && (
              <div className="flex flex-col items-center justify-center mb-6 space-y-4">
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {Array.from({ length: maxPlayers }, (_, i) => i + 1).map((num) => {
                    // Get the avatar for this player number. Use a default if none exists.
                    const avatarToShow = playerAvatars[num] || availableAvatars[num - 1] || "👤";

                    return (
                      <div key={num} className="flex flex-col items-center">
                        <span
                          className={`text-5xl p-2 rounded-full ${
                            currentTurn === num ? "border-4 border-green-500" : "border-2 border-gray-400"
                          }`}
                        >
                          {avatarToShow}
                        </span>
                        <span className="text-xl font-bold">{`Player ${num}`}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-4 text-center">
                  {playerNumber === currentTurn ? (
                    <p className="text-4xl font-extrabold text-green-600 animate-pulse">✅ YOUR TURN!</p>
                  ) : (
                    <p className="text-3xl text-gray-600">
                      ⏳ Waiting for <span className="font-bold">Player {currentTurn}</span>...
                    </p>
                  )}
                </div>
              </div>
            )}
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
        className="w-[62%] relative bg-cover bg-center flex justify-center items-center pb-20"
        style={{
          backgroundImage: `url('/images/${currentStory?.backgroundImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Completed Phrases (positioned with the text) */}
        {/* Storybook Text Display */}
        <div className="absolute bottom-0 left-0 w-full min-h-[140px] bg-[url('/images/parchment-texture.png')] bg-cover p-6 border-t-8 border-amber-800 shadow-[0_-10px_30px_rgba(0,0,0,0.3)]">
          {/* Decorative scroll ends */}
          <div className="absolute -top-6 left-4 right-4 flex justify-between pointer-events-none">
            <span className="text-5xl text-amber-800">✧</span>
            <span className="text-5xl text-amber-800">✧</span>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Completed story phrases */}
          <div className="mb-3 max-h-[80px] overflow-y-auto"></div>
          <div className="flex flex-col gap-1">
          {completedPhrases.map((completedPhrase, index) => (
          <span 
            key={index} 
            className="text-3xl font-short-stack text-amber-900 bg-white/70 px-3 py-1 rounded-lg whitespace-nowrap"
          >
          {completedPhrase}
          </span>
        ))}
      </div>
      </div>

        {/* Current phrase with magical effects */}
        <div className="relative">
          <span className="text-4xl font-bold font-patrick-hand text-amber-900 animate-pulse">
            {phrase}
            <span className="ml-1 inline-block w-2 h-10 bg-amber-600 animate-blink"></span>
          </span>
          
          {/* Floating fairydust particles */}
          <div className="absolute -top-8 left-0 right-0 flex justify-between px-10">
            <span className="text-3xl opacity-70 animate-float">✨</span>
            <span className="text-2xl opacity-60 animate-float delay-100">❋</span>
            <span className="text-3xl opacity-80 animate-float delay-200">✧</span>
          </div>
        </div>
      </div>
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
      <img src={image.src} alt={image.alt} className="w-48 h-48" {...getImageAnimation()} />
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
      <img src={image.src} alt={image.alt} className="w-48 h-48" {...getImageAnimation()} />
    </ScaleUpEffect>
  );
} else if (effect === 'bounce') {
  effectComponent = (
    <BounceEffect>
      <img src={image.src} alt={image.alt} className="w-48 h-48" {...getImageAnimation()} />
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
    <motion.img src={image.src} alt={image.alt} className="w-48 h-48" {...getImageAnimation()} />
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
  );
}
