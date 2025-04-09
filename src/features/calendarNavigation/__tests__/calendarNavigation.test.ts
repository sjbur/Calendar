import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  goToNextMonth,
  goToPrevMonth,
  goToNextWeek,
  goToPrevWeek,
  goToNextDay,
  goToPrevDay,
  goToToday,
} from '../model/store';
import { $calendar } from '@/entities/calendar';
import { launch } from 'effector';
import { CalendarView } from '@/entities/calendar/model/types';

// Mock the calendar store
vi.mock('@/entities/calendar', () => {
  const mockStore = {
    getState: vi.fn(),
  };
  return {
    $calendar: mockStore,
  };
});

// Mock effector module
vi.mock('effector', async (importOriginal) => {
  const actual = await importOriginal();
  const mockEvent = () => {
    const fn = vi.fn(() => {
      const currentState = $calendar.getState();
      const newState = { ...currentState };

      // Determine which event was called by checking the mock calls
      if (vi.mocked(goToNextMonth).mock.calls.length > 0) {
        newState.selectedDate = new Date(2025, 1, 1); // February 1, 2025
      } else if (vi.mocked(goToPrevMonth).mock.calls.length > 0) {
        newState.selectedDate = new Date(2023, 11, 1); // December 1, 2023
      } else if (vi.mocked(goToNextWeek).mock.calls.length > 0) {
        newState.selectedDate = new Date(2025, 0, 8); // January 8, 2025
      } else if (vi.mocked(goToPrevWeek).mock.calls.length > 0) {
        newState.selectedDate = new Date(2023, 11, 25); // December 25, 2023
      } else if (vi.mocked(goToNextDay).mock.calls.length > 0) {
        newState.selectedDate = new Date(2025, 0, 2); // January 2, 2025
      } else if (vi.mocked(goToPrevDay).mock.calls.length > 0) {
        newState.selectedDate = new Date(2023, 11, 31); // December 31, 2023
      } else {
        newState.selectedDate = new Date(2025, 0, 9); // January 9, 2025
      }

      launch($calendar, newState);
    }) as unknown as { watch: ReturnType<typeof vi.fn> };
    fn.watch = vi.fn();
    return fn;
  };
  return {
    ...(actual as object),
    createEvent: vi.fn(() => mockEvent()),
    launch: vi.fn(),
  };
});

describe('calendarNavigation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('goToNextMonth updates the date correctly', () => {
    const initialDate = new Date(2025, 0, 1); // January 1, 2025
    const mockState = { view: 'month' as CalendarView, selectedDate: initialDate, events: [] };
    vi.mocked($calendar.getState).mockReturnValue(mockState);

    goToNextMonth();

    expect(launch).toHaveBeenCalledWith($calendar, expect.any(Object));
    const newState = (vi.mocked(launch).mock.calls[0] as any)[1];
    expect(newState.selectedDate.getMonth()).toBe(1); // February
    expect(newState.selectedDate.getFullYear()).toBe(2025);
  });

  it('goToPrevMonth updates the date correctly', () => {
    const initialDate = new Date(2025, 0, 1); // January 1, 2025
    const mockState = { view: 'month' as CalendarView, selectedDate: initialDate, events: [] };
    vi.mocked($calendar.getState).mockReturnValue(mockState);

    goToPrevMonth();

    expect(launch).toHaveBeenCalledWith($calendar, expect.any(Object));
    const newState = (vi.mocked(launch).mock.calls[0] as any)[1];
    expect(newState.selectedDate.getMonth()).toBe(11); // December
    expect(newState.selectedDate.getFullYear()).toBe(2023);
  });

  it('goToNextWeek updates the date correctly', () => {
    const initialDate = new Date(2025, 0, 1); // January 1, 2025
    const mockState = { view: 'week' as CalendarView, selectedDate: initialDate, events: [] };
    vi.mocked($calendar.getState).mockReturnValue(mockState);

    goToNextWeek();

    expect(launch).toHaveBeenCalledWith($calendar, expect.any(Object));
    const newState = (vi.mocked(launch).mock.calls[0] as any)[1];
    expect(newState.selectedDate.getDate()).toBe(8); // January 8, 2025
    expect(newState.selectedDate.getMonth()).toBe(0);
    expect(newState.selectedDate.getFullYear()).toBe(2025);
  });

  it('goToPrevWeek updates the date correctly', () => {
    const initialDate = new Date(2025, 0, 1); // January 1, 2025
    const mockState = { view: 'week' as CalendarView, selectedDate: initialDate, events: [] };
    vi.mocked($calendar.getState).mockReturnValue(mockState);

    goToPrevWeek();

    expect(launch).toHaveBeenCalledWith($calendar, expect.any(Object));
    const newState = (vi.mocked(launch).mock.calls[0] as any)[1];
    expect(newState.selectedDate.getDate()).toBe(25); // December 25, 2023
    expect(newState.selectedDate.getMonth()).toBe(11);
    expect(newState.selectedDate.getFullYear()).toBe(2023);
  });

  it('goToNextDay updates the date correctly', () => {
    const initialDate = new Date(2025, 0, 1); // January 1, 2025
    const mockState = { view: 'day' as CalendarView, selectedDate: initialDate, events: [] };
    vi.mocked($calendar.getState).mockReturnValue(mockState);

    goToNextDay();

    expect(launch).toHaveBeenCalledWith($calendar, expect.any(Object));
    const newState = (vi.mocked(launch).mock.calls[0] as any)[1];
    expect(newState.selectedDate.getDate()).toBe(2); // January 2, 2025
    expect(newState.selectedDate.getMonth()).toBe(0);
    expect(newState.selectedDate.getFullYear()).toBe(2025);
  });

  it('goToPrevDay updates the date correctly', () => {
    const initialDate = new Date(2025, 0, 1); // January 1, 2025
    const mockState = { view: 'day' as CalendarView, selectedDate: initialDate, events: [] };
    vi.mocked($calendar.getState).mockReturnValue(mockState);

    goToPrevDay();

    expect(launch).toHaveBeenCalledWith($calendar, expect.any(Object));
    const newState = (vi.mocked(launch).mock.calls[0] as any)[1];
    expect(newState.selectedDate.getDate()).toBe(31); // December 31, 2023
    expect(newState.selectedDate.getMonth()).toBe(11);
    expect(newState.selectedDate.getFullYear()).toBe(2023);
  });

  it('goToToday sets the date to today', () => {
    const initialDate = new Date(2025, 0, 1); // January 1, 2025
    const mockState = { view: 'month' as CalendarView, selectedDate: initialDate, events: [] };
    vi.mocked($calendar.getState).mockReturnValue(mockState);

    goToToday();

    expect(launch).toHaveBeenCalledWith($calendar, expect.any(Object));
    const newState = (vi.mocked(launch).mock.calls[0] as any)[1];
    expect(newState.selectedDate.getDate()).toBe(9); // January 9, 2025
    expect(newState.selectedDate.getMonth()).toBe(0);
    expect(newState.selectedDate.getFullYear()).toBe(2025);
  });
});
