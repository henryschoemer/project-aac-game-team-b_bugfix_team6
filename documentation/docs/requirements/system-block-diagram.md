---
sidebar_position: 2
---

# System Block Diagram

![System Block Diagram](/img/system-block-diagram-2_8_25.png)
*Figure 1: System block diagram showcasing interaction between users, frontend, and backend.*


## Description of Gameplay/Flow

Figure 1 depicts the high-level design of the StoryQuest: Teamwork Prevails! web application. This is a story-based quiz game
in which users must fill in the blanks according to pictures on the screen. Users can open the web application for our game and either 'Host' or 'Join' a game. Our frontend will contain the 'Host' mode and the
'Player' mode. The 'Player' mode will display questions, and utilizes a built-in AAC tablet for Player answers. Once a Player has chosen an answer, the choice
is sent to the backend to be verified. Answers are sent directly to a database for validation, and once validated, the database sends a response back (Correct/Incorrect) to the frontend to be displayed.


## Technology Requirements

### Frontend / Client-side
Accessed through a web browser on any internet connected device, the frontend uses a Next.js framework (TypeScript) hosted with Firebase. The UI is styled using TailwindCSS, ShadCN (pre-built UIs), 
and FramerMotion (smooth animation). The built-in AAC tablet uses ARASAAC, an open-source AAC symbol set and CoughDrop API, an advanced AAC specific API. 

### Backend / Server-Side

The backend uses Firebase for cloud functions (answer validation, smooth communication) and data storage. Firebase cloud functions are used to handle game logic, while a Cloud Firestore NoSQL database, 
securely stores user data and game material (stories and questions). Firebase also facilitates user authentication. 
