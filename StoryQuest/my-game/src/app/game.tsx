//CURRENTLY THE GAME HAVE:
// -SPLIT SCREEN, ONE SIDE IS A MOCKUP AAC TABLET, WITH BUTTONS TO CLICK AND ADD IMAGE AND NEXT SENTENCE
// - IN THE STORIES.TSX FILE, THERE ARE 2 STORIES WITH 3 SENTENCES EACH.
// - THERE IS A OPTION ON A DROPDOWN TO CHANGE STORIES (DONT KNOW IF WE WANT TO KEEP IP LIKE THIS)
// - AFTER CLICKING THE WORD BUTTON (LINE 116) THE IMAGE WILL SHOW UP ON THE SCREEN.
// - AFTER CLICKING ADD WORD BUTTON (LINE 130) SENTENCE IS COMPLETED AND THE SENTENCE IS PUSHED TO THE LEFT CORNER OF PAGE.
// - AFTER CLICKING THE NEXT SENTENCE BUTTON (LINE 134) THE NEXT FILL-IN-THE-BLANK SENTENCE WILL SHOW UP.


//TO DO:
//MAKE THE WORD SELECTED IN THE SENTENCE IN BOLD
//ADDING THE VOICE READING THE SENCENCE




"use client";

import React, { useState, useEffect } from "react";
import stories, { Story, StorySection } from "./stories";//import the stories interface

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
  };

  const handleWordSelect = (word: string) => {
    setUserInput(word);
    const selectedWordData = currentStory?.sections[currentSectionIndex]?.words[word];
    setCurrentImage({
      src: `/images/${selectedWordData?.image || null}`, //making the path based on the word button cliked (they are inside my-game/public/images )
      alt: word,
      x: selectedWordData?.x || 0,
      y: selectedWordData?.y || 0,
    });
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

  return (
    <div className="flex w-screen h-screen">
      {/* Left Panel: AAC Tablet */}
      <div className="w-1/3 bg-gray-200 p-4 flex flex-col justify-center items-center">
        <h2 style={{ color: "black" }} className="text-xl font-bold mb-4">
          AAC Tablet
        </h2>

        {/* Story Selection */}
        <div className="mb-4">
          <label htmlFor="story-select" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {stories.map((story) => (
              <option key={story.title} value={story.title}>
                {story.title}
              </option>
            ))}
          </select>
        </div>

        {/* Word Buttons */}
        <div className="flex gap-4">
          {currentStory?.sections[currentSectionIndex]?.words &&
            Object.keys(currentStory.sections[currentSectionIndex].words).map((word) => (
              <button
                key={word}
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={() => handleWordSelect(word)}
              >
                {word}
              </button>
            ))}
        </div>
        <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded" onClick={handleAddImage}> 
          Add word
        </button>
        {/* Next Section Button */}
        {currentStory?.sections.length > 1 && currentSectionIndex < currentStory.sections.length - 1 && (
          <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded" onClick={handleAddImage}>
            Next Sentence
          </button>
        )}
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

        {/* Completed Images (positioned directly on the background) */}
        <div className="absolute top-0 left-0 w-full h-full">
          {completedImages.map((image, index) => (
            <img
              key={index}
              src={image.src}
              alt={image.alt}
              className="absolute w-16 h-16"
              style={{ left: `${image.x}%`, top: `${image.y}%` }}
            />
          ))}
        </div>

        {/* Current Phrase and Images */}
        <p className="mb-2 absolute" style={{ color: "black" }}>
          {phrase}
        </p>
        {currentImage && (
          <img
            src={currentImage.src}
            alt={currentImage.alt}
            className="absolute w-16 h-16"
            style={{ left: `${currentImage.x}%`, top: `${currentImage.y}%` }}
          />
        )}
      </div>
    </div>
  );
}