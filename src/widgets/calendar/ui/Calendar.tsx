import { useUnit } from 'effector-react';
import { format } from 'date-fns';
import { $calendar } from '@/entities/calendar';
import {
  goToNextMonth,
  goToPrevMonth,
  goToNextWeek,
  goToPrevWeek,
  goToNextDay,
  goToPrevDay,
  goToToday,
} from '@/features/calendarNavigation';
import { WeekView } from './WeekView';
import { MonthView } from './MonthView';
import { DayView } from './DayView';
import { ArrowLeft, ArrowRight } from '@/shared/ui/icons';
import { ViewSwitcher } from './ViewSwitcher';

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
              onClick={() => goToPrevMonth()}
              title="Previous Month"
            >
              <ArrowLeft />
            </button>
            <button
              className="px-4 py-2 rounded bg-calendar-blue text-white hover:bg-blue-600"
              onClick={() => goToToday()}
            >
              Today
            </button>
            <button
              className="p-2 rounded hover:bg-gray-100"
              onClick={() => goToNextMonth()}
              title="Next Month"
            >
              <ArrowRight />
            </button>
          </div>
        );
      case 'week':
        return (
          <div className="flex items-center gap-4">
            <button
              className="p-2 rounded hover:bg-gray-100"
              onClick={() => goToPrevWeek()}
              title="Previous Week"
            >
              <ArrowLeft />
            </button>
            <button
              className="px-4 py-2 rounded bg-calendar-blue text-white hover:bg-blue-600"
              onClick={() => goToToday()}
            >
              Today
            </button>
            <button
              className="p-2 rounded hover:bg-gray-100"
              onClick={() => goToNextWeek()}
              title="Next Week"
            >
              <ArrowRight />
            </button>
          </div>
        );
      case 'day':
        return (
          <div className="flex items-center gap-4">
            <button
              className="p-2 rounded hover:bg-gray-100"
              onClick={() => goToPrevDay()}
              title="Previous Day"
            >
              <ArrowLeft />
            </button>
            <button
              className="px-4 py-2 rounded bg-calendar-blue text-white hover:bg-blue-600"
              onClick={() => goToToday()}
            >
              Today
            </button>
            <button
              className="p-2 rounded hover:bg-gray-100"
              onClick={() => goToNextDay()}
              title="Next Day"
            >
              <ArrowRight />
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
        <ViewSwitcher />
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold">{format(selectedDate, 'MMMM yyyy')}</h2>
          {handleNavigation()}
        </div>
      </div>
      {renderView()}
    </div>
  );
};
