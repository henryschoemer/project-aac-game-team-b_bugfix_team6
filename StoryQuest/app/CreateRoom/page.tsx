//project-aac-game-team-b/StoryQuest/app/CreateRoom/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { ExitButton } from "../HomePage/HomePageButtons";
import { db } from "../../firebaseControls/firebaseConfig"; // Import Firestore
import { collection, addDoc } from "firebase/firestore";
import { QRCode } from "react-qrcode-logo";
import "./CreateRoomButtonStyles.css";
import useSound from "use-sound";
import useTextToSpeech from "@/Components/useTextToSpeech";
import useButtonFeedback from "@/Components/useButtonClickSounds";

export default function CreateRoomPage() {
    // Story Option Selection
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedStory, setSelectedStory] = useState<string | null>(null);
    const [numPlayers, setNumPlayers] = useState<number | null>(null);
    const [difficultyLevel, setDifficultyLevel] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [roomId, setRoomId] = useState<string | null>(null);
    const [tooltip, setTooltip] = useState<string | null>(null);
    const {speak} = useTextToSpeech(); // useTextToSpeech hook
    const { buttonHandler, isSpeaking } = useButtonFeedback();

    const router = useRouter();

    const handleStoryClick = (story: string) => {
        setSelectedStory(story);
        setCurrentStep(2);
        buttonHandler('select', story, speak)
    };

    const handlePlayerClick = (num: number) => {
        setNumPlayers(num);
        setCurrentStep(3);
        buttonHandler('select', num+" players", speak)
    };

    const handleDifficultyClick = (level: string) => { //NEED TO USE THIS ON GAMEPLAY TO SELECT STORIES 1,2,OR 3
        setDifficultyLevel(level);
        setCurrentStep(4);
        buttonHandler('select', level+" mode", speak)
    };

    const handleCreateRoom = async () => {
        buttonHandler('select',"Start Adventure!", speak);
        setLoading(true);
        try {
            // Add room data to Firestore
            const docRef = await addDoc(collection(db, "rooms"), {
                story: selectedStory,
                numPlayers: numPlayers,
                difficulty: difficultyLevel,
            });

            //setRoomId(docRef.id); // Store room ID
            console.log("Room Created with ID:", docRef.id);
            setRoomId(docRef.id);
            buttonHandler('create', "Room Created", speak);
            alert(`Room Created! Room ID: ${docRef.id}`);
            router.push(`/CreateRoom/qrcode?roomId=${docRef.id}&storyTitle=${encodeURIComponent(selectedStory ?? "")}`);
        } catch (error) {
            console.error("Error creating room:", error);
            alert("Failed to create room.");
        } finally {
            setLoading(false);
        }
    };

    const goBack = (text:string) => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
        buttonHandler('back', text, speak);
    };

    const handleOnMouseEnter =(text:string)=>{
        if(!isSpeaking) // to avoid button click audio cutoff
            speak(text);
    }
    

    return (
  <div className="h-screen w-screen overflow-hidden bg-cover bg-center flex items-center justify-center" 
       style={{ backgroundImage: "url('/HomePage-Images/Background.jpg')" }}>

        
    
    {/* Main content container */}
    <div className="relative h-[90vh] w-[90vw] bg-white/80 backdrop-blur-sm flex flex-col items-center p-6 overflow-hidden shadow-xl rounded-2xl">
      
      {/* Home Button (conditionally shown) */}
      {(currentStep === 1 || currentStep === 4) && (
        <div className="absolute top-4 left-4">
          <Link href="/">
            <button className="scale-50 p-2 rounded-full bg-white/90 shadow-md hover:bg-gray-100 transition-colors">
              <ExitButton/>
            </button>
          </Link>
        </div>
      )}

      {/* Header */}
      <div className="w-full max-w-4xl text-center mt-4 mb-2">
        <h1 className="text-3xl font-bold text-gray-800">Let's Create a Game!</h1>
      </div>

      {/* Progress bubbles */}
      <div className="flex justify-center gap-3 mb-4 w-full max-w-4xl">
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold
            ${currentStep >= step ? "bg-teal-500 text-white" : "bg-gray-200 text-gray-600"}`}>
            {step}
          </div>
        ))}
      </div>

       

      {/* Step 1: Story Selection */}
      {currentStep === 1 && (
        <div className="w-full max-w-4xl flex-grow flex flex-col overflow-hidden">
          <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">Choose Your Story</h2>
          
          <div className="grid grid-cols-2 gap-4 px-2 mb-2 overflow-y-auto">
            {[
              { title: "The Garden Adventure", img: "/images/garden-background.webp" },
              { title: "Walk in the Forest", img: "/images/forest-background.jpg" },
              { title: "Under the sea", img: "/images/ocean-background.png" },
              { title: "Space Adventure", img: "/images/space-background.svg" }
            ].map((story) => (
              <button
                key={story.title}
                className="bg-white rounded-xl shadow-md border-2 border-gray-200 overflow-hidden
                          hover:border-teal-300 active:scale-95 transition-all flex flex-col h-full"
                onClick={() => handleStoryClick(story.title)}
              >
                <img
                  src={story.img}
                  alt={story.title}
                  className="w-full h-32 object-cover"
                />
                <span className="text-lg font-medium text-gray-800 p-3">
                  {story.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

     {/* Step 2: Player Count */}
      {currentStep === 2 && (
        <div className="w-full flex-grow flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-gray-700 text-center mb-3">How Many Friends Are Playing?</h2>
          
          {/* Fixed-width buttons container */}
          <div className="flex flex-col gap-1 w-[300px] mb-1"> {/* Fixed width */}
            {[2, 3, 4].map((num) => (
              <button
                key={num}
                className="bg-white rounded-xl shadow-md border-2 border-gray-200 p-4
                          hover:border-teal-300 active:scale-95 transition-all
                          h-[110px] w-full" /* Fixed height, full width of container */
                onClick={() => handlePlayerClick(num)}
                onMouseEnter={() => handleOnMouseEnter(num + " Players")}
              >
                <div className="flex justify-center gap-2 mb-2">
                  {[...Array(num)].map((_, index) => (
                    <span key={index} className="text-2xl">😊</span>
                  ))}
                </div>
                <span className="text-xl font-medium text-gray-800">
                  {num} Players
                </span>
              </button>
            ))}
          </div>
          
          {/* Compact Back Button */}
          <button
            className="back-step-button"
            onClick={() => goBack("Go Back")}
            onMouseEnter={() => handleOnMouseEnter("Go Back")}
          >
            ← Go Back
          </button>
        </div>
      )}

      {/* Step 3: Difficulty */}
      {currentStep === 3 && (
        <div className="w-full max-w-4xl flex-grow flex flex-col">
          <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">Pick Game Difficulty</h2>
          
          <div className="grid grid-cols-1 gap-4 px-4 mb-4">
            <button
              className={`rounded-xl shadow-md border-2 p-4 text-xl font-medium
                        transition-all ${difficultyLevel === "Easy" ? 
                          'bg-teal-100 border-teal-400' : 
                          'bg-white border-gray-200 hover:border-teal-300'}`}
              onClick={() => handleDifficultyClick("Easy")}
              onMouseEnter={() => {
                setTooltip("Easy mode: 4 sentences");
                handleOnMouseEnter("Easy mode: 4 sentences");
              }}
              onMouseLeave={() => setTooltip(null)}
            >
              Easy
              {tooltip === "Easy mode: 4 sentences" && (
                <span className="block text-sm font-normal mt-1 text-gray-600">
                  Easy mode: 4 sentences
                </span>
              )}
            </button>

            <button
              className={`rounded-xl shadow-md border-2 p-4 text-xl font-medium
                        transition-all ${difficultyLevel === "Medium" ? 
                          'bg-teal-100 border-teal-400' : 
                          'bg-white border-gray-200 hover:border-teal-300'}`}
              onClick={() => handleDifficultyClick("Medium")}
              onMouseEnter={() => {
                setTooltip("Medium mode: 8 sentences");
                handleOnMouseEnter("Medium mode: 8 sentences");
              }}
              onMouseLeave={() => setTooltip(null)}
            >
              Medium
              {tooltip === "Medium mode: 8 sentences" && (
                <span className="block text-sm font-normal mt-1 text-gray-600">
                  Medium mode: 8 sentences
                </span>
              )}
            </button>

            <button
              className={`rounded-xl shadow-md border-2 p-4 text-xl font-medium
                        transition-all ${difficultyLevel === "Hard" ? 
                          'bg-teal-100 border-teal-400' : 
                          'bg-white border-gray-200 hover:border-teal-300'}`}
              onClick={() => handleDifficultyClick("Hard")}
              onMouseEnter={() => {
                setTooltip("Hard mode: 12 sentences");
                handleOnMouseEnter("Hard mode: 12 sentences");
              }}
              onMouseLeave={() => setTooltip(null)}
            >
              Hard
              {tooltip === "Hard mode: 12 sentences" && (
                <span className="block text-sm font-normal mt-1 text-gray-600">
                  Hard mode: 12 sentences
                </span>
              )}
            </button>
          </div>
          
          <button
            className="mt-4 text-gray-600 hover:text-gray-800 font-medium"
            onClick={() => goBack("Go Back")}
            onMouseEnter={() => handleOnMouseEnter("Go Back")}
          >
            ← Go Back
          </button>
        </div>
      )}

      {/* Step 4: Review */}
      {currentStep === 4 && (
        <div className="w-full max-w-4xl flex-grow flex flex-col">
          <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">Ready to Play!</h2>
          
          <div className="bg-white rounded-xl shadow-inner p-6 mb-6">
            <div className="mb-3">
              <span className="font-semibold text-gray-700">Story: </span>
              <span className="text-gray-600">{selectedStory}</span>
            </div>
            <div className="mb-3">
              <span className="font-semibold text-gray-700">Players: </span>
              <span className="text-gray-600">{numPlayers}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Level: </span>
              <span className="text-gray-600">{difficultyLevel}</span>
            </div>
          </div>
          
          <div className="flex flex-col gap-3">
            <button 
              className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-4 px-6 rounded-xl text-xl
                        flex items-center justify-center gap-2 transition-colors"
              onClick={handleCreateRoom}
              onMouseEnter={() => handleOnMouseEnter("Start Adventure!")}
            >
              🎮 Start Adventure!
            </button>
            <button
              className="mt-4 text-gray-600 hover:text-gray-800 font-medium bg-gray-200 hover:bg-gray-300 py-2 rounded-lg"
              onClick={() => goBack("Change Something")}
              onMouseEnter={() => handleOnMouseEnter("Change Something")}
            >
              ← Change Something
            </button>
          </div>
        </div>
      )}

     
    </div>
  </div>
);
}