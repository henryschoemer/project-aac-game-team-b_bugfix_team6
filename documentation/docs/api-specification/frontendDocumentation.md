---
sidebar_position: 2
---
# Frontend API Documentation
Documentation for the frontend classes in Story Quest.

## 1.1 Player Class
**Description:** The `Player` class represents a participant in the game. Each player has a unique identifier, a name, and a role (either `player` or `host`).

#### Data fields:
- **`id: String`**
  - A unique identifier for the player.

- **`name: String`**
  - The name of the player.

- **`role: "player" | "host"`**
  - Defines the player's role in the game. Defaults to `"player"`.

#### Methods:
- **`setRole(role: "player" | "host"): void`**
  - Updates the player's role.
  
  **Parameters:**
  - `role: "player" | "host"` - The new role to be assigned.

  **Returns:**
  - `void`

### Usage Example

```typescript
const player1 = new Player("123", "Alice");
console.log(player1.role); // Output: "player"

player1.setRole("host");
console.log(player1.role); // Output: "host"
```

### Future Enhancements
- Additional roles (e.g., `spectator`, `moderator`).
- Methods for player actions, such as sending messages or tracking scores.
- Integration with a game session system for better management.

## 1.2 StartPage Class 
**Description:** Provides UI for players to host or join a game.

#### Methods:
- **`joinGame(int gameID): void`** **: Navigates user to existing game room lobby using the unique game ID.**
  - **Parameters:**
    - **`int: gameID`**: the game ID number of the game the player wants to join.
  - **Returns: `void`**
  - **Pre-Condition:** User enters a valid game ID.
  - **Post-Condition:** User is directed to **`PlayerPage`** class and is connected to the game session.
  - **Exceptions:** Invalid/expired game ID.
    
- **`hostGame(): int gameID`** **: Creates a new game session.**
  - **Returns: `gameID`**
  - **Pre-Condition:** User clicks "Host" button.
  - **Post-Condition:** A new **`gameID`** is created and the user is directed to **`HostPage`**.
  - **Exception:** Room creation failure on backend.

## 1.3 HostPage Class
**Description:** Allows the user to configure the room settings.

#### Data fields:
- **`story : String`** : The story chosen by the hsot.
- **`difficulty : int`** : The game difficulty level.
- **`numPlayers : int`** : The number of players allowed in the game session.

#### Methods:
- **`selectStory() : String story`** : **Allows the host to choose a story.**
  - **Returns: `story`**
  - **Post-Condition:** The chosen story is stored.
    
- **`selectDifficulty() : int difficulty`** : **Allows the host to choose game difficulty.**
  - **Returns: `difficulty`**
  - **Post-Condition:** The chosen difficulty is stored.
    
- **`selectNumPlayers() : int numPlayers`** : **Allows host to select number of players for game session.**
  - **Returns: `numPlayers`**
  - **Post-Condition:** Player count is stored.
    
- **`startGameRoom() : void`** : **Initiates game room.**
  - **Returns: `void`**
  - **Pre-Condition:** All game settings are chosen.
  - **Post-Condition:** Game room is created.
 
## 1.4 PlayerPage Class
**Description:** Handles player session management.

#### Data fields:
- **`players : Player[]`** : A list of all players in the session.
- **`allPlayersJoined : boolean`** : True when all players have joined.

#### Methods:
- **`startGame() : void` : Begins the turn-taking story session.**
  - **Returns: `void`**
  - **Pre-Condition:** All players present.
  - **Exception:** Player connection lost.

## 1.5 AACBoard Class
**Description:** Displays an interactive AAC board for users to select words for the story.

#### Data fields:
- **`pictograms : String[]`** : List of available pictograms.

#### Methods:
- **`fetchPictograms(String query) : String[]` : Retrieves pictograms based on specific category.**
  - **Parameters:**
    - **`String : query`** : The query of the category the player has chosen.
  - **Returns: `String[]`**
  - **Post-Condition:** Pictograms are loaded in.
    
- **`onSelect(String imgUrl) : void` : Displays the word of the pictogram selected by player in the blank space.**
  - **Parameters:**
    - **`String : imgUrl`** : The image URL of the pictogram.
  - **Returns: `void`**
  - **Pre-Condition:** Player clicks on a pictogram.
  - **Post-Condition:** Invalid selection.

## 1.6 GameContainer Class
**Description:** Manages game turns and story progression.

#### Data fields:
- **`selectedWords : String[]`** : Words chosen from the AAC tablet by players.

#### Methods:
- **`updateTurn() : void` : Advances to the player whose turn is next.**
  - **Returns: `void`**
  - **Pre-Condition:** Previous turn is completed.
  - **Exception:** Player connection lost.

- **`handleSelect(String[] imgUrl) : void` : Handles selected words from AAC board and updates story.**
  - **Parameters:**
    - **`String[] imgUrl`** : Image URL of AAC board selection.
  - **Returns: `void`**
  - **Pre-Condition:** Player picks a word/key.
  - **Post-Condition:** Word is saved and story is updated.

## 1.7 QuestionDisplay Class
**Description:** Displays the cloze phrase sentence for the user to fill in the blanks.

#### Data fields:
- **`phrase : String[]`** : The cloze phrase presented.
- **`playerAnswer : String`** : The word/key selected by the current player.
- **`numBlanks : int`** : The number of blanks in the current phrase.

#### Methods: 
- **`fillPhraseFromPlayerAnswer() : void` : Updates phrase with player answer.**
  - **Returns: `void`**
  - **Pre-Condition:** Player selects a word/key.
  - **Exception:** Invalid word.
    
- **`submit() : void` : submits the word to Firebase.**
  - **Returns: `void`**
  - **Post-Condition:** Word is recorded.
  - **Exception:** Database error.

