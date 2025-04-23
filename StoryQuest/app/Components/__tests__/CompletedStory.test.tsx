import React from 'react';
import { render, act } from '@testing-library/react';
import CompletedStory from '../CompletedStory';
import TextToSpeechTextOnly from '@/Components/TextToSpeechTextOnly.tsx';

// Mock the TextToSpeechTextOnly component
jest.mock('../TextToSpeechTextOnly.tsx', () => {
    return jest.fn(({ text, onComplete }) => {
        // Simulate the speech ending immediately
        React.useEffect(() => {
            if (onComplete) {
                setTimeout(onComplete, 10);
            }
        }, [onComplete]);

        return null;
    });
});

describe('CompletedStory', () => {
    const mockOnComplete = jest.fn();
    const completedPhrases = [
        "Look in the garden, there is a mouse",
        "And near the flowers, I see a bee",
        "The tree was full of apples."
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('does not render anything when not on last phrase', () => {
        const { container } = render(
            <CompletedStory
                index={0} // Not the last phrase
                completedPhrases={completedPhrases}
                onComplete={mockOnComplete}
            />
        );

        expect(container.firstChild).toBeNull();
        expect(TextToSpeechTextOnly).not.toHaveBeenCalled();
    });

    it('renders TextToSpeechTextOnly for each phrase when on last phrase', async () => {
        render(
            <CompletedStory
                index={completedPhrases.length - 1} // Last phrase
                completedPhrases={completedPhrases}
                onComplete={mockOnComplete}
            />
        );

        // Wait for effects to run
        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 50));
        });

        // Check that TextToSpeechTextOnly was called for each phrase
        expect(TextToSpeechTextOnly).toHaveBeenCalledTimes(completedPhrases.length +1);

        // Verify each phrase was passed correctly
        completedPhrases.forEach((phrase, index) => {
            expect(TextToSpeechTextOnly).toHaveBeenCalledWith(
                expect.objectContaining({
                    text: phrase,
                    onComplete: index === completedPhrases.length - 1 ? mockOnComplete : undefined
                }),
                expect.anything()
            );
        });
    });

    it('calls onComplete after last phrase finishes', async () => {
        render(
            <CompletedStory
                index={completedPhrases.length - 1}
                completedPhrases={completedPhrases}
                onComplete={mockOnComplete}
            />
        );

        // Wait for all phrases to "finish speaking"
        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 100));
        });

        expect(mockOnComplete).toHaveBeenCalledTimes(1);
    });

    it('passes the correct onComplete handler to each phrase', async () => {
        render(
            <CompletedStory
                index={completedPhrases.length - 1}
                completedPhrases={completedPhrases}
                onComplete={mockOnComplete}
            />
        );

        // Get all mock calls
        const textToSpeechCalls = (TextToSpeechTextOnly as jest.Mock).mock.calls;

        // First and middle phrases should have undefined onComplete
        for (let i = 0; i < completedPhrases.length - 1; i++) {
            expect(textToSpeechCalls[i][0].onComplete).toBeUndefined();
        }

        // Last phrase should have the mockOnComplete
        expect(textToSpeechCalls[completedPhrases.length - 1][0].onComplete)
            .toBe(mockOnComplete);
    });
});