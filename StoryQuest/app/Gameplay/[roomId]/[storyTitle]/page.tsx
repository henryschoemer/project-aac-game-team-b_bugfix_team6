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
import { doc, getDoc, setDoc, updateDoc, onSnapshot, getDocs, serverTimestamp, collection } from "firebase/firestore"; // to update the firestore database with game data

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

async function savePlayerProfile(
  roomId: string,
  playerId: string,
  avatar: string,
  playerNumber: number
) {
  console.log("🔸 savePlayerProfile:", { roomId, playerId, avatar, playerNumber });
  const playerRef = doc(db, "games", roomId, "players", playerId);
  try {
    await setDoc(playerRef, {
      avatar,
      playerNumber,
      joinedAt: serverTimestamp(),
    });
    console.log("✅ successfully wrote player doc:", playerRef.path);
  } catch (e) {
    console.error("❌ failed to write player doc:", e);
    throw e;
  }
}

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

//Grabbing roomID and story title from URL
//roomID stores in firestore
//story chosen from create room becomes default story
const params = useParams();
console.log("Params:", params); // Debugging

const roomId = params.roomId as string;
const storyTitleURL = params.storyTitle as string | undefined;
const storyTitle = storyTitleURL ? decodeURIComponent(storyTitleURL) : null;
const completedLength = completedPhrases.length;
const lastCompleted = completedPhrases[completedLength - 1];
const secondToLastCompleted = completedPhrases[completedLength - 2];
const gameFinished = lastCompleted === "The End!";

//This is the snapshot used to retrieve game state in firestore
useEffect(() => {
  if (!roomId) return;

  const playersCol = collection(db, "games", roomId, "players");
  const unsubscribePlayers = onSnapshot(playersCol, (snap) => {
    const avatars: Record<number,string> = {};
      snap.docs.forEach(d => {
        const data = d.data() as { avatar: string; playerNumber: number };
        avatars[data.playerNumber] = data.avatar;
    });
    setPlayerAvatars(avatars);
  });

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

      if (gameData.gameStatus === "completed" && gameData.ttsDone) {
        setTimeout(() => {
          setShowOverlay(true);
        }, 3000);
      }

      const lastWord = gameData.lastWordSelected?.word;
      if (lastWord && lastWord !== lastPlayedWord) {
        setLastPlayedWord(lastWord);
      }
    }
  });

  return () => unsubscribe();
}, [roomId, lastPlayedWord]);

  useEffect(() => {
    if (!storyTitle || stories.length === 0) return;
  
    const selectedStory = stories.find((s) => s.title === storyTitle);
    const storyToUse = selectedStory || stories[0];
  
    setCurrentStory(storyToUse);
    setPhrase(storyToUse.sections[0].phrase);
    setIsMounted(true);
  }, [storyTitle, stories]);


  //Assigning player #'s
  const handleConfirmAvatar = async () => {
    if (!selectedAvatar) {
      alert("Pick an avatar first!");
      return;
    }
    setAvatarModalOpen(false);
  
    const gameRef = doc(db, "games", roomId);
    const roomRef = doc(db, "rooms", roomId);
    const roomSnap = await getDoc(roomRef);
    const roomNumPlayers = roomSnap.exists() ? roomSnap.data().numPlayers : 4;
    const myId = sessionStorage.getItem("player-uid") || crypto.randomUUID();
    sessionStorage.setItem("player-uid", myId);

    const playersCol = collection(db, "games", roomId, "players");
     const snapshot = await getDocs(playersCol);
     const myPlayerNumber = snapshot.size + 1;
     setPlayerNumber(myPlayerNumber);

    console.log("🔹 handleConfirmAvatar: about to save profile for", myId);
    try {
      await savePlayerProfile(roomId, myId, selectedAvatar, myPlayerNumber);
  
      // now enable TTS/UI
      speechSynthesis.getVoices();
      setTtsReady(true);
  
    } catch (err) {
      console.error(err);
      alert("Could not join the game.");
    }
  };

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
        {avatarModalOpen ? (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg max-w-xs mx-auto">
              <h2 className="text-2xl font-bold mb-4 text-center text-black">Choose Your Avatar</h2>
              <div className="grid grid-cols-2 gap-4">
                {availableAvatars.map(a => (
                  <button
                    key={a}
                    onClick={() => setSelectedAvatar(a)}
                    className={`text-4xl p-2 rounded-full border-4 ${
                      selectedAvatar === a ? "border-green-500" : "border-transparent"
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>
              <button
                onClick={handleConfirmAvatar}
                className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded"
              >
                ✅
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-screen bg-yellow-100">
            <button
              onClick={() => setAvatarModalOpen(true)}
              className="w-[80%] h-[30vh] text-5xl bg-orange-500 text-white font-extrabold rounded-2xl shadow-2xl hover:bg-orange-600 transition animate-pulse"
            >
              🎮 START GAME
            </button>
          </div>
        )}
          </>
          );
        }

  return (
    <div className="flex w-screen h-screen">

      {/* Left Panel: AAC Tablet */}
       <div className="w-[38%] bg-[hsl(45,93%,83%)] p-4 flex flex-col justify-center items-center rounded-lg shadow-lg border-[10px] border-[#e09f3e]" >
         <h2 style={{ color: "black" }} className="text-xl font-bold mb-4">

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
          <div className="flex flex-col gap-1">
            {phrase !== "The End!" ? (
                <>
                  {completedPhrases.length > 0 && (
                      <span className="text-3xl font-short-stack text-amber-700 italic bg-white/50 px-3 py-1 rounded-lg whitespace-nowrap">
                        {completedPhrases[completedPhrases.length - 1]}
                      </span>
                  )}
                </>
            ) : (
                completedPhrases.map((completedPhrase, index) => (
                    <span key={index} className="text-2xl font-short-stack text-amber-900 bg-white/80 px-3 py-1 rounded-lg whitespace-nowrap">
                      {completedPhrase}
                    </span>
                ))
            )}
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
