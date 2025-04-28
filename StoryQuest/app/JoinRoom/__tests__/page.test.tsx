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

jest.mock('use-sound', () => () => [jest.fn(), { stop: jest.fn() }]);

// Corrected mock for useQuickTextToSpeech - now matching named export
jest.mock('../../Components/useQuickTextToSpeech', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    speak: jest.fn(),
  })),
}));

// Corrected mock for useButtonClickSounds
jest.mock('../../Components/useButtonClickSounds', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    buttonHandler: jest.fn(),
    isSpeaking: false,
  })),
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

// Import the mocked hooks to configure them in beforeEach
import useQuickTextToSpeech from '../../Components/useQuickTextToSpeech';
import useButtonClickSounds from '../../Components/useButtonClickSounds';

describe('JoinRoomPage', () => {
  beforeEach(() => {
    // Clear all mocks and reset mock implementations
    jest.clearAllMocks();
    
    // Set up default mock implementations
    (useQuickTextToSpeech as jest.Mock).mockImplementation(() => ({
      speak: jest.fn(),
    }));
    
    (useButtonClickSounds as jest.Mock).mockImplementation(() => ({
      buttonHandler: jest.fn((type, text, speak) => speak(text)),
      isSpeaking: false,
    }));
  });

  it('renders the page with all components', () => {
    render(<JoinRoomPage />);
    
    expect(screen.getByText('GRAB A TABLET AND FOLLOW THE PICTURES BELLOW')).toBeInTheDocument();
    expect(screen.getByText('Scan Below')).toBeInTheDocument();
    expect(screen.getByTestId('mock-camera')).toBeInTheDocument();
  });

  // ... rest of your test cases remain the same ...
});