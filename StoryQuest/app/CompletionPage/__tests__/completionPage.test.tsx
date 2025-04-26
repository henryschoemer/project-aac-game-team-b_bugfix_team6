import { render, screen } from '@testing-library/react';
import CompletionPage from '@/CompletionPage/page';

// Only mock what's absolutely necessary
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() })
}));

jest.mock('use-sound', () => () => [jest.fn()]);

test('renders completion page', () => {
  render(<CompletionPage />);
  expect(screen.getByText('Story Completed')).toBeInTheDocument();
});