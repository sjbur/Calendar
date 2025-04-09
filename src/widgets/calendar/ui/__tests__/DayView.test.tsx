import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DayView } from '../DayView';

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
    ],
  })),
}));

// Mock calendar store
vi.mock('@/entities/calendar', () => ({
  $calendar: {
    getState: vi.fn(),
  },
}));

describe('DayView', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the current date', () => {
    render(<DayView />);

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Monday, January 1');
  });

  it('should render time slots for all hours', () => {
    render(<DayView />);

    // Check if time slots are rendered
    expect(screen.getByRole('time', { name: '00:00' })).toBeInTheDocument();
    expect(screen.getByRole('time', { name: '12:00' })).toBeInTheDocument();
    expect(screen.getByRole('time', { name: '23:00' })).toBeInTheDocument();
  });

  it('should render events for the day', () => {
    render(<DayView />);

    // Check if events are rendered
    expect(screen.getByRole('button', { name: 'event Test Event' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'event Another Event' })).toBeInTheDocument();
  });

  it('should call openEventModal when clicking on a time slot', () => {
    render(<DayView />);

    // Click on the 10:00 time slot
    fireEvent.click(screen.getByRole('button', { name: 'time slot 10:00' }));

    expect(mockOpenEventModal).toHaveBeenCalled();
  });

  it('should call selectEvent when clicking on an event', () => {
    render(<DayView />);

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
