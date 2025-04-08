import { createStore, createEvent } from 'effector';
import { Event } from '@/entities/calendar/model/types';

// Events
export const addEvent = createEvent<Omit<Event, 'id'>>();
export const updateEvent = createEvent<Event>();
export const removeEvent = createEvent<string>();
export const openEventModal = createEvent<Date>();
export const closeEventModal = createEvent();
export const selectEvent = createEvent<Event>();

// State
interface EventManagementState {
  isModalOpen: boolean;
  selectedEvent: Event | null;
  selectedDate: Date | null;
}

// Store
export const $eventManagement = createStore<EventManagementState>({
  isModalOpen: false,
  selectedEvent: null,
  selectedDate: null,
})
  .on(openEventModal, (state, date) => ({
    ...state,
    isModalOpen: true,
    selectedDate: date,
    selectedEvent: null,
  }))
  .on(closeEventModal, (state) => ({
    ...state,
    isModalOpen: false,
    selectedEvent: null,
    selectedDate: null,
  }))
  .on(selectEvent, (state, event) => ({
    ...state,
    selectedEvent: event,
    isModalOpen: true,
  }));
