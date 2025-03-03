import { render, screen, fireEvent, waitFor, act } from "@testing-library/react"; 
import CreateRoomPage from "../page"; 
import '@testing-library/jest-dom';


beforeEach(() => {
    jest.spyOn(console, "log").mockImplementation(() => {});
});

afterEach(() => {
    jest.restoreAllMocks();
});

describe("CreateRoomPage", () => {
    test("renders the CreateRoomPage component", () => {
        render(<CreateRoomPage />);
        
        // Check if title is displayed
        expect(screen.getByText("Create a Room")).toBeInTheDocument();
        
        // Check for section headers
        expect(screen.getByText("Select a Story")).toBeInTheDocument();
        expect(screen.getByText("Select Number of Players")).toBeInTheDocument();
        expect(screen.getByText("Select Difficulty")).toBeInTheDocument();
    });

    test("displays an alert if user tries to create a room without all selections", () => {
        window.alert = jest.fn(); // Mock alert
    
        render(<CreateRoomPage />);
        
        const createRoomButton = screen.getByText("Create Room");
        fireEvent.click(createRoomButton);
    
        // Expect an alert to be shown
        expect(window.alert).toHaveBeenCalledWith("Please select a story, player count, and difficulty.");
    });

    test("logs correct room data when all selections are made", () => {
        console.log = jest.fn(); // Mock console.log
    
        render(<CreateRoomPage />);
    
        // Select a story
        fireEvent.click(screen.getByText("The Garden Adventure"));
        
        // Select number of players
        fireEvent.click(screen.getByText("3 Players"));
        
        // Select difficulty
        fireEvent.click(screen.getByText("Medium"));
    
        // Click create room button
        fireEvent.click(screen.getByText("Create Room"));
    
        // Expect console.log to be called with correct data
        expect(console.log).toHaveBeenCalledWith("Room Created:", {
            selectedStory: "The Garden Adventure",
            numPlayers: 3,
            difficultyLevel: "Medium"
        });
    });

    test("allows user to change selected story", () => {
        render(<CreateRoomPage />);
    
        // Select the first story
        fireEvent.click(screen.getByText("The Garden Adventure"));
        
        // Select a different story
        fireEvent.click(screen.getByText("Walk in the Forest"));
    
        // Ensure the new story is selected
        expect(screen.getByText("Walk in the Forest")).toBeInTheDocument();
    });


});