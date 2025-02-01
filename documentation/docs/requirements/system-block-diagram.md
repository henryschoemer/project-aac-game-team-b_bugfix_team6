---
sidebar_position: 2
---

# System Block Diagram

[System Block Diagram](documentation/static/img/system_block_diagram.png)

This system block diagram depicts the high-level design of the StoryQuest: Teamwork Prevails! web application. This is a story-based quiz game
in which users must fill in the blanks according to pictures on the screen, made to enhance communication and collaboration among school age children
who use AAC and school age children who do not. Users can open the web application for our game and either 'Host' or 'Join' a game. Our frontend will contain the 'Host' mode and the 
'Player' mode. Within the 'Player' mode, one can choose to use voice recognition for the game, or a built-in AAC tablet. 

The frontend communicates with the backend through Websocket (like Kahoot) to synchronize game position seamlessly. Once users choose
either voice control or a built-in AAC tablet, their answer choices are sent to the backend to be verified. With the AAC tablet option, answers
are sent directly to a database for validation, with voice recognition, they are sent to an outside voice recognition software to be
transcribed, and then sent to the databse for validation. The backend send the results of the validation (Correct/Incorrect) to the frontend to be displayed. 




 