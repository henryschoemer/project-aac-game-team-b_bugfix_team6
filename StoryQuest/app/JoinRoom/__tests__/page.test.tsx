import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import JoinRoomPage from '@/JoinRoom/page';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebaseControls/firebaseConfig';
import useQuickTextToSpeech from '@/Components/useQuickTextToSpeech';
import useButtonFeedback from '@/Components/useButtonClickSounds';
import jsQR from 'jsqr';

// Mock the required dependencies
jest.mock('firebase/firestore');
jest.mock('../../firebaseControls/firebaseConfig');
jest.mock('use-sound', () => () => [jest.fn()]);
jest.mock('@/Components/useQuickTextToSpeech', () => ({
  __esModule: true,
  default: () => ({ speak: jest.fn() })
}));
jest.mock('@/Components/useButtonFeedback', () => ({
  __esModule: true,
  default: () => ({ buttonHandler: jest.fn(), isSpeaking: false })
}));
jest.mock('@/Components/Camera', () => ({
  __esModule: true,
  default: ({ setHotspotImage }) => (
    <div data-testid="camera-mock">
      <button
        data-testid="capture-button"
        onClick={() => setHotspotImage('mock-image-data')}
      >
        Capture
      </button>
    </div>
  )
}));
jest.mock('jsqr');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }) => <a href={href}>{children}</a>,
}));

// Mock window.Image for QR code processing
const mockImageInstance = {
  onload: null,
  onerror: null,
  width: 300,
  height: 300,
  src: '',
};
window.Image = jest.fn(() => mockImageInstance);

// Mock canvas and context for QR code processing
const mockGetImageData = jest.fn(() => ({
  data: new Uint8ClampedArray(300 * 300 * 4),
  width: 300,
  height: 300,
}));
const mockContext = {
  drawImage: jest.fn(),
  getImageData: mockGetImageData,
};
document.createElement = jest.fn((tagName) => {
  if (tagName === 'canvas') {
    return {
      getContext: jest.fn(() => mockContext),
      width: 0,
      height: 0,
    };
  }
  return document.createElement.mock.results?.[0]?.value || {};
});

describe('JoinRoomPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { href: '' }
    });
  });

  it('renders the page with all required elements', () => {
    render(<JoinRoomPage />);

    // Check for key UI elements
    expect(screen.getByText("Scan Below")).toBeInTheDocument();
    expect(screen.getByText("GRAB A TABLET AND FOLLOW THE PICTURES BELLOW")).toBeInTheDocument();
    expect(screen.getByText("Point the camera")).toBeInTheDocument();
    expect(screen.getByText("Find this picture")).toBeInTheDocument();
    expect(screen.getByText("Wait for scan")).toBeInTheDocument();
    expect(screen.getByText("Play together")).toBeInTheDocument();
    expect(screen.getByTestId("camera-mock")).toBeInTheDocument();
  });

  it('processes QR code successfully and redirects to the game page', async () => {
    // Mock successful QR decode
    jsQR.mockReturnValueOnce({ data: 'room123' });
    
    // Mock successful room lookup
    getDoc.mockResolvedValueOnce({ exists: () => true });

    render(<JoinRoomPage />);

    // Trigger image capture
    fireEvent.click(screen.getByTestId('capture-button'));

    // Simulate successful image load
    await act(async () => {
      mockImageInstance.onload();
    });
    
    await waitFor(() => {
      expect(getDoc).toHaveBeenCalledWith(doc(db, "rooms", "room123"));
      expect(window.location.href).toBe('/Gameplay/room123/');
    });
  });

  it('handles QR code with full URL format correctly', async () => {
    // Mock successful QR decode with URL format
    jsQR.mockReturnValueOnce({ data: 'http://example.com/Gameplay/room123/storyABC' });
    
    // Mock successful room lookup
    getDoc.mockResolvedValueOnce({ exists: () => true });

    render(<JoinRoomPage />);

    // Trigger image capture
    fireEvent.click(screen.getByTestId('capture-button'));

    // Simulate successful image load
    await act(async () => {
      mockImageInstance.onload();
    });
    
    await waitFor(() => {
      expect(getDoc).toHaveBeenCalledWith(doc(db, "rooms", "room123"));
      expect(window.location.href).toBe('/Gameplay/room123/storyABC');
    });
  });

  it('shows error message when room is not found', async () => {
    // Mock successful QR decode
    jsQR.mockReturnValueOnce({ data: 'invalid-room' });
    
    // Mock unsuccessful room lookup
    getDoc.mockResolvedValueOnce({ exists: () => false });

    render(<JoinRoomPage />);

    // Trigger image capture
    fireEvent.click(screen.getByTestId('capture-button'));

    // Simulate successful image load
    await act(async () => {
      mockImageInstance.onload();
    });
    
    await waitFor(() => {
      expect(screen.getByText("Room not found. Please check the QR code and try again.")).toBeInTheDocument();
    });
  });

  it('shows error message when QR code processing fails', async () => {
    // Mock failed QR decode
    jsQR.mockReturnValueOnce(null);

    render(<JoinRoomPage />);

    // Trigger image capture
    fireEvent.click(screen.getByTestId('capture-button'));

    // Simulate successful image load
    await act(async () => {
      mockImageInstance.onload();
    });
    
    await waitFor(() => {
      expect(screen.getByText("No QR code detected. Please position the code clearly and try again.")).toBeInTheDocument();
    });
  });

  it('shows error message when image loading fails', async () => {
    render(<JoinRoomPage />);

    // Trigger image capture
    fireEvent.click(screen.getByTestId('capture-button'));

    // Simulate image load error
    await act(async () => {
      mockImageInstance.onerror();
    });
    
    await waitFor(() => {
      expect(screen.getByText("Error loading captured image. Please try again.")).toBeInTheDocument();
    });
  });

  it('shows failure popup after multiple failed attempts', async () => {
    // Mock failed QR decode multiple times
    jsQR.mockReturnValue(null);

    render(<JoinRoomPage />);

    // Trigger multiple failed captures
    for (let i = 0; i < 8; i++) {
      fireEvent.click(screen.getByTestId('capture-button'));
      
      // Simulate successful image load but failed QR detection
      await act(async () => {
        mockImageInstance.onload();
      });
    }
    
    // Trigger one more to exceed threshold
    fireEvent.click(screen.getByTestId('capture-button'));
    await act(async () => {
      mockImageInstance.onload();
    });
    
    // Now the popup should be visible
    await waitFor(() => {
      expect(screen.getByText("Need help scanning?")).toBeInTheDocument();
      expect(screen.getByText("Please follow the picture and hold the camera in veiw of the QR Code")).toBeInTheDocument();
      expect(screen.getByText("Try Again")).toBeInTheDocument();
    });
  });

  it('closes the failure popup and resets failed attempts', async () => {
    // Mock failed QR decode multiple times
    jsQR.mockReturnValue(null);

    render(<JoinRoomPage />);

    // Trigger multiple failed captures to show popup
    for (let i = 0; i < 9; i++) {
      fireEvent.click(screen.getByTestId('capture-button'));
      
      // Simulate successful image load but failed QR detection
      await act(async () => {
        mockImageInstance.onload();
      });
    }
    
    // Popup should be visible
    await waitFor(() => {
      expect(screen.getByText("Need help scanning?")).toBeInTheDocument();
    });
    
    // Close the popup
    fireEvent.click(screen.getByText("Try Again"));
    
    // Popup should be gone
    await waitFor(() => {
      expect(screen.queryByText("Need help scanning?")).not.toBeInTheDocument();
    });
  });

  it('plays sound and speaks text when UI elements are clicked', async () => {
    const { buttonHandler } = useButtonFeedback();
    const { speak } = useQuickTextToSpeech();
    
    render(<JoinRoomPage />);
    
    // Click on instruction text
    fireEvent.click(screen.getByText("GRAB A TABLET AND FOLLOW THE PICTURES BELLOW"));
    
    expect(buttonHandler).toHaveBeenCalled();
    expect(speak).toHaveBeenCalled();
  });

  it('handles Firebase errors properly', async () => {
    // Mock successful QR decode
    jsQR.mockReturnValueOnce({ data: 'room123' });
    
    // Mock Firebase error
    getDoc.mockRejectedValueOnce(new Error('Firebase error'));

    render(<JoinRoomPage />);

    // Trigger image capture
    fireEvent.click(screen.getByTestId('capture-button'));

    // Simulate successful image load
    await act(async () => {
      mockImageInstance.onload();
    });
    
    await waitFor(() => {
      expect(screen.getByText("Error joining room. Please try again.")).toBeInTheDocument();
    });
  });

  it('prevents multiple simultaneous processing attempts', async () => {
    // Mock successful QR decode
    jsQR.mockReturnValue({ data: 'room123' });
    
    render(<JoinRoomPage />);

    // Trigger first image capture
    fireEvent.click(screen.getByTestId('capture-button'));
    
    // Immediately trigger second image capture (should be ignored)
    fireEvent.click(screen.getByTestId('capture-button'));

    // Simulate successful image load
    await act(async () => {
      mockImageInstance.onload();
    });
    
    // getDoc should only be called once
    await waitFor(() => {
      expect(getDoc).toHaveBeenCalledTimes(1);
    });
  });
});