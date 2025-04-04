import React from 'react';
import { render, act } from '@testing-library/react';
import TextToSpeechTextOnly from '../TextToSpeechTextOnly.tsx';

// Mock SpeechSynthesis API
class MockSpeechSynthesisUtterance {
    text: string;
    voice: SpeechSynthesisVoice | null;
    rate: number;
    onend: (() => void) | null;

    constructor(text: string) {
        this.text = text;
        this.voice = null;
        this.rate = 1;
        this.onend = null;
    }
}

const mockVoices = [
    { name: "Google UK English Male", lang: "en-GB" },
    { name: "Microsoft David - English (United States)", lang: "en-US" },
    { name: "Daniel", lang: "en-US" }
];

describe('TextToSpeechTextOnly', () => {
    let mockSpeak: jest.Mock;
    let mockCancel: jest.Mock;
    let mockGetVoices: jest.Mock;

    beforeEach(() => {
        mockSpeak = jest.fn();
        mockCancel = jest.fn();
        mockGetVoices = jest.fn().mockReturnValue(mockVoices);

        (window as any).SpeechSynthesisUtterance = MockSpeechSynthesisUtterance;
        (window as any).speechSynthesis = {
            speak: mockSpeak,
            cancel: mockCancel,
            getVoices: mockGetVoices,
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            onvoiceschanged: null,
        };
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('initializes and selects a preferred voice', async () => {
        render(<TextToSpeechTextOnly text="Test" />);

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 50));
        });

        expect(mockGetVoices).toHaveBeenCalled();
        expect(window.speechSynthesis.addEventListener).toHaveBeenCalledWith(
            'voiceschanged',
            expect.any(Function)
        );
    });

    it('text to speech with underscores replaced', async () => {
        const testText = "Look in the garden, there is a ___";
        render(<TextToSpeechTextOnly text={testText} />);

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 50));
        });

        expect(mockSpeak).toHaveBeenCalled();
        const utterance = mockSpeak.mock.calls[0][0];
        expect(utterance.text).toBe("Look in the garden, there is a    ");
        expect(utterance.rate).toBe(0.9);
    });

    it('calls onComplete when speech finishes', async () => {
        const mockOnComplete = jest.fn();
        render(<TextToSpeechTextOnly text="Test complete" onComplete={mockOnComplete} />);

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 50));
        });

        const utterance = mockSpeak.mock.calls[0][0];
        act(() => {
            if (utterance.onend) utterance.onend();
        });

        expect(mockOnComplete).toHaveBeenCalled();
    });

    it('cancels speech when unmounted', async () => {
        const { unmount } = render(<TextToSpeechTextOnly text="Test" />);

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 50));
        });

        unmount();
        expect(mockCancel).toHaveBeenCalled();
    });

    it('does not speak when text is empty', async () => {
        render(<TextToSpeechTextOnly text="" />);

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 50));
        });

        expect(mockSpeak).not.toHaveBeenCalled();
    });
});