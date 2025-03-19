import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import useSound from 'use-sound';
import JoinRoomPage from "@/JoinRoom/page";

// mock use-sound
jest.mock('use-sound', () => ({
    __esModule: true,
    default: jest.fn(() => [jest.fn()]),
}));

describe('Join room button sound effects', () => {
    it('plays button sound when the join room button is clicked', () => {
        const play = jest.fn();
        (useSound as jest.Mock).mockReturnValue([play]);

        render(<JoinRoomPage />);

        const joinRoomButton = screen.getByRole('button', { name: /Join Room/i });
        fireEvent.click(joinRoomButton);

        expect(play).toHaveBeenCalledTimes(1);
    });
});
