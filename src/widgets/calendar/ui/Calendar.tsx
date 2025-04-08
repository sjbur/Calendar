import { useUnit } from 'effector-react';
import { format } from 'date-fns';
import {
  $calendar,
  setView,
  goToNextMonth,
  goToPrevMonth,
  goToNextWeek,
  goToPrevWeek,
  goToNextDay,
  goToPrevDay,
  goToToday,
} from '@entities/calendar/model/store';
import { WeekView } from './WeekView';
import { MonthView } from './MonthView';
import { DayView } from './DayView';

export const Calendar = () => {
  const { view, selectedDate } = useUnit($calendar);

  const renderView = () => {
    switch (view) {
      case 'week':
        return <WeekView />;
      case 'month':
        return <MonthView />;
      case 'day':
        return <DayView />;
      default:
        return <WeekView />;
    }
  };

  const handleNavigation = () => {
    switch (view) {
      case 'month':
        return (
          <div className="flex items-center gap-4">
            <button
              className="p-2 rounded hover:bg-gray-100"
              onClick={goToPrevMonth}
              title="Previous Month"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button
              className="px-4 py-2 rounded bg-calendar-blue text-white hover:bg-blue-600"
              onClick={goToToday}
            >
              Today
            </button>
            <button
              className="p-2 rounded hover:bg-gray-100"
              onClick={goToNextMonth}
              title="Next Month"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        );
      case 'week':
        return (
          <div className="flex items-center gap-4">
            <button
              className="p-2 rounded hover:bg-gray-100"
              onClick={goToPrevWeek}
              title="Previous Week"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button
              className="px-4 py-2 rounded bg-calendar-blue text-white hover:bg-blue-600"
              onClick={goToToday}
            >
              Today
            </button>
            <button
              className="p-2 rounded hover:bg-gray-100"
              onClick={goToNextWeek}
              title="Next Week"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        );
      case 'day':
        return (
          <div className="flex items-center gap-4">
            <button
              className="p-2 rounded hover:bg-gray-100"
              onClick={goToPrevDay}
              title="Previous Day"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button
              className="px-4 py-2 rounded bg-calendar-blue text-white hover:bg-blue-600"
              onClick={goToToday}
            >
              Today
            </button>
            <button
              className="p-2 rounded hover:bg-gray-100"
              onClick={goToNextDay}
              title="Next Day"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
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
        <div className="flex items-center gap-4">{handleNavigation()}</div>
      </div>
      <div className="text-xl font-semibold mb-4">{format(selectedDate, 'MMMM yyyy')}</div>
      {renderView()}
    </div>
  );
};
