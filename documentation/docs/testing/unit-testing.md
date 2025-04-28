---
sidebar_position: 1
---
# Unit tests
(For each method, there are one or more test cases. A test case consists of input parameter values and expected results. 
All external classes should be stubbed using mock objects.)

# Purpose
The Test Procedures describe the test approach and the tests to be performed to verify the requirements 
specified in the Requirements Document.

# Library Explanation
We chose Jest along with the React Testing Library.

## Jest
- **Primary Testing Framework**
- Selected because:
    - Code coverage reporting
    - Mocking ability
    - Perfect integration with React and Next.js

## React Testing Library
- **UI Testing Utility**
- Selected because:
    - Simulates user testing

## Setup
1. Required Dependencies
   ```json
   {
     "jest": "^27.0.0",
     "@testing-library/react": "^12.0.0",
     "@testing-library/jest-dom": "^5.0.0"
   }
   ```

2. Running Tests
   ```bash
   # Run all tests
   npm test
   
   # Run with coverage
   npm test -- --coverage
   
   # Run specific test file
   npm test -- completionPage.test.tsx
   ```

## Test Structure
```typescript
describe('Component/Method Name', () => {
  beforeEach(() => {
    // Setup code
  });

  it('should do something specific', () => {
    // Arrange
    // Act
    // Assert
  });
});
```



## Test Cases and Implementation
Unit tests for GamePlay are located in `StoryQuest/app/Gameplay/__tests__/completionPage.test.tsx`.
## Gameplay Testing

Here are the key test cases:
### `handleWordSelect()`
This method processes word selections and is tested through both direct word selection and AAC interface. The 
test `handles word selection through AAC keyboard` demonstrates this by clicking the "mouse" button and 
verifying the phrase updates from "Look in the garden, there is a ___" to include "mouse". Error handling is 
verified through the `handles invalid word selection gracefully` test.

### `handleAddImage()`
This method manages image rendering and positioning, tested through the `displays images when words are 
selected` test. It verifies both image presence and correct positioning after word 
selection, specifically checking for proper rendering of 'mouse.svg' and other story images.

### `handleAACSelect()`
This method handles AAC interface interactions, tested extensively in `handles word selection through AAC 
keyboard`. It verifies proper button functionality and includes error 
handling as shown in the invalid word selection test.

### `renders without crashing`
This test ensures basic component rendering functionality. It verifies the presence of the "Select Story:" 
text, demonstrating proper initial component mounting. No mocks are needed for this basic rendering test.

### `initializes with the first story`
This test verifies proper initialization state. It checks for the default story's first phrase "Look in the 
garden, there is a ___", ensuring the story data is properly loaded and displayed on component mount.

### `handles word selection through AAC keyboard`
This test verifies the complete word selection flow. It simulates AAC button clicks and verifies phrase 
updates, demonstrating integration between the AAC interface and phrase display.

### `displays images when words are selected`
This test ensures proper image handling. It verifies both image rendering and positioning after word 
selection, checking specific CSS properties and image presence in the DOM.

### `plays sound when a valid AAC word is selected`
This test ensures proper sound output. It verifies that when an icon on the AAC board is clicked, 
the correct phrase is being played aloud to the user by checking the return value of the sound sprite. This 
ensures engagement via text and audio. 

### `shows "The End!" when all sections are completed`
This test verifies game completion logic. It simulates completing story sections and checks for the appearance 
of the completion message, demonstrating proper game flow handling.

### `handles invalid word selection gracefully`
This test verifies error handling. It uses a Jest spy on window.alert to verify proper error messaging when 
invalid words are selected, demonstrating robust error handling in the AAC interface.

## HomePage
Unit tests for HomePage are located in 'StoryQuest/app/__tests__/completionPage.test.tsx'

### `renders the text of the animated title correctly`
This test verifies that animated title is rendered properly. It checks that the rendered span text matches the
string characters of ['S', 't', 'o', 'r', 'y', 'Q', 'u', 'e', 's', 't'].

### `renders the copyright text correctly`
This test verifies that the copyright text in the footer is rendered correctly. It checks that the correct text, 
'Copyright © 2025 StoryQuest', is displayed on the page.

### `renders profile button correctly`
This test checks that the profile button is rendered correctly. It ensures that the button is rendered on the page and 
has the correct text content, 'Profile'.

### `renders create button correctly`
This test ensures the create button is displayed correctly. It verifies that the button is rendered on the page and
contains the text 'Create'.

### `renders join button correctly`
This test ensures the join button is displayed correctly. It confirms that the button is rendered on the page and
has the text 'Join'.

### `renders gameplay button correctly`
This test ensures the gameplay button is displayed correctly. It checks that the button is rendered on the page and
contains the text 'Gameplay'.


## Room Creation Testing
The room creation testing ensures that a user is able to initiate settings to accomodate the game room, such as choosing a story, the number of players, and the difficulty level. 
Unit tests for Room Creation are located in `StoryQuest/app/CreateRoom/__tests__/completionPage.test.tsx`.

### `renders the CreateRoomPage component`
This test checks that the component renders properly, ensuring that all setting choices are displayed on the screen. 

### `displays alert when user does not select all settings`
This test is to ensure that a user cannot create a room without choosing all the settings. For example, if a difficulty is not chosen, an alert is displayed to notify the user.

### `logs correct data when all selections are made`
This test checks to see that all the data is logged correctly after the user makes their selections.

### `allows user to change selected story`
This test is to ensure that a user is able to select a different setting than their primary choice and have it still rendered on screen.


## Test coverage report:
npx jest --coverage: This generates the coverage report that showcases even how many lines of code are being tested.

