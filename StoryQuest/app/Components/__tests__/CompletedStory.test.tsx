import React from 'react';
import { render } from '@testing-library/react';
import CompletedStory from '@/Components/CompletedStory';
import { doc, updateDoc } from 'firebase/firestore';
import '@testing-library/jest-dom';

// Mocking Firebase
jest.mock('firebase/firestore', () => ({
    doc: jest.fn(),
    updateDoc: jest.fn().mockResolvedValue(undefined),
}));

// Mocking speechSynthesis
const mockSpeak = jest.fn();
const mockCancel = jest.fn();
Object.defineProperty(window, 'speechSynthesis', {
    value: {
        speak: mockSpeak,
        cancel: mockCancel,
        getVoices: () => [],
    },
    writable: true,
});

describe('CompletedStory', () => {
    const mockOnComplete = jest.fn();
    const mockRoomId = 'test-room-123';
    const mockPhrases = ['Once upon a time', 'there was a brave knight'];

    beforeEach(() => {
        jest.clearAllMocks();
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
    });

});