---
sidebar_position: 5
---

# Use-case descriptions

## Use Case 1: Room Management - Setting up a new room

```mermaid
sequenceDiagram
    actor User
    participant D as Device
    participant CR as Create Room Screen
    participant DB as Database

    User ->> D: Looks at screen
    D ->>+ CR: User decides to create a game room
    D ->>+ CR: User sets up game options
    CR ->>+ DB: Save game room setup data
    DB -->> CR: Validate game setup data
    Note right of DB: Generate room code
    DB -->> CR: Return generated room code
    CR -->> D: Display game room code to host
```
### User wants to start a new game room

1. User opens the game on a device
2. User clicks the "Create a Game Room" button
3. User selects a story type
4. User selects a grade level
5. User selects the number of players
6. User clicks the "Start" button


## Use Case 2: Player Customization - New player profile
--> We dont have a feature for this one
```mermaid
sequenceDiagram
    actor User
    participant D as Device
    participant PS as Profile Screen
    participant DB as Database

    User ->> D: Looks at screen
    D ->>+ PS: Enters display name in text field and confirms
    PS ->>+ DB: Validates user ID and saves display name
    DB -->>- PS: Validation success response
    PS -->> D: User is brought to a waiting screen
```

### User wants to set up a new player profile and interaction mode

1. User successfully joins a game room
2. User enters their display name in an input field
3. User clicks a "Done" button

## Use Case 3: Room Management - Player Joins a Game through the Join Screen

```mermaid
sequenceDiagram 
    actor User
    participant D as Device
    participant GR as Game Room Screen
    participant Database




    User ->> D: Looks at screen 
    D ->>+ GR: User decided to join a game and enters token
    GR ->>+ Database: Fetches token for validation
    Database -->>- GR: Return Token
```    

### User wants to join the game the host has made

1. User clicks on the "Join Game" button
2. User inputs the code displayed on the host's screen into the input box
3. User inputs the correct code and is brought to a lobby with all the other players who are participating in the game session

## Use Case 4: Accessibility & AAC
```mermaid
sequenceDiagram 
    actor User
    participant D as Device
    participant GR as Game Room Screen
    participant Database




    User ->> D: Looks at screen 
    D ->>+ GR: User has joined room
    GR -->>+ User: Notified that AAC keyboard layout will be available 
    GR ->>+ Database: Fetches tutorial content
    Database -->>- GR: Return tutorial content
    GR -->>+ User: Gives short tutorial on AAC keyboard 
```

### Users utilize a built-in AAC keyboard
1. User joins a room.
2. User is notified that a keyboard layout will be available on their screen during gameplay
3. User is given a short tutorial on the AAC keyboard.
4. User click a button to indicate readiness to "Start" the game.

## Game Mechanics 

## Use Case 5: Player Chooses an Answer   

### User Chooses and Answer

1. User is in a game session using their device
2. User is prompted with a storyline containing a cloze pharse question
3. User chooses an answer choice
4. User clicks the "Confirm" button
5. User is shown their story come to life
6. User is prompted with another sentence in the story 


