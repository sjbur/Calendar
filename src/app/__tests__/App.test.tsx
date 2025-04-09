import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { App } from '../App';

// Mock child components
vi.mock('@widgets/calendar/ui/Calendar', () => ({
  Calendar: () => <div data-testid="calendar">Calendar Component</div>,
}));

vi.mock('@features/eventManagement', () => ({
  EventModal: () => <div data-testid="event-modal">Event Modal Component</div>,
}));

describe('App', () => {
  it('should render the header with correct title', () => {
    render(<App />);

    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass('bg-white', 'border-b', 'border-calendar-border', 'px-6', 'py-3');

    const title = screen.getByText('Calendar');
    expect(title).toBeInTheDocument();
    expect(title).toHaveClass('text-2xl', 'font-semibold', 'text-calendar-blue');
    expect(title.tagName).toBe('H1');
  });

  it('should render the main content with Calendar and EventModal', () => {
    render(<App />);

    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();

    // Check for the presence of both components
    expect(screen.getByTestId('calendar')).toBeInTheDocument();
    expect(screen.getByTestId('event-modal')).toBeInTheDocument();
  });

  it('should have the correct root container classes', () => {
    render(<App />);

    const root = screen.getByTestId('app-root');
    expect(root).toHaveClass('min-h-screen', 'bg-white');
  });
});
