import { render, fireEvent, screen } from '@testing-library/react';
import {CreateButton, JoinButton, TemporaryTestingGameButton} from "@/HomePage/HomePageButtons";
import '@testing-library/jest-dom';
import useSound from 'use-sound';

// mock use-sound
jest.mock('use-sound', () => ({
    __esModule: true,
    default: jest.fn(() => [jest.fn()]),
}));

describe('HomePage button sound effects', () => {
    it('Create Button plays sound when clicked', () => {
        const play = jest.fn();
        (useSound as jest.Mock).mockReturnValue([play]);

        render(<CreateButton />);

        // Find the button element
        const button = screen.getByRole('button', { name: /create/i });

        fireEvent.click(button);

        // if the play function was called when clicked
        expect(play).toHaveBeenCalledTimes(1);
    });


    it('Join Button plays sound when clicked', () => {
        const play = jest.fn();
        (useSound as jest.Mock).mockReturnValue([play]);

        render(<JoinButton />);

        // Find the button element
        const button = screen.getByRole('button', { name: /join/i });

        fireEvent.click(button);

        // if the play function was called when clicked
        expect(play).toHaveBeenCalledTimes(1);
    });


    it('Gameplay Button plays sound when clicked', () => {
        const play = jest.fn();
        (useSound as jest.Mock).mockReturnValue([play]);

        render(<TemporaryTestingGameButton />);

        // Find the button element
        const button = screen.getByRole('button', { name: /gameplay/i });

        fireEvent.click(button);

        // if the play function was called when clicked
        expect(play).toHaveBeenCalledTimes(1);
    });
});
