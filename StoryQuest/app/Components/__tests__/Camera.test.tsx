import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Camera from '../Camera';
import '@testing-library/jest-dom';

// Mock the MediaDevices API
const mockGetUserMedia = jest.fn(async () => {
  const mockStream = {
    getTracks: () => [
      { 
        stop: jest.fn(), 
        kind: 'video',
        // Add all required MediaStreamTrack properties
        id: 'mock-track-id',
        enabled: true,
        muted: false,
        readyState: 'live',
        contentHint: '',
        onended: null,
        onmute: null,
        onunmute: null,
        applyConstraints: jest.fn(),
        getConstraints: jest.fn(),
        getSettings: jest.fn(),
        getCapabilities: jest.fn(),
        clone: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn()
      }
    ],
    // Add all required MediaStream properties
    active: true,
    id: 'mock-stream-id',
    onaddtrack: null,
    onremovetrack: null,
    addTrack: jest.fn(),
    removeTrack: jest.fn(),
    clone: jest.fn(),
    getAudioTracks: jest.fn(),
    getVideoTracks: jest.fn(),
    getTrackById: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  } as unknown as MediaStream;

  return mockStream;
});

// Mock jsQR library
const mockJsQR = jest.fn();

// Mock HTML elements and methods
const mockPlay = jest.fn();
const mockDrawImage = jest.fn();
const mockGetContext = jest.fn(() => ({
  drawImage: mockDrawImage,
  getImageData: jest.fn(() => ({
    data: new Uint8ClampedArray(100),
    width: 10,
    height: 10
  })),
  putImageData: jest.fn(),
  beginPath: jest.fn(),
  lineWidth: 0,
  strokeStyle: '',
  moveTo: jest.fn(),
  lineTo: jest.fn(),
  stroke: jest.fn()
}));

beforeAll(() => {
  // Properly mock MediaStream with all required properties
  class MockMediaStream {
    active = true;
    id = 'mock-stream-id';
    onaddtrack = null;
    onremovetrack = null;
    
    constructor(public tracks: MediaStreamTrack[] = []) {}
    
    getTracks() {
      return this.tracks;
    }
    
    addTrack(track: MediaStreamTrack) {
      this.tracks.push(track);
    }
    
    removeTrack(track: MediaStreamTrack) {
      const index = this.tracks.indexOf(track);
      if (index > -1) this.tracks.splice(index, 1);
    }
    
    clone() {
      return new MockMediaStream([...this.tracks]);
    }
    
    getAudioTracks() {
      return this.tracks.filter(t => t.kind === 'audio');
    }
    
    getVideoTracks() {
      return this.tracks.filter(t => t.kind === 'video');
    }
    
    getTrackById(id: string) {
      return this.tracks.find(t => t.id === id) || null;
    }
    
    addEventListener() {}
    removeEventListener() {}
    dispatchEvent(event: Event) {
      return true;
    }
  }

  Object.defineProperty(global, 'MediaStream', {
    value: MockMediaStream,
    writable: true
  });

  Object.defineProperty(global.navigator, 'mediaDevices', {
    value: {
      getUserMedia: mockGetUserMedia
    },
    writable: true
  });

  Object.defineProperty(global, 'jsQR', {
    value: mockJsQR,
    writable: true
  });

  Object.defineProperty(HTMLVideoElement.prototype, 'play', {
    value: mockPlay,
    writable: true
  });

  Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
    value: mockGetContext,
    writable: true
  });

  Object.defineProperty(HTMLCanvasElement.prototype, 'toDataURL', {
    value: jest.fn(() => 'data:image/png;base64,mockImageData'),
    writable: true
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('Camera Component', () => {
  const mockSetHotspotImage = jest.fn();

  test('renders camera component', () => {
    render(<Camera setHotspotImage={mockSetHotspotImage} />);
    expect(screen.getByRole('button', { name: /capture/i })).toBeInTheDocument();
  });

  test('attempts to start camera on mount', async () => {
    render(<Camera setHotspotImage={mockSetHotspotImage} />);
    
    await waitFor(() => {
      expect(mockGetUserMedia).toHaveBeenCalledWith({
        video: { 
          facingMode: "environment",
          width: { ideal: 640 },
          height: { ideal: 480 }
        }
      });
      expect(mockPlay).toHaveBeenCalled();
    });
  });

  test('falls back to front camera if back camera fails', async () => {
    mockGetUserMedia.mockRejectedValueOnce(new Error('Back camera error'));
    
    render(<Camera setHotspotImage={mockSetHotspotImage} />);
    
    await waitFor(() => {
      expect(mockGetUserMedia).toHaveBeenCalledWith({
        video: { 
          facingMode: "user",
          width: { ideal: 640 },
          height: { ideal: 480 }
        }
      });
    });
  });

  test('shows error message when camera access fails', async () => {
    mockGetUserMedia.mockRejectedValue(new Error('Camera access denied'));
    
    render(<Camera setHotspotImage={mockSetHotspotImage} />);
    
    await waitFor(() => {
      expect(screen.getByText(/could not access camera/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();
    });
  });

  test('handles capture button click', async () => {
    render(<Camera setHotspotImage={mockSetHotspotImage} />);
    
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /capture/i })).not.toBeDisabled();
    });
    
    fireEvent.click(screen.getByRole('button', { name: /capture/i }));
    
    await waitFor(() => {
      expect(mockGetContext).toHaveBeenCalled();
      expect(mockDrawImage).toHaveBeenCalled();
      expect(mockSetHotspotImage).toHaveBeenCalledWith('data:image/png;base64,mockImageData');
    });
  });

  test('scans for QR codes when camera is active', async () => {
    // Mock a successful QR code detection
    mockJsQR.mockReturnValueOnce({
      data: 'qrCodeData',
      location: {
        topLeftCorner: { x: 0, y: 0 },
        topRightCorner: { x: 10, y: 0 },
        bottomRightCorner: { x: 10, y: 10 },
        bottomLeftCorner: { x: 0, y: 10 }
      }
    });
    
    render(<Camera setHotspotImage={mockSetHotspotImage} />);
    
    await waitFor(() => {
      expect(mockJsQR).toHaveBeenCalled();
      expect(mockSetHotspotImage).toHaveBeenCalledWith('data:image/png;base64,mockImageData');
    });
  });

  test('cleans up camera stream on unmount', async () => {
    const stopTrackMock = jest.fn();
    mockGetUserMedia.mockResolvedValueOnce({
      getTracks: () => [{ 
        stop: stopTrackMock,
        kind: 'video',
        id: 'mock-track-id',
        enabled: true,
        muted: false,
        readyState: 'live',
        contentHint: '',
        onended: null,
        onmute: null,
        onunmute: null,
        applyConstraints: jest.fn(),
        getConstraints: jest.fn(),
        getSettings: jest.fn(),
        getCapabilities: jest.fn(),
        clone: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn()
      }],
      // Other MediaStream properties
      active: true,
      id: 'mock-stream-id',
      onaddtrack: null,
      onremovetrack: null,
      addTrack: jest.fn(),
      removeTrack: jest.fn(),
      clone: jest.fn(),
      getAudioTracks: jest.fn(),
      getVideoTracks: jest.fn(),
      getTrackById: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn()
    } as unknown as MediaStream);
    
    const { unmount } = render(<Camera setHotspotImage={mockSetHotspotImage} />);
    
    await waitFor(() => {
      expect(mockGetUserMedia).toHaveBeenCalled();
    });
    
    unmount();
    
    expect(stopTrackMock).toHaveBeenCalled();
  });
});