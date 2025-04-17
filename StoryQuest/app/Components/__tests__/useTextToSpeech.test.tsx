import { renderHook, act } from '@testing-library/react';
import useTextToSpeech from '../useTextToSpeech';

// More complete mock implementation
class MockSpeechSynthesisUtterance {
    text: string;
    voice: SpeechSynthesisVoice | null;
    rate: number;
    pitch: number;
    volume: number;
    lang: string;
    onstart: ((event: SpeechSynthesisEvent) => void) | null;
    onend: ((event: SpeechSynthesisEvent) => void) | null;
    onerror: ((event: SpeechSynthesisErrorEvent) => void) | null;
    onpause: ((event: SpeechSynthesisEvent) => void) | null;
    onresume: ((event: SpeechSynthesisEvent) => void) | null;
    onboundary: ((event: SpeechSynthesisEvent) => void) | null;
    onmark: ((event: SpeechSynthesisEvent) => void) | null;

    constructor(text: string) {
        this.text = text;
        this.voice = null;
        this.rate = 1;
        this.pitch = 1;
        this.volume = 1;
        this.lang = 'en-US';
        this.onstart = null;
        this.onend = null;
        this.onerror = null;
        this.onpause = null;
        this.onresume = null;
        this.onboundary = null;
        this.onmark = null;
    }
}

// Mock for SpeechSynthesisEvent
class MockSpeechSynthesisEvent {
    type: string;
    utterance: SpeechSynthesisUtterance;
    
    constructor(type: string, utterance: SpeechSynthesisUtterance) {
        this.type = type;
        this.utterance = utterance;
    }
}

// Mock the SpeechSynthesis API
const mockSpeechSynthesis = {
    getVoices: jest.fn(),
    speak: jest.fn(),
    cancel: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    pause: jest.fn(),
    resume: jest.fn(),
    paused: false,
    pending: false,
    speaking: false,
};

describe('useTextToSpeech', () => {
    beforeEach(() => {
        // Clear all mocks
        jest.clearAllMocks();
        
        // Setup fake timers to handle setTimeout
        jest.useFakeTimers();

        // Setup window mocks - we need to cast to any to avoid TypeScript errors
        Object.defineProperty(window, 'speechSynthesis', {
            value: mockSpeechSynthesis,
            writable: true,
        });

        // Mock SpeechSynthesisUtterance globally
        global.SpeechSynthesisUtterance = MockSpeechSynthesisUtterance as any;
        global.SpeechSynthesisEvent = MockSpeechSynthesisEvent as any;

        // Mock voices
        mockSpeechSynthesis.getVoices.mockReturnValue([
            { name: 'Google UK English Male', lang: 'en-GB' } as SpeechSynthesisVoice,
            { name: 'Microsoft David', lang: 'en-US' } as SpeechSynthesisVoice,
            { name: 'Daniel', lang: 'en-GB' } as SpeechSynthesisVoice,
            { name: 'Default Voice', lang: 'en-US' } as SpeechSynthesisVoice,
        ]);
    });

    afterEach(() => {
        // Clean up
        jest.restoreAllMocks();
        jest.useRealTimers();
    });

    it('should initialize without errors when speechSynthesis is available', () => {
        const { result } = renderHook(() => useTextToSpeech());
        expect(result.current).toBeDefined();
    });

    it('should handle initialization when speechSynthesis is not available', () => {
        // Save original and then delete
        const originalSpeechSynthesis = window.speechSynthesis;
        delete (window as any).speechSynthesis;

        const { result } = renderHook(() => useTextToSpeech());
        expect(result.current).toBeDefined();
        
        // Restore for other tests
        (window as any).speechSynthesis = originalSpeechSynthesis;
    });

    it('should clean up event listener on unmount', () => {
        const { result, unmount } = renderHook(() => useTextToSpeech());
        
        // Call speak to set the utteranceRef
        act(() => {
            result.current.speak('test');
            jest.runAllTimers(); // Run the timeouts
        });
        
        unmount();
        
        expect(mockSpeechSynthesis.removeEventListener).toHaveBeenCalledWith(
            'voiceschanged',
            expect.any(Function)
        );
        expect(mockSpeechSynthesis.cancel).toHaveBeenCalled();
    });

    it('should speak text when speak is called', () => {
        const { result } = renderHook(() => useTextToSpeech());
        const testText = 'Hello world';

        act(() => {
            result.current.speak(testText);
            jest.runAllTimers(); // Run all timeouts
        });

        expect(mockSpeechSynthesis.speak).toHaveBeenCalledWith(
            expect.objectContaining({ text: testText })
        );
    });

    it('should replace underscores with spaces in text', () => {
        const { result } = renderHook(() => useTextToSpeech());
        const testText = 'Hello_world';

        act(() => {
            result.current.speak(testText);
            jest.runAllTimers(); // Run all timeouts
        });

        expect(mockSpeechSynthesis.speak).toHaveBeenCalledWith(
            expect.objectContaining({ text: 'Hello world' })
        );
    });

    it('should stop current speech when stop is called', () => {
        const { result } = renderHook(() => useTextToSpeech());

        act(() => {
            result.current.speak('Hello');
            jest.runAllTimers(); // Run all timeouts
            result.current.stop();
        });

        expect(mockSpeechSynthesis.cancel).toHaveBeenCalled();
    });
});