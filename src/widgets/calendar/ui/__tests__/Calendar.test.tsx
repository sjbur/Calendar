import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Calendar } from '../Calendar';
import { useUnit } from 'effector-react';
import { CalendarView } from '@/entities/calendar/model/types';

type UseUnitReturn = { view: CalendarView; selectedDate: Date };

const mockUseUnit = useUnit as unknown as () => UseUnitReturn;

// Create hoisted mock functions
const mockGoToNextMonth = vi.hoisted(() => vi.fn());
const mockGoToPrevMonth = vi.hoisted(() => vi.fn());
const mockGoToNextWeek = vi.hoisted(() => vi.fn());
const mockGoToPrevWeek = vi.hoisted(() => vi.fn());
const mockGoToNextDay = vi.hoisted(() => vi.fn());
const mockGoToPrevDay = vi.hoisted(() => vi.fn());
const mockGoToToday = vi.hoisted(() => vi.fn());

// Mock calendarNavigation module
vi.mock('@/features/calendarNavigation', () => ({
  goToNextMonth: mockGoToNextMonth,
  goToPrevMonth: mockGoToPrevMonth,
  goToNextWeek: mockGoToNextWeek,
  goToPrevWeek: mockGoToPrevWeek,
  goToNextDay: mockGoToNextDay,
  goToPrevDay: mockGoToPrevDay,
  goToToday: mockGoToToday,
}));

// Mock effector-react module
vi.mock('effector-react', () => ({
  useUnit: vi.fn(),
}));

// Mock calendar store
vi.mock('@/entities/calendar', () => ({
  $calendar: {
    getState: vi.fn(),
  },
}));

// Mock child components
vi.mock('../ViewSwitcher', () => ({
  ViewSwitcher: () => <div data-testid="view-switcher" />,
}));

vi.mock('../MonthView', () => ({
  MonthView: () => <div data-testid="month-view" />,
}));

vi.mock('../WeekView', () => ({
  WeekView: () => <div data-testid="week-view" />,
}));

vi.mock('../DayView', () => ({
  DayView: () => <div data-testid="day-view" />,
}));

describe('Calendar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(mockUseUnit).mockReturnValue({
      view: 'month',
      selectedDate: new Date(2024, 0, 1),
    });
  });

  it('should render the current month and year', () => {
    render(<Calendar />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('January 2024');
  });

  it('should render the ViewSwitcher component', () => {
    render(<Calendar />);

    expect(screen.getByTestId('view-switcher')).toBeInTheDocument();
  });

  it('should render MonthView when view is month', () => {
    render(<Calendar />);

    expect(screen.getByTestId('month-view')).toBeInTheDocument();
  });

  it('should render WeekView when view is week', () => {
    vi.mocked(mockUseUnit).mockReturnValueOnce({
      view: 'week',
      selectedDate: new Date(2024, 0, 1),
    });

    render(<Calendar />);

    expect(screen.getByTestId('week-view')).toBeInTheDocument();
  });

  it('should render DayView when view is day', () => {
    vi.mocked(mockUseUnit).mockReturnValueOnce({
      view: 'day',
      selectedDate: new Date(2024, 0, 1),
    });

    render(<Calendar />);

    expect(screen.getByTestId('day-view')).toBeInTheDocument();
  });

  it('should call navigation functions when clicking buttons in month view', () => {
    render(<Calendar />);

    fireEvent.click(screen.getByRole('button', { name: 'Previous Month' }));
    expect(mockGoToPrevMonth).toHaveBeenCalled();

    fireEvent.click(screen.getByRole('button', { name: 'Next Month' }));
    expect(mockGoToNextMonth).toHaveBeenCalled();

    fireEvent.click(screen.getByRole('button', { name: 'Go to Today' }));
    expect(mockGoToToday).toHaveBeenCalled();
  });

  it('should call navigation functions when clicking buttons in week view', () => {
    vi.mocked(mockUseUnit).mockReturnValueOnce({
      view: 'week',
      selectedDate: new Date(2024, 0, 1),
    });

    render(<Calendar />);

    fireEvent.click(screen.getByRole('button', { name: 'Previous Week' }));
    expect(mockGoToPrevWeek).toHaveBeenCalled();

    fireEvent.click(screen.getByRole('button', { name: 'Next Week' }));
    expect(mockGoToNextWeek).toHaveBeenCalled();

    fireEvent.click(screen.getByRole('button', { name: 'Go to Today' }));
    expect(mockGoToToday).toHaveBeenCalled();
  });

  it('should call navigation functions when clicking buttons in day view', () => {
    vi.mocked(mockUseUnit).mockReturnValueOnce({
      view: 'day',
      selectedDate: new Date(2024, 0, 1),
    });

    render(<Calendar />);

    fireEvent.click(screen.getByRole('button', { name: 'Previous Day' }));
    expect(mockGoToPrevDay).toHaveBeenCalled();

    fireEvent.click(screen.getByRole('button', { name: 'Next Day' }));
    expect(mockGoToNextDay).toHaveBeenCalled();

    fireEvent.click(screen.getByRole('button', { name: 'Go to Today' }));
    expect(mockGoToToday).toHaveBeenCalled();
  });
});
