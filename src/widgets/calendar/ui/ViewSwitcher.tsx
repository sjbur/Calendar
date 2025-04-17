import { useUnit } from 'effector-react';
import { $calendar } from '@/entities/calendar';
import { setView } from '@/features/calendarNavigation';

export const ViewSwitcher = () => {
  const { view } = useUnit($calendar);
  const setViewFn = useUnit(setView);

  return (
    <div className="flex gap-4">
      <button
        className={`px-4 py-2 rounded ${
          view === 'day' ? 'bg-calendar-blue text-white' : 'bg-calendar-hover'
        }`}
        onClick={() => setViewFn('day')}
      >
        Day
      </button>
      <button
        className={`px-4 py-2 rounded ${
          view === 'week' ? 'bg-calendar-blue text-white' : 'bg-calendar-hover'
        }`}
        onClick={() => setViewFn('week')}
      >
        Week
      </button>
      <button
        className={`px-4 py-2 rounded ${
          view === 'month' ? 'bg-calendar-blue text-white' : 'bg-calendar-hover'
        }`}
        onClick={() => setViewFn('month')}
      >
        Month
      </button>
    </div>
  );
};
