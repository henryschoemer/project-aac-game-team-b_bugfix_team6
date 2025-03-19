import { render, screen, fireEvent } from "@testing-library/react"; 
import CreateRoomPage from "../page"; 
import '@testing-library/jest-dom';

beforeEach(() => {
    jest.spyOn(console, "log").mockImplementation(() => {});
});

afterEach(() => {
    jest.restoreAllMocks();
});

describe("CreateRoomPage", () => {
    test("renders the first step of CreateRoomPage component", () => {
        render(<CreateRoomPage />);
        
        // Check if title is displayed with new text
        expect(screen.getByText("Let's Create a Game!")).toBeInTheDocument();
        
        // Check for first step content
        expect(screen.getByText("Choose Your Story")).toBeInTheDocument();
        expect(screen.getByText("The Garden Adventure")).toBeInTheDocument();
        expect(screen.getByText("Walk in the Forest")).toBeInTheDocument();
        
        // The player selection and difficulty should not be visible yet
        expect(screen.queryByText("How Many Friends Are Playing?")).not.toBeInTheDocument();
        expect(screen.queryByText("Pick How Challenging")).not.toBeInTheDocument();
    });

    test("navigates through all steps and creates a room", () => {
        console.log = jest.fn(); // Mock console.log
        
        render(<CreateRoomPage />);
        
        // Step 1: Select a story
        fireEvent.click(screen.getByText("The Garden Adventure"));
        
        // After clicking, we should see step 2
        expect(screen.getByText("How Many Friends Are Playing?")).toBeInTheDocument();
        
        // Step 2: Select number of players
        fireEvent.click(screen.getByText("3 Players"));
        
        // After clicking, we should see step 3
        expect(screen.getByText("Pick How Challenging")).toBeInTheDocument();
        
        // Step 3: Select difficulty (Using actual text from your implementation)
        fireEvent.click(screen.getByText("Medium"));
        
        // After clicking, we should see the final step
        expect(screen.getByText("Ready to Play!")).toBeInTheDocument();
        
        // Verify the summary shows our selections
        expect(screen.getByText("Story: The Garden Adventure")).toBeInTheDocument();
        expect(screen.getByText("Players: 3")).toBeInTheDocument();
        expect(screen.getByText("Level: Medium")).toBeInTheDocument();
        
        // Click create room button 
        fireEvent.click(screen.getByText("Start Adventure!"));
        
        // Expect console.log to be called with correct data
        expect(console.log).toHaveBeenCalledWith("Room Created:", {
            selectedStory: "The Garden Adventure",
            numPlayers: 3,
            difficultyLevel: "Medium"
        });
    });

    test("allows navigation back to previous steps", () => {
        render(<CreateRoomPage />);
        
        // Step 1: Select a story
        fireEvent.click(screen.getByText("The Garden Adventure"));
        
        // Step 2: Select number of players
        fireEvent.click(screen.getByText("3 Players"));
        
        // Now we're at step 3, go back to step 2
        fireEvent.click(screen.getByText("Go Back"));
        
        // We should be back at step 2
        expect(screen.getByText("How Many Friends Are Playing?")).toBeInTheDocument();
        
        // Go back to step 1
        fireEvent.click(screen.getByText("Go Back"));
        
        // We should be back at step 1
        expect(screen.getByText("Choose Your Story")).toBeInTheDocument();
        
        // Select a different story
        fireEvent.click(screen.getByText("Walk in the Forest"));
        
        // We should move to step 2 again
        expect(screen.getByText("How Many Friends Are Playing?")).toBeInTheDocument();
    });

    test("final review screen shows correct selections", () => {
        render(<CreateRoomPage />);
        
        // Complete all steps
        fireEvent.click(screen.getByText("Walk in the Forest")); // Story
        fireEvent.click(screen.getByText("4 Players")); // Players
        fireEvent.click(screen.getByText("Hard")); // Hard difficulty
        
        // Check that summary shows the correct information
        expect(screen.getByText("Story: Walk in the Forest")).toBeInTheDocument();
        expect(screen.getByText("Players: 4")).toBeInTheDocument();
        expect(screen.getByText("Level: Hard")).toBeInTheDocument();
        
        // Check the Change Something button is present
        expect(screen.getByText("Change Something")).toBeInTheDocument();
    });

    test("can change selections from review screen", () => {
        render(<CreateRoomPage />);
        
        // Complete all steps
        fireEvent.click(screen.getByText("The Garden Adventure")); // Story
        fireEvent.click(screen.getByText("2 Players")); // Players
        fireEvent.click(screen.getByText("Easy")); // Easy difficulty
        
        // Go back from review screen
        fireEvent.click(screen.getByText("Change Something"));
        
        // Should be at difficulty selection
        expect(screen.getByText("Pick How Challenging")).toBeInTheDocument();
        
        // Change to a different difficulty
        fireEvent.click(screen.getByText("Medium")); // Medium
        
        // Check that summary has been updated
        expect(screen.getByText("Level: Medium")).toBeInTheDocument();
    });
});