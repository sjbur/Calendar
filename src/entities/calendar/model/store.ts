import { createStore, createEvent, createEffect, sample } from 'effector';
import {
  addDays,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  addMonths,
  subMonths,
  addWeeks,
  subWeeks,
  subDays,
} from 'date-fns';

export interface Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  description?: string;
  color?: string;
}

interface CalendarState {
  selectedDate: Date;
  events: Event[];
  view: 'month' | 'week' | 'day';
  isEventModalOpen: boolean;
  selectedEvent: Event | null;
}

// Events
export const setSelectedDate = createEvent<Date>();
export const setView = createEvent<'month' | 'week' | 'day'>();
export const addEvent = createEvent<Event>();
export const updateEvent = createEvent<Event>();
export const removeEvent = createEvent<string>();
export const openEventModal = createEvent<Date>();
export const closeEventModal = createEvent();
export const selectEvent = createEvent<Event>();

// Navigation events
export const goToNextMonth = createEvent();
export const goToPrevMonth = createEvent();
export const goToNextWeek = createEvent();
export const goToPrevWeek = createEvent();
export const goToToday = createEvent();
export const goToNextDay = createEvent();
export const goToPrevDay = createEvent();

// Main store
export const $calendar = createStore<CalendarState>({
  view: 'week',
  selectedDate: new Date(),
  isEventModalOpen: false,
  selectedEvent: null,
  events: [],
})
  .on(setView, (state, view) => ({ ...state, view }))
  .on(setSelectedDate, (state, date) => ({ ...state, selectedDate: date }))
  .on(openEventModal, (state, date) => {
    console.log('Opening modal with date:', date);
    return {
      ...state,
      selectedDate: date,
      isEventModalOpen: true,
      selectedEvent: null,
    };
  })
  .on(closeEventModal, (state) => {
    console.log('Closing modal');
    return {
      ...state,
      isEventModalOpen: false,
      selectedEvent: null,
    };
  })
  .on(addEvent, (state, event) => ({
    ...state,
    events: [...state.events, { ...event, id: Date.now().toString() }],
  }))
  .on(updateEvent, (state, updatedEvent) => ({
    ...state,
    events: state.events.map((event) => (event.id === updatedEvent.id ? updatedEvent : event)),
  }))
  .on(removeEvent, (state, eventId) => ({
    ...state,
    events: state.events.filter((event) => event.id !== eventId),
  }))
  .on(selectEvent, (state, event) => ({
    ...state,
    selectedEvent: event,
    isEventModalOpen: true,
  }))
  .on(goToNextMonth, (state) => ({
    ...state,
    selectedDate: addMonths(state.selectedDate, 1),
  }))
  .on(goToPrevMonth, (state) => ({
    ...state,
    selectedDate: subMonths(state.selectedDate, 1),
  }))
  .on(goToNextWeek, (state) => ({
    ...state,
    selectedDate: addWeeks(state.selectedDate, 1),
  }))
  .on(goToPrevWeek, (state) => ({
    ...state,
    selectedDate: subWeeks(state.selectedDate, 1),
  }))
  .on(goToToday, (state) => ({
    ...state,
    selectedDate: new Date(),
  }))
  .on(goToNextDay, (state) => ({
    ...state,
    selectedDate: addDays(state.selectedDate, 1),
  }))
  .on(goToPrevDay, (state) => ({
    ...state,
    selectedDate: subDays(state.selectedDate, 1),
  }));

// Week days store
export const $weekDays = createStore<Date[]>([]);

// Month days store
export const $monthDays = createStore<Date[]>([]);

// Day events store
export const $dayEvents = createStore<Event[]>([]);

// Effects
export const getWeekDaysFx = createEffect((date: Date) => {
  const start = startOfWeek(date, { weekStartsOn: 1 });
  const end = endOfWeek(date, { weekStartsOn: 1 });
  return eachDayOfInterval({ start, end });
});

export const getMonthDaysFx = createEffect((date: Date) => {
  const start = startOfMonth(date);
  const end = endOfMonth(date);
  return eachDayOfInterval({ start, end });
});

export const getDayEventsFx = createEffect(({ date, events }: { date: Date; events: Event[] }) => {
  return events.filter((event) => {
    const eventDate = new Date(event.start);
    return eventDate.toDateString() === date.toDateString();
  });
});

// Week days store
$weekDays.on(getWeekDaysFx.doneData, (_, days) => days);

// Month days store
$monthDays.on(getMonthDaysFx.doneData, (_, days) => days);

// Day events store
$dayEvents.on(getDayEventsFx.doneData, (_, events) => events);

// Samples for automatic updates
sample({
  clock: $calendar,
  fn: (state) => state.selectedDate,
  target: getWeekDaysFx,
});

sample({
  clock: $calendar,
  fn: (state) => state.selectedDate,
  target: getMonthDaysFx,
});

sample({
  clock: $calendar,
  fn: (state) => ({ date: state.selectedDate, events: state.events }),
  target: getDayEventsFx,
});
