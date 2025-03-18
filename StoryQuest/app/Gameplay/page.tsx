//CURRENTLY THE GAME HAVE:
// - IN THE STORIES.TSX FILE, THERE ARE 2 STORIES WITH 3 SENTENCES EACH.
// - THERE IS A OPTION ON A DROPDOWN TO CHANGE STORIES (DONT KNOW IF WE WANT TO KEEP IP LIKE THIS)


//TO DO:
//MAKE THE WORD SELECTED IN THE SENTENCE IN BOLD





"use client";

import React, { useState, useEffect } from "react";
import stories, { Story, StorySection } from "./stories";//import the stories interface
import AACKeyboard from "../Components/AACKeyboard";
import useSound from 'use-sound';
import TextToSpeech from "../Components/TextToSpeech";
import CompletedStoryButton from "@/Components/CompletedStoryButton";
import {motion, AnimatePresence} from "framer-motion";
import {SpinEffect,PulseEffect,FadeEffect,SideToSideEffect, UpAndDownEffect,ScaleUpEffect,BounceEffect,FlipEffect} from "../Components/animationUtils";

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
  const [showSparkles, setShowSparkles] = useState<boolean[]>([]);
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

  useEffect(() => {
    setIsMounted(true);
    if (stories.length > 0) {
      setCurrentStory(stories[0]);
      setPhrase(stories[0].sections[0].phrase);
    }
  }, []);

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

  const handleWordSelect = (word: string) => {
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

     setCompletedPhrases([...completedPhrases, newPhrase]); //store completed sentence
     setCompletedImages([...completedImages, newImage]); //store completed image
     setShowSparkles((prev) => [...prev, true]); // Trigger sparkle effect for the new image.

     if (currentSectionIndex < currentStory.sections.length - 1) {
       setCurrentSectionIndex(currentSectionIndex + 1);
       setPhrase(currentStory.sections[currentSectionIndex + 1].phrase);
     } else {
       setPhrase("The End!");
     }
   };

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
        
        {/*Hear Phrase button */}
           {/*
           <p className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
               {completedPhrases.length > 0 ? completedPhrases[completedPhrases.length - 1] : phrase}
           </p>
           */}
           <TextToSpeech text={completedPhrases.length > 0 ? completedPhrases[completedPhrases.length - 1] : phrase} />
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
        <div className="absolute top-0 left-0 w-full h-full">
          {completedPhrases.map((completedPhrase, index) => (
            <div key={index} className="absolute" style={{ top: `${index * 50}px`, left: '20px' }}>
              <p className="mb-2" style={{ color: "black" }}>
                {completedPhrase}
              </p>
            </div>
          ))}
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
      <img src={image.src} alt={image.alt} className="w-32 h-32" {...getImageAnimation()} />
    </SpinEffect>
  );
} else if (effect === 'pulse') {
  effectComponent = (
    <PulseEffect>
      <img src={image.src} alt={image.alt} className="w-32 h-32" {...getImageAnimation()} />
    </PulseEffect>
  );
} else if (effect === 'fade') {
  effectComponent = (
    <FadeEffect>
      <img src={image.src} alt={image.alt} className="w-32 h-32" {...getImageAnimation()} />
    </FadeEffect>
  );
} else if (effect === 'sideToSide') {
  effectComponent = (
    <SideToSideEffect>
      <img src={image.src} alt={image.alt} className="w-32 h-32" {...getImageAnimation()} />
    </SideToSideEffect>
  );
} else if (effect === 'upAndDown') {
    effectComponent = (
      <UpAndDownEffect>
        <img src={image.src} alt={image.alt} className="w-32 h-32" {...getImageAnimation()} />
      </UpAndDownEffect>
    );

} else if (effect === 'scaleUp') {
  effectComponent = (
    <ScaleUpEffect>
      <img src={image.src} alt={image.alt} className="w-32 h-32" {...getImageAnimation()} />
    </ScaleUpEffect>
  );
} else if (effect === 'bounce') {
  effectComponent = (
    <BounceEffect>
      <img src={image.src} alt={image.alt} className="w-32 h-32" {...getImageAnimation()} />
    </BounceEffect>
  );
}else if (effect === 'flip'){
    effectComponent = (
        <FlipEffect>
            <img src={image.src} alt={image.alt} className="w-32 h-32" {...getImageAnimation()} />
        </FlipEffect>
    );
} else {
  effectComponent = (
    <motion.img src={image.src} alt={image.alt} className="w-32 h-32" {...getImageAnimation()} />
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

          {/* Text to speech completed story*/}
          {phrase === "The End!" && (
              <div>
                  {/*Call completedstory button and pass completedphrase map*/}
                  <CompletedStoryButton
                      index={completedPhrases.length - 1}
                      //completedPhrase={completedPhrases[completedPhrases.length - 1]}
                      completedPhrases={completedPhrases}
                  />
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