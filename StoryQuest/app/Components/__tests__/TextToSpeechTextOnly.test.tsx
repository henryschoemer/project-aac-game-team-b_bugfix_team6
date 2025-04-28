import React from 'react';
import { render, act } from '@testing-library/react';
import TextToSpeechTextOnly from '@/Components/TextToSpeechTextOnly';

// Mocking SpeechSynthesis APIs
class MockSpeechSynthesisUtterance {
    constructor(public text: string) {}
    onend = () => {};
    onerror = () => {};
    voice = null;
    rate = 1;
    pitch = 1;
    volume = 1;
}

const mockSpeak = jest.fn();
const mockCancel = jest.fn();
const mockGetVoices = jest.fn();
let voicesChangedCallback: () => void = () => {};

beforeAll(() => {
    Object.defineProperty(window, 'SpeechSynthesisUtterance', {
        value: MockSpeechSynthesisUtterance,
        writable: true,
    });

    Object.defineProperty(window, 'speechSynthesis', {
        value: {
            speak: mockSpeak,
            cancel: mockCancel,
            getVoices: mockGetVoices,
            addEventListener: jest.fn((_, cb) => { voicesChangedCallback = cb; }),
            removeEventListener: jest.fn(),
        },
        writable: true,
    });
});

describe('TextToSpeechTextOnly', () => {
    const mockOnComplete = jest.fn();
    const mockText = "This is a test sentence";
    let capturedUtterance: MockSpeechSynthesisUtterance | null = null;

    beforeEach(() => {
        jest.clearAllMocks();
        capturedUtterance = null;
        mockSpeak.mockImplementation((utterance) => {
            capturedUtterance = utterance;
        });
    });
});