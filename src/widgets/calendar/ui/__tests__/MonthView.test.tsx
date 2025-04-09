import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MonthView } from '../MonthView';

// Create hoisted mock functions
const mockOpenEventModal = vi.hoisted(() => vi.fn());
const mockSelectEvent = vi.hoisted(() => vi.fn());

// Mock eventManagement module
vi.mock('@/features/eventManagement', () => ({
  openEventModal: mockOpenEventModal,
  selectEvent: mockSelectEvent,
}));

// Mock effector-react module
vi.mock('effector-react', () => ({
  useUnit: vi.fn(() => ({
    selectedDate: new Date(2024, 0, 1), // January 1, 2024
    events: [
      {
        id: '1',
        title: 'Test Event',
        start: new Date(2024, 0, 1, 10, 0), // January 1, 2024 10:00 AM
        end: new Date(2024, 0, 1, 11, 0), // January 1, 2024 11:00 AM
      },
      {
        id: '2',
        title: 'Another Event',
        start: new Date(2024, 0, 1, 12, 0), // January 1, 2024 12:00 PM
        end: new Date(2024, 0, 1, 13, 0), // January 1, 2024 1:00 PM
      },
      {
        id: '3',
        title: 'Third Event',
        start: new Date(2024, 0, 1, 14, 0), // January 1, 2024 2:00 PM
        end: new Date(2024, 0, 1, 15, 0), // January 1, 2024 3:00 PM
      },
      {
        id: '4',
        title: 'Fourth Event',
        start: new Date(2024, 0, 1, 16, 0), // January 1, 2024 4:00 PM
        end: new Date(2024, 0, 1, 17, 0), // January 1, 2024 5:00 PM
      },
    ],
  })),
}));

// Mock calendar store
vi.mock('@/entities/calendar', () => ({
  $calendar: {
    getState: vi.fn(),
  },
}));

describe('MonthView', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render week days', () => {
    render(<MonthView />);

    const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    weekDays.forEach((day) => {
      expect(screen.getByText(day)).toBeInTheDocument();
    });
  });

  it('should render days of the month', () => {
    render(<MonthView />);

    // Check if the first day of January 2024 is rendered
    expect(screen.getByRole('button', { name: 'day 1 current month' })).toBeInTheDocument();
  });

  it('should render events for a day', () => {
    render(<MonthView />);

    // Check if events are rendered
    expect(screen.getByRole('button', { name: 'event Test Event' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'event Another Event' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'event Third Event' })).toBeInTheDocument();
    expect(screen.getByText('+1 more')).toBeInTheDocument();
  });

  it('should call openEventModal when clicking on a day', () => {
    render(<MonthView />);

    // Click on the first day of the month
    fireEvent.click(screen.getByRole('button', { name: 'day 1 current month' }));

    expect(mockOpenEventModal).toHaveBeenCalled();
  });

  it('should call selectEvent when clicking on an event', () => {
    render(<MonthView />);

    // Click on the first event
    fireEvent.click(screen.getByRole('button', { name: 'event Test Event' }));

    expect(mockSelectEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        id: '1',
        title: 'Test Event',
      })
    );
  });
});
