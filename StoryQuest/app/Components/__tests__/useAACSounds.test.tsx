// hooks/__tests__/useAACSounds.test.ts
import { renderHook } from '@testing-library/react-hooks';
import useAACSounds from '../useAACSounds';

// Mock use-sound to return a mock play function
jest.mock('use-sound', () => jest.fn(() => [jest.fn(), { stop: jest.fn() }]));

describe('useAACSounds', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should play the apples sound when requested', () => {
        // Render the hook
        const { result } = renderHook(() => useAACSounds());

        // Call playSound with "apples"
        result.current.playSound('apples');

        // Verify useSound was called with the correct apples.mp3 path and volume
        const mockUseSound = require('use-sound') as jest.Mock;
        expect(mockUseSound).toHaveBeenCalledWith(
            '/aacSounds/apples.mp3',
            { volume: 2 }
        );

        // Verify the play function was called
        const mockPlayFunction = mockUseSound.mock.results[0].value[0];
        expect(mockPlayFunction).toHaveBeenCalled();
    });

    it('should not play and show warning for unknown word', () => {
        // Spy on console.warn
        const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

        // Render the hook
        const { result } = renderHook(() => useAACSounds());

        // Try to play a non-existent word
        result.current.playSound('unknownword');

        // Verify the warning was logged
        expect(consoleWarnSpy).toHaveBeenCalledWith(
            'No sound found for word: unknownword'
        );

        // Verify no play function was called
        const mockUseSound = require('use-sound') as jest.Mock;
        expect(mockUseSound).not.toHaveBeenCalledWith(
            expect.stringContaining('unknownword'),
            expect.anything()
        );

        // Clean up the spy
        consoleWarnSpy.mockRestore();
    });
});