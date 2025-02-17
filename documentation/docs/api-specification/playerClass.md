# Player Class

## Overview
The `Player` class represents a participant in the game. Each player has a unique identifier, a name, and a role (either `player` or `host`).

## Class Definition

### `Player`
Represents a game player with an ID, name, and role.

#### Properties

- **`id: string`**
  - A unique identifier for the player.

- **`name: string`**
  - The name of the player.

- **`role: "player" | "host"`**
  - Defines the player's role in the game. Defaults to `"player"`.

#### Constructor

- **`constructor(id: string, name: string)`**
  - Initializes a new player instance with a unique ID and name.
  - Sets the default role to `"player"`.
  
  **Parameters:**
  - `id: string` - The unique ID assigned to the player.
  - `name: string` - The name of the player.

#### Methods

- **`setRole(role: "player" | "host"): void`**
  - Updates the player's role.
  
  **Parameters:**
  - `role: "player" | "host"` - The new role to be assigned.

  **Returns:**
  - `void`



## Usage Example

```typescript
const player1 = new Player("123", "Alice");
console.log(player1.role); // Output: "player"

player1.setRole("host");
console.log(player1.role); // Output: "host"
```

## Future Enhancements
- Additional roles (e.g., `spectator`, `moderator`).
- Methods for player actions, such as sending messages or tracking scores.
- Integration with a game session system for better management.

