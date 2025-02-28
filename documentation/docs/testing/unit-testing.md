---
sidebar_position: 1
---
# Unit tests
(For each method, one or more test cases. A test case consists of input parameter values and expected results. All external classes should be stubbed using mock objects.)

## Library Selection - Harpinder
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


## Test Cases and Implementation
Our unit tests are located in `StoryQuest/app/Gameplay/__tests__/page.tsx`. 
Here are the key test cases:

1. **Component Rendering Test**
   ```typescript
   it('renders without crashing', () => {
     render(<Home />);
     expect(screen.getByText(/Select Story:/i)).toBeInTheDocument();
   });
   ```
   - Input: Home component
   - Expected: Component renders with "Select Story" text
   - Mocks: N/A

2. **Story Initialization Test**
   ```typescript
   it('initializes with the first story', () => {
     render(<Home />);
     expect(screen.getByText("Look in the garden, there is a ___")).toBeInTheDocument();
   });
   ```
   - Input: Home component
   - Expected: First story phrase appears
   - Mocks: Story data mocked

3. **AAC Keyboard Interaction Test**
   ```typescript
   it('handles word selection through AAC keyboard', async () => {
     render(<Home />);
     const mouseButton = screen.getByTestId('aac-button-mouse');
     fireEvent.click(mouseButton);
     expect(screen.getByText("Look in the garden, there is a mouse")).toBeInTheDocument();
   });
   ```
   - Input: Mouse button click
   - Expected: Updated phrase with selected word
   - Mocks: AACKeyboard component mocked

4. **Image Display Test**
   ```typescript
   it('displays images when words are selected', () => {
     render(<Home />);
     const mouseButton = screen.getByTestId('aac-button-mouse');
     fireEvent.click(mouseButton);
     const images = document.querySelectorAll('img');
     const mouseImage = Array.from(images).find(img => img.src.includes('mouse.svg'));
     expect(mouseImage).toHaveStyle({ left: '50%', top: '80%' });
   });
   ```
   - Input: Word selection
   - Expected: Correct image placement
   - Mocks: Image data mocked

## Test coverage report:
npx jest --coverage: rn it doesnt go to 100% for all the files.
