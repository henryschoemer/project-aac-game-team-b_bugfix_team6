---
sidebar_position: 3
---

# Backend API Documentation

## 2.1 FirebaseController
**Description:** Handles authentication, room data, and game state management.

#### Methods: 

- `authenticateUser() : void` : **Authenticates user in game session**
  - **Returns:** `void`
  - **Pre-Condition:** User starts game.
  - **Post-Condition:** User is logged in.
  - **Exception:** Authentication failure.

- `getRoomData(int roomID)` : **Retrieves game data from the session.**
  - **Parameters:**
    - `roomID : int` : The ID of the room to retrieve data from.
  - **Returns:** `Object`
  - **Pre-Condition:** The room corresponding to `roomID` exists.
  - **Exception:** Room not found.

- `updateGameState(int roomID , Object data) : void` : **Saves game progress**
  - **Parameters:**
    - `roomID : int` : The ID of the room to save data from.
    - `data : Object` : The current data of the game session.
  - **Returns:** `void`
  - **Pre-Condition:** The room corresponding to `roomID` exists.
  - **Exception:** Firebase failure.
