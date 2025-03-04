---
sidebar_position: 2
---

# System Block Diagram

![System Block Diagram](/img/system-block-diagram-2_8_25.png)
*Figure 1: System block diagram showcasing interaction between users, frontend, and backend.*


## Description of Gameplay/Flow

Figure 1 depicts the high-level design of the StoryQuest: Teamwork Prevails! web application. This is a story making game
in which users must fill in the blanks according to pictures in the word bank. Users can open the web application for our game and either 'Host' or 'Join' a game. Our frontend will contain the 'Host' mode and the
'Player' mode. The 'Player' mode will display questions, and utilizes a built-in AAC tablet for Player answers. Once a Player has chosen an answer, the choice is sent to the backend.


## Technology Requirements

### Frontend / Client-side
The frontend uses a Next.js framework (TypeScript) hosted with Firebase. The UI is styled using TailwindCSS, ShadCN (pre-built UIs), and FramerMotion (smooth animation). The word bank will have appropriate buttons that will look like ARASAAC and CoughDrop, two widely accepted AAC Keyboard variations.

### Backend / Server-Side

The backend uses Firebase for cloud functions and data storage. Firebase cloud functions are used to handle game logic, while a Cloud Firestore NoSQL database securely stores user data and game material (stories and questions). Firebase also facilitates user authentication for joining the room with the correct code. 
