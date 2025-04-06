import { renderHook, act } from '@testing-library/react';
import useTextToSpeech from '../useTextToSpeech';

// Complete mock implementation
class MockSpeechSynthesisUtterance {
    text: string;
    voice: SpeechSynthesisVoice | null;
    rate: number;
    onstart: (() => void) | null;
    onend: (() => void) | null;
    onerror: (() => void) | null;

    constructor(text: string) {
        this.text = text;
        this.voice = null;
        this.rate = 1;
        this.onstart = null;
        this.onend = null;
        this.onerror = null;
    }
}

// Mock the SpeechSynthesis API
const mockSpeechSynthesis = {
    getVoices: jest.fn(),
    speak: jest.fn(),
    cancel: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    paused: false,
    pending: false,
    speaking: false,
};

beforeEach(() => {
    // Clear all mocks
    jest.clearAllMocks();

    // Setup window mocks
    Object.defineProperty(window, 'speechSynthesis', {
        value: mockSpeechSynthesis,
        writable: true,
    });

    Object.defineProperty(window, 'SpeechSynthesisUtterance', {
        value: MockSpeechSynthesisUtterance,
        writable: true,
    });

    // Mock voices
    mockSpeechSynthesis.getVoices.mockReturnValue([
        { name: 'Google UK English Male', lang: 'en-GB' },
        { name: 'Microsoft David - English (United States)', lang: 'en-US' },
        { name: 'Daniel', lang: 'en-GB' },
        { name: 'Default Voice', lang: 'en-US' },
    ]);
});

afterEach(() => {
    // Clean up
    jest.restoreAllMocks();
});

describe('useTextToSpeech', () => {
    it('should initialize without errors when speechSynthesis is available', () => {
        const { result } = renderHook(() => useTextToSpeech());
        expect(result.current).toBeDefined();
    });

    it('should handle initialization when speechSynthesis is not available', () => {
        Object.defineProperty(window, 'speechSynthesis', {
            value: undefined,
            writable: true,
        });

        const { result } = renderHook(() => useTextToSpeech());
        expect(result.current).toBeDefined();
    });

    it('should clean up event listener on unmount', () => {
        const { unmount } = renderHook(() => useTextToSpeech());
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
        });

        expect(mockSpeechSynthesis.speak).toHaveBeenCalledWith(
            expect.objectContaining({ text: 'Hello world' })
        );
    });

    it('should stop current speech when stop is called', () => {
        const { result } = renderHook(() => useTextToSpeech());

        act(() => {
            result.current.speak('Hello');
            result.current.stop();
        });

        expect(mockSpeechSynthesis.cancel).toHaveBeenCalled();
    });

});