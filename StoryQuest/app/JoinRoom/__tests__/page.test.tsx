// project-aac-game-team-b/StoryQuest/app/JoinRoom/__tests__/page.test.tsx

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import JoinRoomPage from '../page';
import '@testing-library/jest-dom';

// Mock dependencies
jest.mock('next/link', () => ({ children }: { children: React.ReactNode }) => children);
jest.mock('next/image', () => ({ src, alt }: { src: string; alt: string }) => (
  <img src={src} alt={alt} />
));

jest.mock('../../../firebaseControls/firebaseConfig', () => ({
  db: {},
}));

jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  getDoc: jest.fn(),
}));

jest.mock('jsqr', () => jest.fn());

jest.mock('use-sound', () => () => [jest.fn()]);

jest.mock('../../Components/useQuickTextToSpeech', () => ({
  useQuickTextToSpeech: () => ({
    speak: jest.fn(),
  }),
}));

jest.mock('../../Components/useButtonClickSounds', () => ({
  useButtonFeedback: () => ({
    buttonHandler: jest.fn(),
    isSpeaking: false,
  }),
}));

// Mock Camera component
jest.mock('../../Components/Camera', () => ({
  __esModule: true,
  default: ({ setHotspotImage }: { setHotspotImage: (data: string) => void }) => (
    <div data-testid="mock-camera" onClick={() => setHotspotImage('mock-image-data')}>
      Mock Camera
    </div>
  ),
}));

describe('JoinRoomPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the page with all components', () => {
    render(<JoinRoomPage />);
    
    expect(screen.getByText('GRAB A TABLET AND FOLLOW THE PICTURES BELLOW')).toBeInTheDocument();
    expect(screen.getByText('Scan Below')).toBeInTheDocument();
    expect(screen.getByTestId('mock-camera')).toBeInTheDocument();
  });

  it('shows QR scanning instructions with images', () => {
    render(<JoinRoomPage />);
    
    expect(screen.getByAltText('Step 1')).toBeInTheDocument();
    expect(screen.getByAltText('Step 2')).toBeInTheDocument();
    expect(screen.getByAltText('Step 3')).toBeInTheDocument();
    expect(screen.getByAltText('Step 4')).toBeInTheDocument();
    
    expect(screen.getByText('Point the camera')).toBeInTheDocument();
    expect(screen.getByText('Find this picture')).toBeInTheDocument();
    expect(screen.getByText('Wait for scan')).toBeInTheDocument();
    expect(screen.getByText('Play together')).toBeInTheDocument();
  });

  it('handles successful QR code scan', async () => {
    const mockCode = { data: 'mock-room-id' };
    const mockGetDoc = jest.fn().mockResolvedValue({ exists: () => true });
    
    require('firebase/firestore').getDoc.mockImplementation(mockGetDoc);
    require('jsqr').mockImplementation(() => mockCode);
    
    render(<JoinRoomPage />);
    
    fireEvent.click(screen.getByTestId('mock-camera'));
    
    await waitFor(() => {
      expect(require('firebase/firestore').doc).toHaveBeenCalledWith({}, 'rooms', 'mock-room-id');
      expect(mockGetDoc).toHaveBeenCalled();
    });
  });

  it('shows error message when QR code is not detected', async () => {
    require('jsqr').mockImplementation(() => null);
    
    render(<JoinRoomPage />);
    
    fireEvent.click(screen.getByTestId('mock-camera'));
    
    await waitFor(() => {
      expect(screen.getByText('No QR code detected. Please position the code clearly and try again.')).toBeInTheDocument();
    });
  });

  it('shows error message when room is not found', async () => {
    const mockCode = { data: 'non-existent-room' };
    const mockGetDoc = jest.fn().mockResolvedValue({ exists: () => false });
    
    require('firebase/firestore').getDoc.mockImplementation(mockGetDoc);
    require('jsqr').mockImplementation(() => mockCode);
    
    render(<JoinRoomPage />);
    
    fireEvent.click(screen.getByTestId('mock-camera'));
    
    await waitFor(() => {
      expect(screen.getByText('Room not found. Please check the QR code and try again.')).toBeInTheDocument();
    });
  });

  it('shows QR scan failed popup after multiple failed attempts', async () => {
    require('jsqr').mockImplementation(() => null);
    
    render(<JoinRoomPage />);
    
    // Simulate multiple failed attempts
    for (let i = 0; i < 3; i++) {
      fireEvent.click(screen.getByTestId('mock-camera'));
      await waitFor(() => {});
    }
    
    await waitFor(() => {
      expect(screen.getByText('Need help scanning?')).toBeInTheDocument();
    });
  });

  it('closes QR scan failed popup when clicking try again', async () => {
    require('jsqr').mockImplementation(() => null);
    
    render(<JoinRoomPage />);
    
    // Simulate multiple failed attempts to show popup
    for (let i = 0; i < 3; i++) {
      fireEvent.click(screen.getByTestId('mock-camera'));
      await waitFor(() => {});
    }
    
    fireEvent.click(screen.getByText('Try Again'));
    
    await waitFor(() => {
      expect(screen.queryByText('Need help scanning?')).not.toBeInTheDocument();
    });
  });

  it('handles URL format QR codes correctly', async () => {
    const mockUrl = 'http://example.com/Gameplay/mock-room-id/story-title';
    const mockCode = { data: mockUrl };
    const mockGetDoc = jest.fn().mockResolvedValue({ exists: () => true });
    
    require('firebase/firestore').getDoc.mockImplementation(mockGetDoc);
    require('jsqr').mockImplementation(() => mockCode);
    
    render(<JoinRoomPage />);
    
    fireEvent.click(screen.getByTestId('mock-camera'));
    
    await waitFor(() => {
      expect(require('firebase/firestore').doc).toHaveBeenCalledWith({}, 'rooms', 'mock-room-id');
    });
  });
});