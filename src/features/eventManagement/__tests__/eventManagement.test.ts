import { describe, it, expect, vi } from 'vitest';
import { fork, allSettled, createStore } from 'effector';
import { addEvent, updateEvent, removeEvent, $eventManagement } from '../model/store';
import { Event } from '@/entities/calendar/model/types';

// Mock calendar store
vi.mock('@/entities/calendar/model/store', () => {
  const $calendar = createStore({
    view: 'week' as const,
    selectedDate: new Date(2024, 0, 1),
    events: [],
  });

  return {
    $calendar,
  };
});

describe('eventManagement', () => {
  it('should add event', async () => {
    const scope = fork();

    const event: Omit<Event, 'id'> = {
      title: 'Test Event',
      start: new Date(2024, 0, 1, 10, 0),
      end: new Date(2024, 0, 1, 11, 0),
    };

    await allSettled(addEvent, { scope, params: event });

    // Verify that the event was added
    const state = scope.getState($eventManagement);
    expect(state.isModalOpen).toBe(false);
    expect(state.selectedEvent).toBeNull();
    expect(state.selectedDate).toBeNull();
  });

  it('should update event', async () => {
    const initialEvent: Event = {
      id: '1',
      title: 'Initial Event',
      start: new Date(2024, 0, 1, 10, 0),
      end: new Date(2024, 0, 1, 11, 0),
    };

    const scope = fork();

    await allSettled(updateEvent, { scope, params: initialEvent });

    const state = scope.getState($eventManagement);
    expect(state.isModalOpen).toBe(false);
    expect(state.selectedEvent).toBeNull();
    expect(state.selectedDate).toBeNull();
  });

  it('should remove event', async () => {
    const scope = fork();

    await allSettled(removeEvent, { scope, params: '1' });

    const state = scope.getState($eventManagement);
    expect(state.isModalOpen).toBe(false);
    expect(state.selectedEvent).toBeNull();
    expect(state.selectedDate).toBeNull();
  });

  it('should handle multiple events', async () => {
    const scope = fork();

    // Add first event
    const event1: Omit<Event, 'id'> = {
      title: 'First Event',
      start: new Date(2024, 0, 1, 10, 0),
      end: new Date(2024, 0, 1, 11, 0),
    };
    await allSettled(addEvent, { scope, params: event1 });

    // Add second event
    const event2: Omit<Event, 'id'> = {
      title: 'Second Event',
      start: new Date(2024, 0, 1, 12, 0),
      end: new Date(2024, 0, 1, 13, 0),
    };
    await allSettled(addEvent, { scope, params: event2 });

    // Verify state
    const state = scope.getState($eventManagement);
    expect(state.isModalOpen).toBe(false);
    expect(state.selectedEvent).toBeNull();
    expect(state.selectedDate).toBeNull();
  });
});
