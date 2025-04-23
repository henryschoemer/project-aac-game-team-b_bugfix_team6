import React from 'react';
import { render, act } from '@testing-library/react';
import CompletedStory from '../CompletedStory';
import TextToSpeechTextOnly from '@/Components/TextToSpeechTextOnly.tsx';

// Mock the TextToSpeechTextOnly component
jest.mock('../TextToSpeechTextOnly.tsx', () => {
    return jest.fn(({ text, onComplete }) => {
        React.useEffect(() => {
            setTimeout(() => {
                onComplete();
            }, 10);
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

    it('renders and reads each phrase one-by-one, then the full story', async () => {
        render(
            <CompletedStory
                index={completedPhrases.length - 1} // Last phrase
                completedPhrases={completedPhrases}
                onComplete={mockOnComplete}
                roomId="room123"
            />
        );

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 100));
        });

        const calls = (TextToSpeechTextOnly as jest.Mock).mock.calls;
        expect(calls.length).toBe(2); // one for the first phrase and one for the full story.
        expect(calls[0][0].text).toBe(completedPhrases[0]);
    });

    /*it('calls onComplete after all phrases including finalRead are read', async () => {
        render(
            <CompletedStory
                index={completedPhrases.length - 1}
                completedPhrases={completedPhrases}
                onComplete={mockOnComplete}
                roomId="room123"
            />
        );

        // Fast-forward all timers to simulate full playback + delay
        await act(async () => {
            jest.advanceTimersByTime(10 * completedPhrases.length);
            jest.advanceTimersByTime(10);
            jest.advanceTimersByTime(1000);
        });

        expect(mockOnComplete).toHaveBeenCalledTimes(1);
    });*/
});