import '@testing-library/jest-dom';

// Mock SpeechSynthesis API
class MockSpeechSynthesisUtterance {
    text: string;
    voice: SpeechSynthesisVoice | null;
    rate: number;
    onend: (() => void) | null;

    constructor(text: string) {
        this.text = text;
        this.voice = null;
        this.rate = 1;
        this.onend = null;
    }
}

const mockVoices = [
    { name: "Google UK English Male", lang: "en-GB" },
    { name: "Microsoft David - English (United States)", lang: "en-US" },
    { name: "Daniel", lang: "en-US" }
];

describe('',()=>{
    it('',()=>{

    });


})