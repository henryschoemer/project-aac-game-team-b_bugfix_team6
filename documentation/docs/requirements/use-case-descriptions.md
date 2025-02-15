---
sidebar_position: 5
---

# Use-case descriptions

## Use Case 1: Room Management - Setting up a new room

### User wants to start a new game room

1. User opens the game on a device
2. User clicks the "Create a Game Room" button
3. User selects a story type
4. User selects a grade level
5. User selects the number of players
6. User clicks the "Start" button

## Use Case 2: Player Customization - New player profile

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




    User -> D: looks at screen 
    D ->+ GR: User1 decided to join a game and enters token
    GR ->+ Database: fetches token for validation
    Database -->- GR: Return Token
```    


### User wants to join the game the host has made

1. User clicks on the "Join Game" button
2. User inputs the code displayed on the host's screen into the input box
3. User inputs the correct code and is brought to a lobby with all the other players who are participating in the game session

## Use Case 4: Accessibility & AAC

### Users utilize a built-in AAC keyboard regardless of their usual mode of communication
1. User joins a room.
2. User is notified that a keyboard layout will be available on their screen during gameplay
3. User is given a short tutorial on the AAC keyboard.
4. User click a button to indicate readiness to "Start" the game.

## Game Mechanics 

## Use Case 5: Wrong answer
```mermaid
sequenceDiagram 
    actor User
    participant D as Device
    participant GR as Game Screen
    participant Database




    User ->> D: looks at screen 
    D ->>+ GR: User is given a cloze phrase question
    GR ->>+ Database: fetches cloze phrase question and answer choices
    Database -->>- GR: Return cloze phrase question and answer choices
    GR -->>- D: returns cloze phrase question answer

    D ->>+ GR: User chooses cloze phrase questions answer 
    GR -->>+ D: User is notified that their answer is wrong
    loop Until correct answer is given
        D->>GR :Enters answer
        GR-->>D: Incorrect, try again
    end
```    

### User guesses an incorrect answer

1. User is in a game session using their device
2. User is prompted with a storyline containing a cloze pharse question
3. User types or says a word that is an incorrect answer
4. User clicks the "Confirm" button
5. User is notified that their answer was incorrect and is prompted to try again
6. User is prompted with the same storyline

## Use Case 6: Correct answer



```mermaid
sequenceDiagram 
    actor User
    participant D as Device
    participant GR as Game Screen
    participant Database




    User ->> D: looks at screen 
    D ->>+ GR: User is given a cloze phrase question
    GR ->>+ Database: fetches cloze phrase question and answer choices
    Database -->>- GR: Return cloze phrase question and answer choices
    GR -->>- D: returns cloze phrase question answer

    D ->>+ GR: User chooses cloze phrase questions answer 
    GR -->>+ D: User is notified that their answer is correct and that is it the next players turn    
```


### User guesses a correct answer

1. User is in a game session using their device
2. User is prompted with a storyline containing a cloze phrase question
3. User types or says a word that is the correct answer
4. User clicks the "Confirm" button
5. User is notified that their answer was correct
6. User is notified that its next player's name turn and waits

## Use Case 7: Retry Mechanism


```mermaid
sequenceDiagram 
    actor User
    participant D as Device
    participant GR as Game Screen
    participant Database

     User ->> D: looks at screen 
     D ->>+ GR: User chooses cloze phrase questions answer 
    GR -->>+ D: User is notified that their answer is wrong
    loop Until correct answer is given
        D->>GR :Enters answer
        GR-->>D: Incorrect, try again
    end


``` 

### User wants to retry the question because they got it wrong 

1. User has selected the wrong answer to the question
2. User receives feedback explaining why their answer was incorrect
3. User clicks a "Retry" button
4. User is given the same question again with the same answer choices 
