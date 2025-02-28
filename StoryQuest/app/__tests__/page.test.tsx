import {render, screen, fireEvent} from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import ProfilePage from "../../app/page";
import '@testing-library/jest-dom'
import AnimatedTitle from "@/HomePage/AnimatedTitle";
import Footer from '../../app/page';  // Adjust path if needed


describe('HomePage', () => {
    it('renders the text of the animated title correctly', () => {
        render(<AnimatedTitle/>);

        // Get text of title that was rendered
        const spans = screen.getAllByText(/./); // Matches any non-empty text from rendered text

        // Correct title characters
        const characters = ['S', 't', 'o', 'r', 'y', 'Q', 'u', 'e', 's', 't'];

        // Check that each character rendered matches with the correct character list of the title.
        spans.forEach((span, index) => {
            expect(span).toHaveTextContent(characters[index]); // Check if each span has the correct character
        });
    })

    it('renders the copyright text correctly', () => {
        render(<Footer/>);

        // Check that the correct copyright text is rendered on the homepage
        const copyrightText = screen.getByText(/Copyright © 2025 StoryQuest/i);
        expect(copyrightText).toBeInTheDocument();
    });




});


