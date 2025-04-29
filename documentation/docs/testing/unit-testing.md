---
sidebar_position: 1
---
# Unit Tests
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
The room creation testing ensures that a user is able to initiate settings to accommodate the game room, such as choosing a story, the number of players, and the difficulty level. 
Unit tests for Room Creation are located in `StoryQuest/app/CreateRoom/__tests__/completionPage.test.tsx`.

### `renders the CreateRoomPage component`
This test checks that the component renders properly, ensuring that all setting choices are displayed on the screen. 

### `displays alert when user does not select all settings`
This test is to ensure that a user cannot create a room without choosing all the settings. For example, if a difficulty is not chosen, an alert is displayed to notify the user.

### `logs correct data when all selections are made`
This test checks to see that all the data is logged correctly after the user makes their selections.

### `allows user to change selected story`
This test is to ensure that a user is able to select a different setting than their primary choice and have it still rendered on screen.

## Components
The component testing ensures that each component contained within the webapp exhibits the expected behavior.

## AACKeyBoard Component

Unit tests for AACKeyBoard are located in `StoryQuest/app/Components/__tests__/AACKeyBoard.test.tsx`.

### `renders correctly with default props`
This test verified that basic rendering, with default properties happens. This included checking that all symbols are displayed as buttons
and confirming the presence of the "AAC Keyboard" title.

### `applies custom background and button colors`
This test checks the custom styling props, verifying the container background and button colors are correct.

### `renders images with correct alt text`
This test validates image rendering by checking image sources and alternate text.  For example, each image should exist.

### `has proper accessibility attributes`
This test verifies accessibility features, making sure each symbol button on the AAC board has an aria-label.

### `renders correct grid layout`
This test verifies layout structure and checks the CSS grid implementation.

### `handles empty symbols array gracefully`
This test checks for edge cases, when the array gives the board no symbols, and verifies that empty state is handled 
correctly and cleanly.

## Camera Component

Unit tests for the Camera component are located in `StoryQuest/app/Componnents/__tests__/Camera.test.tsx`.

### `renders camera component`
This test checks for basic rendering and verifies that the capture button is present on screen.

### `attempts to start camera on mount`
This test tries camera initialization, verifying media constraints and checking video play capability in the process.

### `falls back to front camera if back camera fails`
This test ensures that if the default behavior (back camera) can not be achieved, the error is handled and we fallback to 
secondary behavior (front camera), while maintaining resolution.

### `shows error message when camera access fails`
This test checks error state UI and verifies the existences of the retry button

### `handles capture button click`
This test runs photo capture and verifies canvas operations by checking the image callback

### `scans for QR codes when camera is active`
This test is for QR detection. It verifies the jsQR integration and checks the callback with the results


## Test coverage report:
npx jest --coverage: This generates the coverage report that showcases even how many lines of code are being tested.

