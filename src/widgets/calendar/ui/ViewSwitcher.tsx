import { useUnit } from 'effector-react';
import { $calendar } from '@/entities/calendar';
import { setView } from '@/features/calendarNavigation';

export const ViewSwitcher = () => {
  const { view } = useUnit($calendar);

  return (
    <div className="flex gap-4">
      <button
        className={`px-4 py-2 rounded ${
          view === 'day' ? 'bg-calendar-blue text-white' : 'bg-calendar-hover'
        }`}
        onClick={() => setView('day')}
      >
        Day
      </button>
      <button
        className={`px-4 py-2 rounded ${
          view === 'week' ? 'bg-calendar-blue text-white' : 'bg-calendar-hover'
        }`}
        onClick={() => setView('week')}
      >
        Week
      </button>
      <button
        className={`px-4 py-2 rounded ${
          view === 'month' ? 'bg-calendar-blue text-white' : 'bg-calendar-hover'
        }`}
        onClick={() => setView('month')}
      >
        Month
      </button>
    </div>
  );
};
