---
sidebar_position: 2
---

# System Block Diagram

![System Block Diagram](/img/system-block-diagram_2_8_25.png)
*Figure 1: System block diagram showcasing interaction between users, frontend, and backend.*


## Description of Gameplay/Flow

This system block diagram depicts the high-level design of the StoryQuest: Teamwork Prevails! web application. This is a story-based quiz game
in which users must fill in the blanks according to pictures on the screen, made to enhance communication and collaboration among school age children
who use AAC and school age children who do not. Users can open the web application for our game and either 'Host' or 'Join' a game. Our frontend will contain the 'Host' mode and the
'Player' mode. Within the 'Player' mode, the game will display questions, and utilizes a built-in AAC tablet on which a Player answers. Once a Player has chosen an answer, the choice
is sent to the backend to be verified. Answers are sent directly to a database for validation, and once validated, the database sends a response back (Correct/Incorrect) to the frontend to be displayed.


## Selecting Technology & Cost Considerations

### Frontend / Client-side
For the frontend we are considering a Next.js framework, hosted on Vercel, under the "Hobby" plan. Next.js is
an open-source framework, and entirely free to use. Vercel is free to use under the 'Hobby' plan, and $20/month under the 'Pro' plan. We plan to start on the 'Hobby' level, and bump to 'Pro'
dependent on client-driven scaling. For styling the UI, we are mainly considering TailwindCSS, with the possible addition of ShadCN or MotionLibrary for additional animations. Each of these libraries is
completely free and open-source.

### Backend / Server-Side

For the backend we are considering Convex, an open-source reactive database. It is free under the 'Starter' plan, and $25/month under the 'Professional' plan. As the limits placed on the 'Starter'
plan are quite large, we do not envision switching to a professional plan during the course of this project. We are also considering Firebase, to further smooth communication between the frontend/backend
and host both the app and database. Firebase is mainly a free service, but on the 'Blaze' plan it is Pay-As-You-Go. Firebase has free cloud hosting for up to 10 GB (about 5000 static pages), free database
usage for up to 2 GB (about 40 M chat messages), and free cloud storage for up to 5 GB (up to 2500 high-res photos). We believe that StoryQuest will be well below the limits of the Firebase pricing plan, as we mainly plan
to store correct answers, storylines, and small images. If client-driven scaling requires more of the app, we can reassess. 

 
