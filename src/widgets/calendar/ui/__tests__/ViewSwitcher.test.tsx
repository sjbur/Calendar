import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ViewSwitcher } from '../ViewSwitcher';
import { $calendar } from '@/entities/calendar';
import { setView } from '@/features/calendarNavigation';

// Create hoisted mock functions
const mockSetView = vi.hoisted(() => vi.fn());

// Mock effector-react module
vi.mock('effector-react', () => ({
  useUnit: vi.fn((store) => {
    if (store === $calendar) {
      return { view: 'week' };
    }
    if (store === setView) {
      return mockSetView;
    }
    return {};
  }),
}));

// Mock calendar store
vi.mock('@/entities/calendar', () => ({
  $calendar: {
    getState: vi.fn(),
  },
}));

// Mock calendarNavigation module
vi.mock('@/features/calendarNavigation', () => ({
  setView: mockSetView,
}));

describe('ViewSwitcher', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render all view options', () => {
    render(<ViewSwitcher />);

    expect(screen.getByText('Day')).toBeInTheDocument();
    expect(screen.getByText('Week')).toBeInTheDocument();
    expect(screen.getByText('Month')).toBeInTheDocument();
  });

  it('should highlight current view', () => {
    render(<ViewSwitcher />);

    const weekButton = screen.getByText('Week');
    expect(weekButton).toHaveClass('bg-calendar-blue');
  });

  it('should call setView when view is changed', () => {
    render(<ViewSwitcher />);

    fireEvent.click(screen.getByText('Month'));
    expect(mockSetView).toHaveBeenCalledWith('month');
  });
});
