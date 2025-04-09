import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ViewSwitcher } from '../ViewSwitcher';
import { useUnit } from 'effector-react';

// Mock effector-react module
vi.mock('effector-react', () => ({
  useUnit: vi.fn((stores) => {
    if (Array.isArray(stores)) {
      return [{ view: 'week' }, vi.fn()];
    }
    return { view: 'week' };
  }),
}));

// Mock calendar store
vi.mock('@/entities/calendar', () => ({
  $calendar: {
    getState: vi.fn(),
  },
}));

// Mock calendarNavigation module
vi.mock('@/features/calendarNavigation', () => {
  const setView = vi.fn();
  return {
    setView,
  };
});

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
    expect(vi.mocked(useUnit).mock.results[0].value[1]).toHaveBeenCalledWith('month');
  });
});
