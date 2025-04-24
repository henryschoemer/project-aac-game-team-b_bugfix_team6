---
sidebar_position: 1
---

**Purpose**

The front-end client is built with React and Next.js, while the back-end leverages Firebase for real-time database synchronization, authentication, and 
accessible experience for AAC users, incorporating symbol-based communication and text-to-speech capabilities. 


## Components Description
### Client (Front-End)
The client is a React application built with Next.js framework, offering server-side rendering for improved performance and SEO. It provides the user interface that students interact with, including AAC features, story navigation, and room management.

**Technologies Used:**
- React (UI components)
- Next.js (Routing and server-side rendering)
- Tailwind CSS (Responsive and accessible styling)
- Framer Motion (Smooth animations for kids)
- TypeScript (Ease of use in JavaScript)

**Responsibilities:**
- Display the homepage with options to create a profile, create, or join a room.
- Render stories and cloze-phrase questions
- Handle AAC interactions (symbol grids, text-to-speech)
- Communicate with Firebase for real-time updates and authentication
- Provide responsive design for tablets and desktops

**Interface:**
- Firebase SDK: The client uses the Firebase JavaScript SDK for real-time communication with the back-end.
- AAC Symbol Library (ARASAAC): Provides visual symbols for communication

### Server (Back-End)
The back-end services are managed by Firebase, which provides real-time database capabilities, authentication, and cloud functions for game logic. 
This architecture minimizes server management overhead while offering scalability and performance.

**Technologies Used:**
- Firebase Authentication: For secure room joining and session management.
- Firebase Firestore: A NoSQL real-time database to store game data, room information, and group progress.
- Firebase Cloud Functions: To handle server-side logic like validating game answers and managing game state.

**Responsibilities:**
- Manage session tokens.
- Handle real-time game state updates across all players.
- Store and retrieve stories, game progress, and player data.
- Execute server-side logic for game validation

**Interfaces:**
- Client Requests: The client interacts with the server via Firebase SDK calls, which handle real-time data synchronization.
- Cloud Functions Triggers: Automatically execute server-side logic when certain conditions are met (like when a new answer is submitted)

### Class Diagrams
```mermaid 
classDiagram
    class Home {
        +CreateButton
        +JoinButton
        +HomePageBackgroundMusic
    }

    class CreateRoomPage {
        +selectedStory
        +numPlayers
        +difficultyLevel
        +createRoom()
    }

    class JoinRoomPage {
        +roomId
        +handleCapturedImage()
        +processQRCode()
        +handleJoinRoom()
    }

    class CompletionPage {
        +displayCompletion()
        +playCompletionSound()
    }

    class AACKeyboard {
        +onSelect(word)
        +symbols[]
        +backgroundColor
        +buttonColor
        +blockButtons
    }

    class Camera {
        +videoRef
        +canvasRef
        +startCamera()
        +captureAndScanFrame()
    }

    class CompletedStory {
        +index
        +completedPhrases[]
        +onComplete()
        +roomId
        +handlePhraseComplete()
    }

    class TextToSpeechTextOnly {
        +text
        +onComplete()
        +speakText()
    }

    class TextToSpeechAACButtons {
        +text
        +onSpeechEnd()
        +playSpeech()
        +stopSpeech()
    }

    class useButtonFeedback {
        +buttonHandler()
        +isSpeaking
    }

    class useQuickTextToSpeech {
        +speak(text)
        +stop()
        +isReady
    }

    class useTextToSpeech {
        +speak(text)
        +stop()
        +isReady
    }

    class useAACSounds {
        +playSound(word)
    }

    %% Relationships
    Home --> CreateRoomPage
    Home --> JoinRoomPage

    CreateRoomPage --> useButtonFeedback
    CreateRoomPage --> useQuickTextToSpeech

    JoinRoomPage --> Camera
    JoinRoomPage --> useButtonFeedback
    JoinRoomPage --> useQuickTextToSpeech

    CompletionPage --> CompletedStory
    CompletionPage --> useButtonFeedback

    CompletedStory --> TextToSpeechTextOnly

    AACKeyboard --> useAACSounds
    AACKeyboard --> useButtonFeedback

    TextToSpeechAACButtons --> useQuickTextToSpeech
    TextToSpeechAACButtons --> useTextToSpeech

    TextToSpeechTextOnly --> useTextToSpeech

```
*Figure 1: Class diagram showing interactions between classes within StoryQuest*

This class diagram shows the relationship between different components in the StoryQuest system.


#### Room Management
The system has a StartPage, HostPage, and a PlayerPage, all of which handle room
management and game setup.

This section outlines the core frontend pages involved in the multiplayer room lifecycle, from game setup to lobby management and game start. Each page interacts with Firestore and Firebase Cloud Functions to manage real-time multiplayer sessions.

HomePage
The HomePage is the landing interface for users when they first open the application. It offers two primary options:
- joinRoom(): Allows a player to join an existing game session via a QR code or room ID. Validates the room ID and redirects the player to the Gameplay page,
- createRoom(): Initiates the process of creating a new game room. Redirects the user to the CreateRoom flow for configuration.

CreateRoom
The CreateRoom flow provides game setup tools for the host, allowing them to define the session settings before inviting players.
- selectStory(): Lets the host choose a story template from a predefined library. This determines the narrative flow of the game.
- selectDifficulty(): Sets the difficulty level of the game (e.g., "easy", "medium", "hard"), impacting pacing or challenge level.
- selectNumPlayers(): Specifies the maximum number of players allowed in the game room (up to 4).
- startGameRoom(): Finalizes the configuration, creates the room document in Firestore, and transitions the host to the gameplay session.

#### Game Flow Summary

1. The host sets up the game in CreateRoom.
2. Players join a room via JoinRoom on the HomePage.
3. Players wait on a screen on the Gameplay page until the game starts.
4. The game begins on the right panel of Gameplay, displaying a phrase with blanks to fill alongside a background and images.
5. Players take turns selecting answers from the AACBoard on the left panel of Gameplay.
6. The selected word is displayed on the bottom of the right panel of the Gameplay page and sent to the Firestore. 
7. The game continues turn-by-turn until the story is complete.

### Database
**Users:**
- userId (PK): Unique identifier
- name: Player's name
- preferences: AAC settings, favorite symbols

**Rooms:**
- roomId (PK): Unique code for room access
- hostId (FK from the Users table): The player who created the room
- players: List of players in the room
- currentTurn (FK from the users table): Tracks whose turn it is
- storyProgress: Current state of the story

**Stories:**
- storyId (PK): Unique ID
- gradeLevel: Target grade level (3 grade max)
- content: Story text with blanks

**Responsibilities:**
- Persist user data and game state
- Support real-time synchronization of game progress
- Allow dynamic story loading and AAC customization

**Interfaces:**
- Firebase Firestore SDK: Used by both client and server to read/write data in real-time
- Cloud Functions: Perform automated updates (like saving game progress)

### Database Design
Here is the database section with an Entity-Relationship Diagram (ERD) and a table design for StoryQuest. 
Since we are using FireBase Firestore, which is a NoSQL database, the structure will be document-based, 
but we can still represent it in a relational style for clarity.

Entities and Relationships:

- User represents a player. 
- A Room is hosted by One user but can have multiple users (as in players). 
- A room is then associated with one story. 
- Each user in a room has a corresponding playerProgress.

**Entity-Relationship Diagram**

```mermaid
erDiagram
    USER {
        string userId PK
        string name
        string email
        json preferences
        timestamp createdAt
    }

    ROOM {
        string roomId PK
        string hostId FK
        string storyId FK
        number gradeLevel
        number numPlayers
        string currentTurn FK
        boolean isActive
        timestamp createdAt
    }

    STORY {
        string storyId PK
        string title
        array content
        number gradeLevel
        timestamp createdAt
    }

    ROOM_PLAYERS {
        string roomId FK
        string userId FK
        string name
        timestamp joinedAt
    }

    USER ||--o{ ROOM_PLAYERS : "joins"
    ROOM ||--o{ ROOM_PLAYERS : "has"
    ROOM ||--|{ STORY : "uses"
    STORY ||--o{ ROOM : "is played in"
```
*Figure 2: An entity-relationship diagram showing interactions within the database*

**Table Design**

Here is how the data would be structured in Firestore. Though Firestore is a NoSQL database, this relational layout helps clarify the relationships.

**Users Collection Figure 3**
| Field | Type | Description |
| ----- | ---- | ----------- |
| userId (PK)| String | Unique Id (Firebase Auth UID) |
| name | String | Player's display name |
| preferences | Map | AAC preferences |
| createdAt | Timestamp | Account creation date |

**Rooms Collections Figure 4**
| Field | Type | Description |
| ----- | ---- | ----------- |
| roomId (PK)| String | Unique code for room access |
| hostId | String | User ID of the room host |
| storyId | String | ID of selected story |
| difficulty | Number | Difficulty level selected for the room |
| numPlayers | Number | Number of players (1-4) |
| currentTurn | String | User Id of player whose turn it is |
| createdAt | Timestamp | Room creation date |
| isActive | Boolean | Indicates if the game is in progress | 

**RoomPlayers Subcollection (within rooms) Figure 5**
| Field | Type | Description |
| ----- | ---- | ----------- |
| userId (PK)| String | User Id of the player |
| name | String | Player's display name |
| joinedAt | Timestamp | Time when the players joined the room |

**Stories Collections Figure 6**
| Field | Type | Description |
| ----- | ---- | ----------- |
| storyId (PK)| String | Unique id for the story |
| title | String | Title of the story |
| content | Array | Story text with blanks marked |
| difficulty | Number | Intended difficulty level |
| createdAt | Timestamp | Date when the story was added |

**PlayerProgress Subcollection (within Rooms) Figure 7**
| Field | Type | Description |
| ----- | ---- | ----------- |
| userId (PK)| String | User Id of the player |
| answers | Array | List of the answers submitted by the player |
| correctAnswers | Number | Total correct answers by the player |
| attempts | Number | Total attempts made |
| lastActive | Timestamp | Last time the player interacted |




