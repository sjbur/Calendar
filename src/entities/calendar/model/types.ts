export interface Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  description?: string;
  color?: string;
}

export interface CalendarState {
  selectedDate: Date;
  events: Event[];
  view: 'month' | 'week' | 'day';
}

export type CalendarView = 'month' | 'week' | 'day';
