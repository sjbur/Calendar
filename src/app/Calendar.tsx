import { useUnit } from 'effector-react';
import { $calendar } from '@/entities/calendar';
import { MonthView } from '@/widgets/calendar/ui/MonthView';
import { WeekView } from '@/widgets/calendar/ui/WeekView';
import { DayView } from '@/widgets/calendar/ui/DayView';
import { EventModal } from '@/features/eventManagement';
import { ViewSwitcher } from '@/widgets/calendar/ui/ViewSwitcher';

export const Calendar = () => {
  const { view } = useUnit($calendar);

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
            <ViewSwitcher />
          </div>
        </div>
      </header>
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          {view === 'month' && <MonthView />}
          {view === 'week' && <WeekView />}
          {view === 'day' && <DayView />}
        </div>
      </main>
      <EventModal />
    </div>
  );
};
