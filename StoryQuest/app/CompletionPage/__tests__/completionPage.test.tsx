import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "@/CompletionPage/page.tsx"; // Update the import path
import "@testing-library/jest-dom";
import CompletionPage from "@/CompletionPage/page.tsx";

// Mock the useSound hook
jest.mock("use-sound", () => ({
    __esModule: true,
    default: () => [jest.fn()], // Mock the sound playing function
}));


describe("Home Component", () => {
    it("renders the completion page with stars and buttons", () => {
        render(<CompletionPage />);

        // Check if the completion page is rendered
        expect(screen.getByText("Story Completed")).toBeInTheDocument();
        expect(screen.getByText("Great Teamwork!")).toBeInTheDocument();

        // Check if stars are rendered
        const stars = screen.getAllByAltText("Star icon");
        expect(stars.length).toBe(3);

        // Check if the Home button is rendered
        expect(screen.getByRole("link", { name: /exit/i })).toBeInTheDocument();
    });

});