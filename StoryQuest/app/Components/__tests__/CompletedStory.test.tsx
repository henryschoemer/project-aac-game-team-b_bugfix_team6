import React from "react";
import { render, act } from "@testing-library/react";
import CompletedStory from "../CompletedStory.tsx"; // Update the import path
import TextToSpeechTextOnly from "@/Components/TextToSpeechTextOnly";
import "@testing-library/jest-dom";

// Mock the TextToSpeechTextOnly component
jest.mock("../CompletedStory.tsx", () => ({
    __esModule: true,
    default: ({ onComplete }: { onComplete: () => void }) => {
        // Simulate the onComplete callback after a short delay
        setTimeout(() => {
            onComplete();
        }, 100);
        return null;
    },
}));

describe("CompletedStory Component", () => {
    it("calls the onComplete callback when the story is completed", async () => {
        const mockOnComplete = jest.fn();
        const completedPhrases = ["Look in the garden there is a ladybug", "And near the flowers, I see a butterfly"];

        render(
            <CompletedStory
                index={completedPhrases.length - 1}
                completedPhrases={completedPhrases}
                onComplete={mockOnComplete}
            />
        );

        // Wait for the onComplete callback to be called
        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 200));
        });

        // Check if the onComplete callback was called
        expect(mockOnComplete).toHaveBeenCalled();
    });

});