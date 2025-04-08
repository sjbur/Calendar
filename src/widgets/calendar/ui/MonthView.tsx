import { useUnit } from 'effector-react';
import {
  format,
  isSameMonth,
  isSameDay,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
} from 'date-fns';
import { $calendar } from '@/entities/calendar';
import { openEventModal, selectEvent } from '@/features/eventManagement';
import { Event } from '@/entities/calendar';

export const MonthView = () => {
  const { selectedDate, events } = useUnit($calendar);

  const getEventsForDay = (day: Date) => {
    return events.filter((event) => isSameDay(new Date(event.start), day));
  };

  const handleDayClick = (day: Date) => {
    const newDate = new Date(day);
    newDate.setHours(selectedDate.getHours());
    newDate.setMinutes(selectedDate.getMinutes());
    openEventModal(newDate);
  };

  const handleEventClick = (event: Event, e: React.MouseEvent) => {
    e.stopPropagation();
    selectEvent(event);
  };

  // Get all days for the month view including padding days
  const getDaysInMonth = () => {
    const start = startOfWeek(startOfMonth(selectedDate), { weekStartsOn: 1 });
    const end = endOfWeek(endOfMonth(selectedDate), { weekStartsOn: 1 });
    return eachDayOfInterval({ start, end });
  };

  const daysToShow = getDaysInMonth();

  return (
    <div className="flex flex-col h-full">
      <div className="grid grid-cols-7 gap-1">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
          <div key={day} className="text-center font-semibold py-2 text-gray-600">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 flex-1">
        {daysToShow.map((day) => {
          const dayEvents = getEventsForDay(day);
          const isToday = isSameDay(day, new Date());
          const isCurrentMonth = isSameMonth(day, selectedDate);

          return (
            <div
              key={day.toString()}
              className={`p-2 min-h-[100px] border transition-colors duration-200 
                ${isCurrentMonth ? 'bg-white hover:bg-gray-50' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'} 
                ${isToday ? 'border-calendar-blue ring-1 ring-calendar-blue' : 'border-gray-200'} 
                cursor-pointer`}
              onClick={() => handleDayClick(day)}
            >
              <div className={`font-semibold ${isToday ? 'text-calendar-blue' : ''}`}>
                {format(day, 'd')}
              </div>
              <div className="space-y-1 mt-1">
                {dayEvents.slice(0, 3).map((event) => (
                  <div
                    key={event.id}
                    className="text-sm p-1 rounded bg-calendar-blue text-white truncate cursor-pointer hover:bg-blue-600 transition-colors duration-200"
                    onClick={(e) => handleEventClick(event, e)}
                    title={event.title}
                  >
                    {event.title}
                  </div>
                ))}
                {dayEvents.length > 3 && (
                  <div className="text-xs text-gray-500 pl-1">+{dayEvents.length - 3} more</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
