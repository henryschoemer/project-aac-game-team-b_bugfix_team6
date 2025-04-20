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
import { doc, getDoc, setDoc, updateDoc, onSnapshot, getDocs, serverTimestamp, collection, runTransaction } from "firebase/firestore"; // to update the firestore database with game data

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

//This saves the player info such as their avatar, number, and playerId
async function savePlayerProfile(
  roomId: string,
  playerId: string,
  avatar: string,
  playerNumber: number
) {
  console.log("savePlayerProfile:", { roomId, playerId, avatar, playerNumber });
  const playerRef = doc(db, "games", roomId, "players", playerId);
  try {
    await setDoc(playerRef, {
      avatar,
      playerNumber,
      joinedAt: serverTimestamp(),
    });
  } catch (e) {
    console.error("Failed to write player doc:", e);
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
  const [showBlockAACButtonOverlay, setShowBlockAACButtonOverlay] = useState(false); // Is shown at "The end!" phrase

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

  //Creates a new sub-collection "players" in game collection and stores player info
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

    //Ipad dimensions
    const containerStyle = {
    width: '1024px',   // Fixed iPad landscape width
    height: '768px',   // Fixed iPad landscape height
    overflow: 'hidden' // Prevent any scrolling
  };


  //Assigning player #'s
  const handleConfirmAvatar = async () => {
    if (!selectedAvatar) return alert("Pick one!");
    const myId = sessionStorage.getItem("player-uid") || crypto.randomUUID();
    sessionStorage.setItem("player-uid", myId);

    await runTransaction(db, async tx => {
      const gameRef = doc(db, "games", roomId);
      const roomRef = doc(db, "rooms", roomId);
      const [gameSnap, roomSnap] = await Promise.all([tx.get(gameRef), tx.get(roomRef)]);
      const roomData = roomSnap.exists() ? roomSnap.data() : {};
      const roomNumPlayers = roomData.numPlayers || 4;

      if (!gameSnap.exists()) {
        // first join: create game doc
        tx.set(gameRef, {
          player1Id: myId,
          currentTurn: 1,
          maxPlayers: roomNumPlayers,
          currentSectionIndex: 0,
          currentPhrase: currentStory!.sections[0].phrase,
          completedPhrases: [],
          completedImages: [],
          gameStatus: "in_progress",
          lastUpdated: serverTimestamp()
        });
        setPlayerNumber(1);
      } else {
        const data = gameSnap.data();
        // assign next free slot
        if (!data.player2Id && roomNumPlayers > 1) {
          tx.update(gameRef, { player2Id: myId });
          setPlayerNumber(2);
        } else if (!data.player3Id && roomNumPlayers > 2) {
          tx.update(gameRef, { player3Id: myId });
          setPlayerNumber(3);
        } else if (!data.player4Id && roomNumPlayers > 3) {
          tx.update(gameRef, { player4Id: myId });
          setPlayerNumber(4);
        } else {
          throw new Error("Room is full");
        }
      }
    });

    // save avatar to sub-collection
    const playersCol = collection(db, "games", roomId, "players");
    const snapshot = await getDocs(playersCol);
    const myNum = snapshot.size + 1;
    await savePlayerProfile(roomId, myId, selectedAvatar, myNum);

    setAvatarModalOpen(false);
    speechSynthesis.getVoices();
    setTtsReady(true);
  };

  useEffect(() => {
    const isEnd       = phrase === "The End!";
    const notYourTurn = playerNumber !== null && currentTurn !== null && playerNumber !== currentTurn;
    setShowBlockAACButtonOverlay(isEnd || notYourTurn);
  }, [phrase, playerNumber, currentTurn]);

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
      await setDoc(gameRef, gameDataToSave, { merge: true });
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
      return;
    }
    console.log("AAC Button Clicked:", word);
    playIndividualIconSounds(word);
    handleWordSelect(word);
  };

  if (!ttsReady) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-yellow-100" style={containerStyle}>
        {/* Avatar modal - now centered in iPad viewport */}
        {avatarModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg max-w-xs mx-auto">
              <h2 className="text-xl font-bold mb-3 text-center text-black">Choose Your Avatar</h2>
              <div className="grid grid-cols-3 gap-3">
                {availableAvatars.map((avatar) => (
                  <button
                    key={avatar}
                    onClick={() => setSelectedAvatar(avatar)}
                    className={`text-3xl p-1 rounded-full border-4 ${
                      selectedAvatar === avatar ? "border-green-500" : "border-transparent"

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
                ✅ Start Game
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
  <div className="flex w-[1024px] h-[768px] overflow-hidden">
    {/* Left Panel: AAC Tablet */}
    <div className={`w-[40%] bg-[hsl(45,93%,83%)] p-3 flex flex-col justify-between items-center rounded-lg shadow-lg border-[8px] border-[#e09f3e] ${showBlockAACButtonOverlay ? 'blocked' : ''}`}>
      <h2 style={{ color: "black" }} className="text-xl font-bold mb-4">
        {/* Player turns display - merged version */}
        {playerNumber && (
          <div className="flex flex-col items-center justify-center mb-2 space-y-2">
            <div className="grid grid-cols-4 gap-2 w-full">
              {Object.entries(playerAvatars)
                .sort(([a], [b]) => Number(a) - Number(b))
                .map(([num, avatar]) => (
                  <div key={num} className="flex flex-col items-center">
                    <span
                      className={`text-3xl p-1 rounded-full ${
                        currentTurn === Number(num)
                          ? "border-4 border-green-500"
                          : "border-2 border-gray-400"
                      }`}
                    >
                      {avatar}
                    </span>
                    <span className="text-sm font-bold">Player {num}</span>
                  </div>
                ))}
            </div>
            <div className="mt-2 text-center">
              {playerNumber === currentTurn ? (
                <p className="text-xl font-extrabold text-green-600 animate-pulse">✅ YOUR TURN!</p>
              ) : (
                <p className="text-lg text-gray-600">
                  ⏳ Waiting for <span className="font-bold">Player {currentTurn}</span>
                </p>
              )}
            </div>
          </div>
        )}

                </div>
              );
            })}
          </div>
          <div className="mt-2 text-center w-full">
            {playerNumber === currentTurn ? (
              <p className="text-xl font-extrabold text-green-600 animate-pulse">YOUR TURN!</p>
            ) : (
              <p className="text-lg text-gray-600">
                ⏳ Player {currentTurn}
              </p>
            )}
          </div>
        </div>
      )}

      {/* AAC Keyboard - scaled down */}
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

      {/* Current phrase TTS button */}
      <TextToSpeechAACButtons text={phrase}/>
    </div>

    {/* Right Panel: Game Scene (60% width) */}
    <div
      className="w-[60%] relative bg-cover bg-center"
      style={{
        backgroundImage: `url('/images/${currentStory?.backgroundImage}')`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Animated Images */}
      <AnimatePresence>
        {completedImages.map((image, index) => {
          const imageData = currentStory?.sections.flatMap(section => Object.values(section.words)).find(data => `/images/${data.image}` === image.src);
          const effect = imageData?.effect || 'none';

          let effectComponent = null;
          if (effect === 'spin') {
            effectComponent = <SpinEffect><img src={image.src} alt={image.alt} className="w-32 h-32" {...getImageAnimation()} /></SpinEffect>;
          } else if (effect === 'pulse') {
            effectComponent = <PulseEffect><img src={image.src} alt={image.alt} className="w-32 h-32" {...getImageAnimation()} /></PulseEffect>;
          } 
          // [Keep all other effect conditions the same but with w-32 h-32]
          else {
            effectComponent = <motion.img src={image.src} alt={image.alt} className="w-32 h-32" {...getImageAnimation()} />;
          }

          return (
            <div key={index} className="absolute" style={{left: `${image.x}%`, top: `${Math.min(image.y, 60)}%`}}>
              {showSparkles[index] ? (
                <SparkleEffect onComplete={() => setShowSparkles(prev => {
                  const newState = [...prev];
                  newState[index] = false;
                  return newState;
                })} />
              ) : (effectComponent)}
            </div>
          );
        })}
      </AnimatePresence>

      {/* Story text area - compact */}
      <div className="absolute bottom-0 left-0 w-full min-h-[100px] bg-[url('/images/parchment-texture.png')] bg-cover p-3 border-t-4 border-amber-800 shadow-[0_-5px_15px_rgba(0,0,0,0.3)]">
        <div className="absolute -top-4 left-2 right-2 flex justify-between pointer-events-none">
          <span className="text-3xl text-amber-800">✧</span>
          <span className="text-3xl text-amber-800">✧</span>
        </div>

        <div className="max-w-full">
          <div className="flex flex-col gap-1">
            {phrase !== "The End!" ? (
              completedPhrases.length > 0 && (
                <span className="text-xl font-short-stack text-amber-700 italic bg-white/50 px-2 py-0.5 rounded whitespace-nowrap">
                  {completedPhrases[completedPhrases.length - 1]}
                </span>
              )
            ) : (
              completedPhrases.map((completedPhrase, index) => (
                <span key={index} className="text-lg font-short-stack text-amber-900 bg-white/80 px-2 py-0.5 rounded whitespace-nowrap">
                  {completedPhrase}
                </span>
              ))
            )}
          </div>

          <div className="relative mt-1">
            <span className="text-2xl font-bold font-patrick-hand text-amber-900 animate-pulse">
              {phrase}
              <span className="ml-1 inline-block w-1.5 h-6 bg-amber-600 animate-blink"></span>
            </span>
            
            <div className="absolute -top-5 left-0 right-0 flex justify-between px-6">
              <span className="text-xl opacity-70 animate-float">✨</span>
              <span className="text-lg opacity-60 animate-float delay-100">❋</span>
              <span className="text-xl opacity-80 animate-float delay-200">✧</span>
            </div>
          </div>
        </div>
      </div>

      {/* TTS Components */}
      {phrase && <TextToSpeechTextOnly2 key={phrase} text={phrase} />}
      
      {phrase === "The End!" && (
        <CompletedStory2
          index={completedPhrases.length - 1}
          completedPhrases={completedPhrases}
          roomId={roomId}
          onComplete={() => setStoryCompleted(true)}
        />
      )}

      {showOverlay && (
        <div className="fixed inset-0 z-50">
          <CompletionPage/>
        </div>
      )}
    </div>
  </div>
);
}
