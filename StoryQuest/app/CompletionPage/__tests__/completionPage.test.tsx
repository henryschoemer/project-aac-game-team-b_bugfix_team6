import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "@/CompletionPage/page.tsx"; // Update the import path
import "@testing-library/jest-dom";

// Mock the useSound hook
jest.mock("use-sound", () => ({
    __esModule: true,
    default: () => [jest.fn()], // Mock the sound playing function
}));

describe("Home Component", () => {
    it("renders the completion page with stars and buttons", () => {
        render(<Home />);

        // Check if the completion page is rendered
        expect(screen.getByText("Story Completed")).toBeInTheDocument();
        expect(screen.getByText("Great Teamwork!")).toBeInTheDocument();

        // Check if stars are rendered
        const stars = screen.getAllByAltText("Star icon");
        expect(stars.length).toBe(3);

        // Check if "Play Again" button is rendered
        expect(screen.getByText("Play Again")).toBeInTheDocument();

        // Check if the Home button is rendered
        expect(screen.getByRole("link", { name: /exit/i })).toBeInTheDocument();
    });

    it("shows story options when 'Play Again' button is clicked", () => {
        render(<Home />);

        // Click the "Play Again" button
        fireEvent.click(screen.getByText("Play Again"));

        // Check if story options are displayed
        expect(screen.getByText("Choose Your Story")).toBeInTheDocument();
        expect(screen.getByText("The Garden Adventure")).toBeInTheDocument();
        expect(screen.getByText("Walk in the Forest")).toBeInTheDocument();
    });

    it("navigates to difficulty selection when a story is selected", async () => {
        render(<Home />);

        // Click the "Play Again" button
        fireEvent.click(screen.getByText("Play Again"));

        // Click a story option
        fireEvent.click(screen.getByText("The Garden Adventure"));

        // Check if difficulty selection is displayed
        await waitFor(() => {
            expect(screen.getByText("Pick How Challenging")).toBeInTheDocument();
            expect(screen.getByText("Easy")).toBeInTheDocument();
            expect(screen.getByText("Medium")).toBeInTheDocument();
            expect(screen.getByText("Hard")).toBeInTheDocument();
        });
    });
/*
    it("navigates to the final step when a difficulty is selected", async () => {
        render(<Home />);

        // Click the "Play Again" button
        fireEvent.click(screen.getByText("Play Again"));

        // Click a story option
        fireEvent.click(screen.getByText("The Garden Adventure"));

        // Click a difficulty option
        fireEvent.click(screen.getByText("Medium"));

        // Check if the final step is displayed
        await waitFor(() => {
            expect(screen.getByText("Ready to Play!")).toBeInTheDocument();
            expect(screen.getByText("Story: The Garden Adventure")).toBeInTheDocument();
            expect(screen.getByText("Players: 2")).toBeInTheDocument();
            expect(screen.getByText("Level: Medium")).toBeInTheDocument();
        });
    });*/

    it("goes back to the previous step when 'Go Back' is clicked", async () => {
        render(<Home />);

        // Click the "Play Again" button
        fireEvent.click(screen.getByText("Play Again"));

        // Click a story option
        fireEvent.click(screen.getByText("The Garden Adventure"));

        // Click "Go Back"
        fireEvent.click(screen.getByText("Go Back"));

        // Check if the story selection step is displayed again
        await waitFor(() => {
            expect(screen.getByText("Choose Your Story")).toBeInTheDocument();
        });
    });

});