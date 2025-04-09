import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { WeekView } from '../WeekView';

// Create hoisted mock functions
const mockOpenEventModal = vi.hoisted(() => vi.fn());
const mockSelectEvent = vi.hoisted(() => vi.fn());
const mockSetView = vi.hoisted(() => vi.fn());

// Mock eventManagement module
vi.mock('@/features/eventManagement', () => ({
  openEventModal: mockOpenEventModal,
  selectEvent: mockSelectEvent,
}));

// Mock calendarNavigation module
vi.mock('@/features/calendarNavigation', () => ({
  setView: mockSetView,
}));

// Mock effector-react module
vi.mock('effector-react', () => ({
  useUnit: vi.fn((stores) => {
    if (Array.isArray(stores)) {
      return [
        {
          selectedDate: new Date(2024, 0, 1), // January 1, 2024
          events: [
            {
              id: '1',
              title: 'Test Event',
              start: new Date(2024, 0, 1, 10, 0), // 10:00 AM
              end: new Date(2024, 0, 1, 11, 0), // 11:00 AM
            },
          ],
        },
        [
          new Date(2024, 0, 1), // Monday
          new Date(2024, 0, 2), // Tuesday
          new Date(2024, 0, 3), // Wednesday
          new Date(2024, 0, 4), // Thursday
          new Date(2024, 0, 5), // Friday
          new Date(2024, 0, 6), // Saturday
          new Date(2024, 0, 7), // Sunday
        ],
      ];
    }
    return {};
  }),
}));

// Mock calendar store
vi.mock('@/entities/calendar', () => ({
  $calendar: {
    getState: vi.fn(),
  },
  $weekDays: {
    getState: vi.fn(),
  },
  getWeekDaysFx: vi.fn(),
}));

describe('WeekView', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render week days', () => {
    render(<WeekView />);

    const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    weekDays.forEach((day) => {
      expect(screen.getByText(day)).toBeInTheDocument();
    });
  });

  it('should render time slots', () => {
    render(<WeekView />);

    const timeSlots = Array.from({ length: 24 }, (_, i) => {
      const hour = i.toString().padStart(2, '0');
      return `${hour}:00`;
    });

    timeSlots.forEach((time) => {
      expect(screen.getByText(time)).toBeInTheDocument();
    });
  });

  it('should render events', () => {
    render(<WeekView />);

    expect(screen.getByText('Test Event')).toBeInTheDocument();
  });

  it('should call openEventModal when clicking on a time slot', () => {
    render(<WeekView />);

    // Find and click on a time slot (10:00)
    const timeSlots = screen.getAllByRole('button', { name: /time slot/i });
    const timeSlot = timeSlots[10]; // 10:00 time slot
    fireEvent.click(timeSlot);

    expect(mockOpenEventModal).toHaveBeenCalled();
  });

  it('should call selectEvent when clicking on an event', () => {
    render(<WeekView />);

    fireEvent.click(screen.getByText('Test Event'));

    expect(mockSelectEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        id: '1',
        title: 'Test Event',
      })
    );
  });
});
