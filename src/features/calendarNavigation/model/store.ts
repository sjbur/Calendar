import { createEvent } from 'effector';
import { CalendarView } from '@/entities/calendar/model/types';

// Navigation events
export const goToNextMonth = createEvent();
export const goToPrevMonth = createEvent();
export const goToNextWeek = createEvent();
export const goToPrevWeek = createEvent();
export const goToNextDay = createEvent();
export const goToPrevDay = createEvent();
export const goToToday = createEvent();
export const setView = createEvent<CalendarView>();
