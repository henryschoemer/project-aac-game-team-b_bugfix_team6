"use client";
import React, { useState } from "react";
import Link from 'next/link';
import { BackButton } from "@/app/HomePage/HomePageButtons";
const avatars = [
  "/pics/bunny.jpeg",
  "/pics/coolcat.jpeg",
  "/pics/kuala.jpeg"
];

export default function ProfilePage() {
  const [selectedAvatar, setSelectedAvatar] = useState<string>(avatars[0]);
  const [name, setName] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [level, setLevel] = useState("");

  const handleSave = () => {
    // TODO: handle saving profile data (API call or local state)
    alert("Profile saved!");
  };

  const handleDelete = () => {
    // TODO: handle profile deletion
    alert("Profile deleted!");
  };

  return (
    <div className="page-container"
      style={{ // This will wrap the whole page in a background
        backgroundImage: "url('HomePage-Images/Background.jpg')",
        backgroundSize: "cover",
      }}>
      <div className="flex flex-col items-center p-4 w-full max-w-md mx-auto">
        {/* Profile Picture */}
        <div className="relative">
          <img
            src={selectedAvatar}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
          />
        </div>

        {/* Avatar Selection */}
        <div className="flex gap-3 mt-4">
          {avatars.map((avatar) => (
            <button
              key={avatar}
              onClick={() => setSelectedAvatar(avatar)}
              className={`w-12 h-12 rounded-full overflow-hidden border-2 ${selectedAvatar === avatar ? "border-blue-400" : "border-transparent"
                }`}
            >
              <img src={avatar} alt="avatar" className="object-cover w-full h-full" />
            </button>
          ))}
        </div>

        {/* Profile Form */}
        <div className="flex flex-col w-full mt-6 space-y-4 bg-white shadow-lg rounded-lg p-6 border border-gray-300"> {/*creates the white card background*/}
        <div className="flex flex-col w-full mt-6 space-y-4">
          {/* Name */}
          <label className="flex flex-col">
            <span
              style={{
                color: "#001e51",
                fontFamily: "'Slackey', sans-serif",
                fontWeight: "bold",
              }}
              className="mb-1"
            >
              Name
            </span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Child's name"
              className="border-b-2 border-gray-300 focus:border-blue-400 outline-none py-1 text-black"
            />
          </label>
          
          {/* Birthday (Month / Year) */}
          <div className="flex items-center gap-4">
            <label className="flex flex-col flex-1">
              <span
                style={{
                  color: "#001e51",
                  fontFamily: "'Slackey', sans-serif",
                  fontWeight: "bold",
                }}
                className="mb-1"
              >
                Month
              </span>
              <input
                type="text"
                value={birthMonth}
                onChange={(e) => setBirthMonth(e.target.value)}
                placeholder="Month"
                className="border-b-2 border-gray-300 focus:border-blue-400 outline-none py-1 text-black"
              />
            </label>
            <label className="flex flex-col flex-1">
              <span
                style={{
                  color: "#001e51",
                  fontFamily: "'Slackey', sans-serif",
                  fontWeight: "bold",
                }}
                className="mb-1"
              >
                Year
              </span>
              <input
                type="text"
                value={birthYear}
                onChange={(e) => setBirthYear(e.target.value)}
                placeholder="Year"
                className="border-b-2 border-gray-300 focus:border-blue-400 outline-none py-1 text-black"
              />
            </label>
          </div>

          {/* Level */}
          <label className="flex flex-col">
            <span
              style={{
                color: "#001e51",
                fontFamily: "'Slackey', sans-serif",
                fontWeight: "bold",
              }}
              className="mb-1"
            >
              Level
            </span>
            <input
              type="text"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              placeholder="Child's level"
              className="border-b-2 border-gray-300 focus:border-blue-400 outline-none py-1 text-black"
            />
          </label>
        </div>
        </div>
        {/* Action Buttons */}
        <div className="flex flex-col w-full mt-8 gap-4">
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
          >
            Delete Profile
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Save
          </button>
        </div>
        <div className="button-padding">
          <div className="button-box">
            <Link href="/">
              <BackButton />
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
}
