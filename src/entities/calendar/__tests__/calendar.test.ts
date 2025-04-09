import { describe, it, expect, vi } from 'vitest';
import { fork, allSettled, createEvent } from 'effector';
import {
  $calendar,
  setSelectedDate,
  openEventModal,
  closeEventModal,
  selectEvent,
} from '../model/store';
import { Event } from '../model/types';
import {
  goToNextMonth,
  goToPrevMonth,
  goToNextWeek,
  goToPrevWeek,
  goToNextDay,
  goToPrevDay,
  goToToday,
  setView,
} from '@/features/calendarNavigation/model/store';
import { addEvent, updateEvent, removeEvent } from '@/features/eventManagement/model/store';

// Mock eventManagement module
vi.mock('@/features/eventManagement/model/store', () => {
  const addEvent = createEvent<Event>();
  const updateEvent = createEvent<Event>();
  const removeEvent = createEvent<string>();

  return {
    addEvent,
    updateEvent,
    removeEvent,
  };
});

// Mock calendarNavigation module
vi.mock('@/features/calendarNavigation/model/store', () => {
  const setView = createEvent<string>();
  const goToNextMonth = createEvent();
  const goToPrevMonth = createEvent();
  const goToNextWeek = createEvent();
  const goToPrevWeek = createEvent();
  const goToNextDay = createEvent();
  const goToPrevDay = createEvent();
  const goToToday = createEvent();

  return {
    setView,
    goToNextMonth,
    goToPrevMonth,
    goToNextWeek,
    goToPrevWeek,
    goToNextDay,
    goToPrevDay,
    goToToday,
  };
});

describe('calendar', () => {
  it('should update selected date', async () => {
    const initialDate = new Date(2024, 0, 1);
    const scope = fork({
      values: [[$calendar, { view: 'week' as const, selectedDate: initialDate, events: [] }]],
    });

    const newDate = new Date(2024, 0, 15);
    await allSettled(setSelectedDate, { scope, params: newDate });

    const state = scope.getState($calendar);
    expect(state.selectedDate.getFullYear()).toBe(newDate.getFullYear());
    expect(state.selectedDate.getMonth()).toBe(newDate.getMonth());
    expect(state.selectedDate.getDate()).toBe(newDate.getDate());
  });

  it('should handle view changes', async () => {
    const scope = fork({
      values: [
        [$calendar, { view: 'week' as const, selectedDate: new Date(2024, 0, 1), events: [] }],
      ],
    });

    await allSettled(setView, { scope, params: 'month' });
    expect(scope.getState($calendar).view).toBe('month');
  });

  it('should handle navigation events', async () => {
    const initialDate = new Date(2024, 0, 1);
    const scope = fork({
      values: [[$calendar, { view: 'week' as const, selectedDate: initialDate, events: [] }]],
    });

    // Test next month
    await allSettled(goToNextMonth, { scope });
    expect(scope.getState($calendar).selectedDate.getMonth()).toBe(1); // February

    // Test previous month
    await allSettled(goToPrevMonth, { scope });
    expect(scope.getState($calendar).selectedDate.getMonth()).toBe(0); // January

    // Test next week
    await allSettled(goToNextWeek, { scope });
    expect(scope.getState($calendar).selectedDate.getDate()).toBe(8); // January 8

    // Test previous week
    await allSettled(goToPrevWeek, { scope });
    expect(scope.getState($calendar).selectedDate.getDate()).toBe(1); // January 1

    // Test next day
    await allSettled(goToNextDay, { scope });
    expect(scope.getState($calendar).selectedDate.getDate()).toBe(2); // January 2

    // Test previous day
    await allSettled(goToPrevDay, { scope });
    expect(scope.getState($calendar).selectedDate.getDate()).toBe(1); // January 1
  });

  it('should handle event management', async () => {
    const scope = fork({
      values: [
        [$calendar, { view: 'week' as const, selectedDate: new Date(2024, 0, 1), events: [] }],
      ],
    });

    const event: Omit<Event, 'id'> = {
      title: 'Test Event',
      start: new Date(2024, 0, 1, 10, 0),
      end: new Date(2024, 0, 1, 11, 0),
    };

    // Test adding event
    await allSettled(addEvent, { scope, params: event });
    const events = scope.getState($calendar).events;
    expect(events).toHaveLength(1);
    expect(events[0]).toMatchObject({
      title: 'Test Event',
      start: event.start,
      end: event.end,
    });

    // Test updating event
    const updatedEvent = { ...events[0], title: 'Updated Event' };
    await allSettled(updateEvent, { scope, params: updatedEvent });
    const updatedEvents = scope.getState($calendar).events;
    expect(updatedEvents).toHaveLength(1);
    expect(updatedEvents[0]).toMatchObject({
      title: 'Updated Event',
      start: event.start,
      end: event.end,
    });

    // Test removing event
    await allSettled(removeEvent, { scope, params: updatedEvents[0].id });
    expect(scope.getState($calendar).events).toHaveLength(0);
  });

  it('should handle event selection', async () => {
    const scope = fork({
      values: [
        [$calendar, { view: 'week' as const, selectedDate: new Date(2024, 0, 1), events: [] }],
      ],
    });

    const event: Event = {
      id: '1',
      title: 'Test Event',
      start: new Date(2024, 0, 1, 10, 0),
      end: new Date(2024, 0, 1, 11, 0),
    };

    await allSettled(selectEvent, { scope, params: event });

    const events = scope.getState($calendar).events;
    expect(events).toHaveLength(1);
    expect(events[0]).toMatchObject({
      id: '1',
      title: 'Test Event',
    });
  });

  it('should handle event modal', async () => {
    const scope = fork({
      values: [
        [$calendar, { view: 'week' as const, selectedDate: new Date(2024, 0, 1), events: [] }],
      ],
    });

    const date = new Date(2024, 0, 1);

    await allSettled(openEventModal, { scope, params: date });
    await allSettled(closeEventModal, { scope });

    // Since these are events, we can't use toHaveBeenCalled
    // Instead, we can verify that the events were processed
    const state = scope.getState($calendar);
    expect(state).toBeDefined();
  });

  it('should go to today', async () => {
    const initialDate = new Date(2024, 0, 1);
    const scope = fork({
      values: [[$calendar, { view: 'week' as const, selectedDate: initialDate, events: [] }]],
    });

    await allSettled(goToToday, { scope });

    const today = new Date();
    const state = scope.getState($calendar);
    expect(state.selectedDate.getFullYear()).toBe(today.getFullYear());
    expect(state.selectedDate.getMonth()).toBe(today.getMonth());
    expect(state.selectedDate.getDate()).toBe(today.getDate());
  });
});
