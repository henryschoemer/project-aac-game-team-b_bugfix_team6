// project-aac-game-team-b/StoryQuest/app/CreateRoom/__tests__/page.test.tsx

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CreateRoomPage from '../page';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';

// Mock dependencies
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('next/link', () => ({ children }: { children: React.ReactNode }) => children);

jest.mock('next/image', () => ({ src, alt }: { src: string; alt: string }) => (
  <img src={src} alt={alt} />
));

jest.mock('../../../firebaseControls/firebaseConfig', () => ({
  db: {},
}));

jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  addDoc: jest.fn(),
  setDoc: jest.fn(),
  doc: jest.fn(),
}));

jest.mock('../../Components/useQuickTextToSpeech', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    speak: jest.fn(),
  })),
}));

jest.mock('../../Components/useButtonClickSounds', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    buttonHandler: jest.fn(),
    isSpeaking: false,
  })),
}));

// Mock Web Speech API
beforeEach(() => {
  Object.defineProperty(window, 'speechSynthesis', {
    value: {
      speak: jest.fn(),
      cancel: jest.fn(),
      getVoices: jest.fn(() => []),
      onvoiceschanged: null,
    },
    writable: true,
  });

  global.SpeechSynthesisUtterance = jest.fn().mockImplementation((text) => ({
    text,
    voice: null,
    rate: 1,
    pitch: 1,
    volume: 1,
  }));
});

describe('CreateRoomPage', () => {
  const mockRouter = {
    push: jest.fn(),
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    jest.clearAllMocks();
  });

  it('renders the initial step with story selection', () => {
    render(<CreateRoomPage />);
    
    expect(screen.getByText("Let's Create a Game!")).toBeInTheDocument();
    expect(screen.getByText('Choose Your Story')).toBeInTheDocument();
    expect(screen.getByText('The Garden Adventure')).toBeInTheDocument();
    expect(screen.getByText('Walk in the Forest')).toBeInTheDocument();
    expect(screen.getByText('Under the Sea')).toBeInTheDocument();
    expect(screen.getByText('Space Adventure')).toBeInTheDocument();
  });

  it('navigates through all steps correctly', async () => {
    const { getByText } = render(<CreateRoomPage />);
    
    // Step 1: Select story
    fireEvent.click(getByText('The Garden Adventure'));
    expect(getByText('How Many Friends Are Playing?')).toBeInTheDocument();
    
    // Step 2: Select players
    fireEvent.click(getByText('2 Players'));
    expect(getByText('Pick Game Difficulty')).toBeInTheDocument();
    
    // Step 3: Select difficulty
    fireEvent.click(getByText('Easy'));
    expect(getByText('Ready to Play!')).toBeInTheDocument();
    
    // Step 4: Verify summary
    expect(getByText('The Garden Adventure')).toBeInTheDocument();
    expect(getByText('2 Players')).toBeInTheDocument();
    expect(getByText('easy')).toBeInTheDocument();
  });

  it('allows going back to previous steps', () => {
    const { getByText } = render(<CreateRoomPage />);
    
    // Go to step 2
    fireEvent.click(getByText('The Garden Adventure'));
    
    // Go back to step 1
    fireEvent.click(getByText('← Go Back'));
    expect(getByText('Choose Your Story')).toBeInTheDocument();
    
    // Go through all steps again
    fireEvent.click(getByText('The Garden Adventure'));
    fireEvent.click(getByText('2 Players'));
    
    // Go back to step 2
    fireEvent.click(getByText('← Go Back'));
    expect(getByText('How Many Friends Are Playing?')).toBeInTheDocument();
    
    // Continue to step 3
    fireEvent.click(getByText('2 Players'));
    fireEvent.click(getByText('Easy'));
    
    // Go back to step 3
    fireEvent.click(getByText('← Change Something'));
    expect(getByText('Pick Game Difficulty')).toBeInTheDocument();
  });

  it('creates a room and navigates to QR code page on successful creation', async () => {
    const mockRoomId = 'mock-room-id';
    const mockAddDoc = jest.fn().mockResolvedValue({ id: mockRoomId });
    const mockSetDoc = jest.fn().mockResolvedValue(undefined);
    
    require('firebase/firestore').addDoc.mockImplementation(mockAddDoc);
    require('firebase/firestore').setDoc.mockImplementation(mockSetDoc);
    
    const { getByText } = render(<CreateRoomPage />);
    
    // Go through all steps
    fireEvent.click(getByText('The Garden Adventure'));
    fireEvent.click(getByText('2 Players'));
    fireEvent.click(getByText('Easy'));
    
    // Create room
    fireEvent.click(getByText('🎮 Start Adventure!'));
    
    await waitFor(() => {
      expect(mockAddDoc).toHaveBeenCalled();
      expect(mockSetDoc).toHaveBeenCalled();
      expect(mockRouter.push).toHaveBeenCalledWith(
        `/CreateRoom/qrcode?roomId=${mockRoomId}&storyTitle=${encodeURIComponent('The Garden Adventure')}`
      );
    });
  });

  it('shows loading state while creating room', async () => {
    const mockAddDoc = jest.fn().mockImplementation(
      () => new Promise(resolve => setTimeout(() => resolve({ id: 'mock-room-id' }), 100)
    ));
    
    require('firebase/firestore').addDoc.mockImplementation(mockAddDoc);
    
    const { getByText } = render(<CreateRoomPage />);
    
    // Go through all steps
    fireEvent.click(getByText('The Garden Adventure'));
    fireEvent.click(getByText('2 Players'));
    fireEvent.click(getByText('Easy'));
    
    // Create room
    fireEvent.click(getByText('🎮 Start Adventure!'));
    
    expect(getByText('Creating...')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(getByText('🎮 Start Adventure!')).toBeInTheDocument();
    });
  });

  it('shows tooltips for difficulty levels', () => {
    const { getByText } = render(<CreateRoomPage />);
    
    // Go to difficulty step
    fireEvent.click(getByText('The Garden Adventure'));
    fireEvent.click(getByText('2 Players'));
    
    // Hover over easy difficulty
    fireEvent.mouseEnter(getByText('Easy'));
    expect(getByText('4 sentences')).toBeInTheDocument();
    
    // Hover over medium difficulty
    fireEvent.mouseEnter(getByText('Medium'));
    expect(getByText('8 sentences')).toBeInTheDocument();
    
    // Hover over hard difficulty
    fireEvent.mouseEnter(getByText('Hard'));
    expect(getByText('12 sentences')).toBeInTheDocument();
  });

  it('shows the correct number of player emojis', () => {
    const { getByText, getAllByText } = render(<CreateRoomPage />);
    
    // Go to player selection step
    fireEvent.click(getByText('The Garden Adventure'));
    
    // Verify emoji counts
    expect(getAllByText('😊').length).toBe(2); // 2 Players button
    fireEvent.click(getByText('3 Players'));
    expect(getAllByText('😊').length).toBe(3); // 3 Players button
    fireEvent.click(getByText('4 Players'));
    expect(getAllByText('😊').length).toBe(4); // 4 Players button
  });

  it('shows the correct difficulty color coding', () => {
    const { getByText } = render(<CreateRoomPage />);
    
    // Go to difficulty step
    fireEvent.click(getByText('The Garden Adventure'));
    fireEvent.click(getByText('2 Players'));
    
    // Check initial colors
    const easyButton = getByText('Easy').closest('button');
    const mediumButton = getByText('Medium').closest('button');
    const hardButton = getByText('Hard').closest('button');
    
    expect(easyButton).toHaveClass('border-gray-200');
    expect(mediumButton).toHaveClass('border-gray-200');
    expect(hardButton).toHaveClass('border-gray-200');
    
    // Select easy and verify color
    fireEvent.click(getByText('Easy'));
    expect(easyButton).toHaveClass('bg-green-100', 'border-green-400');
    
    // Go back and select medium
    fireEvent.click(getByText('← Go Back'));
    fireEvent.click(getByText('Medium'));
    expect(mediumButton).toHaveClass('bg-orange-100', 'border-orange-400');
    
    // Go back and select hard
    fireEvent.click(getByText('← Go Back'));
    fireEvent.click(getByText('Hard'));
    expect(hardButton).toHaveClass('bg-red-100', 'border-red-400');
  });

  it('shows the correct story image in the summary', () => {
    const { getByText, getByAltText } = render(<CreateRoomPage />);
    
    // Select each story and verify image in summary
    const stories = [
      { title: 'The Garden Adventure', img: '/images/garden-background.webp' },
      { title: 'Walk in the Forest', img: '/images/forest-background.jpg' },
      { title: 'Under the Sea', img: '/images/ocean-background.png' },
      { title: 'Space Adventure', img: '/images/space-background.svg' }
    ];
    
    stories.forEach(story => {
      // Go through steps
      fireEvent.click(getByText(story.title));
      fireEvent.click(getByText('2 Players'));
      fireEvent.click(getByText('Easy'));
      
      // Verify image
      const img = getByAltText(story.title || 'Story');
      expect(img).toHaveAttribute('src', story.img);
      
      // Go back to start
      fireEvent.click(getByText('← Change Something'));
      fireEvent.click(getByText('← Go Back'));
      fireEvent.click(getByText('← Go Back'));
    });
  });
});