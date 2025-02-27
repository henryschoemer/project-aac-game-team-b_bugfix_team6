import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../page';
import stories from '../stories';

// Set up a mock for the stories import
jest.mock('../stories', () => ({
  __esModule: true,
  default: [
    {
      title: "The Garden Adventure",
      backgroundImage: "garden-background.webp",
      sections: [
        {
          phrase: "Look in the garden, there is a ___",
          words: {
            mouse: { image: "mouse.svg", x: 50, y: 80 },
            ladybug: { image: "ladybug.svg", x: 60, y: 90 },
          },
        },
      ],
    },
  ],
}));

// Set up a mock for the AACKeyboard component
jest.mock('../../Components/AACKeyboard', () => {
  return function DummyAACKeyboard({ onSelect, symbols }: { onSelect: (word: string) => void, symbols: Array<{ word: string }> }) {
    return (
      <div data-testid="aac-keyboard">
        {symbols.map((symbol: { word: string }) => (
          <button
            key={symbol.word}
            onClick={() => onSelect(symbol.word)}
            data-testid={`aac-button-${symbol.word}`}
          >
            {symbol.word}
          </button>
        ))}
        
        {/* Add an invalid word button for testing */}
        <button
          onClick={() => onSelect("invalid_word")}
          data-testid="aac-button-invalid"
        >
          invalid_word
        </button>
      </div>
    );
  };
});


//Actual tetsing part below
describe('Home Component', () => {
  beforeEach(() => {
    // Clears all mocks before each test
    jest.clearAllMocks();
  });


  it('renders without crashing', () => {
    render(<Home />);
    expect(screen.getByText(/Select Story:/i)).toBeInTheDocument();
  });


  it('initializes with the first story', () => {
    render(<Home />);
    expect(screen.getByText("Look in the garden, there is a ___")).toBeInTheDocument();
  });


  it('allows story selection from dropdown', () => {
    render(<Home />);
    const select = screen.getByLabelText(/Select Story:/i);
    expect(select).toBeInTheDocument();
    expect(select).toHaveValue('The Garden Adventure');
  });


  it('handles word selection through AAC keyboard', async () => {
    render(<Home />);
    
    // Find and click the "mouse" button in the AAC keyboard
    const mouseButton = screen.getByTestId('aac-button-mouse');
    fireEvent.click(mouseButton);

    // Check if the completed phrase appears
    expect(screen.getByText("Look in the garden, there is a mouse")).toBeInTheDocument();
  });


  it('displays images when words are selected', () => {
    render(<Home />);
    
    const mouseButton = screen.getByTestId('aac-button-mouse');
    fireEvent.click(mouseButton);

    // Check if the image is rendered with correct properties
    const images = document.querySelectorAll('img');
    const mouseImage = Array.from(images).find(img => img.src.includes('mouse.svg'));
    expect(mouseImage).toBeInTheDocument();
    expect(mouseImage).toHaveStyle({ left: '50%', top: '80%' });
  });


  it('shows "The End!" when all sections are completed', () => {
    render(<Home />);
    
    // Complete the only section in our mock story
    const mouseButton = screen.getByTestId('aac-button-mouse');
    fireEvent.click(mouseButton);

    // Check if "The End!" message appears
    expect(screen.getByText("The End!")).toBeInTheDocument();
  });

  
  it('handles invalid word selection gracefully', () => {
    const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});
    render(<Home />);
    
    // Click the invalid word button
    const invalidButton = screen.getByTestId('aac-button-invalid');
    fireEvent.click(invalidButton);

    // Check if alert was called with the correct message
    expect(mockAlert).toHaveBeenCalledWith('Word "invalid_word" not found in current section!');
    mockAlert.mockRestore();
  });
}); 