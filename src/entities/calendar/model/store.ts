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
import { CalendarState, Event } from './types';
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

// Events
export const setSelectedDate = createEvent<Date>();
export const openEventModal = createEvent<Date>();
export const closeEventModal = createEvent();
export const selectEvent = createEvent<Event>();

// Main store
export const $calendar = createStore<CalendarState>({
  view: 'week',
  selectedDate: new Date(),
  events: [],
})
  .on(setSelectedDate, (state, date) => ({ ...state, selectedDate: date }))
  .on(setView, (state, view) => ({ ...state, view }))
  .on(selectEvent, (state, event) => ({
    ...state,
    events: [...state.events, event],
  }))
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
  clock: $calendar.map((state) => state.selectedDate),
  target: getWeekDaysFx,
});

sample({
  clock: getWeekDaysFx.doneData,
  target: $weekDays,
});

sample({
  clock: $calendar.map((state) => state.selectedDate),
  target: getMonthDaysFx,
});

sample({
  clock: getMonthDaysFx.doneData,
  target: $monthDays,
});
