import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import useSound from 'use-sound';
import JoinRoomPage from '@/JoinRoom/page';
import { useRouter } from 'next/navigation';

// Mock the router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('jsqr', () => ({
  __esModule: true,
  default: jest.fn(() => ({ data: 'mocked QR result' })),
}));

// Mock useSound
jest.mock('use-sound', () => ({
  __esModule: true,
  default: jest.fn(() => [jest.fn()]),
}));
beforeAll(() => {
  Object.defineProperty(global.navigator, 'mediaDevices', {
    configurable: true,
    enumerable: false,
    writable: true,
    value: {
      getUserMedia: jest.fn().mockResolvedValue({}),
    },
  });
});

describe('JoinRoomPage', () => {
  it('renders the page without crashing', () => {
    render(<JoinRoomPage />);

    // Example check: Ensure the main title is in the document
    expect(screen.getByText(/Scan Room QR Code/i)).toBeInTheDocument();
  });
});
