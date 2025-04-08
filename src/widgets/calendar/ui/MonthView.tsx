import { useUnit } from 'effector-react';
import { format, isSameMonth, isSameDay } from 'date-fns';
import { $calendar, $monthDays, openEventModal, selectEvent } from '@entities/calendar/model/store';

export const MonthView = () => {
  const { selectedDate, events } = useUnit($calendar);
  const monthDays = useUnit($monthDays);

  const getEventsForDay = (day: Date) => {
    return events.filter((event) => isSameDay(new Date(event.start), day));
  };

  const handleDayClick = (day: Date) => {
    // Сохраняем текущее время
    const newDate = new Date(day);
    newDate.setHours(selectedDate.getHours());
    newDate.setMinutes(selectedDate.getMinutes());
    openEventModal(newDate);
  };

  const handleEventClick = (event: Event, e: React.MouseEvent) => {
    e.stopPropagation();
    selectEvent(event);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="grid grid-cols-7 gap-1">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
          <div key={day} className="text-center font-semibold py-2">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 flex-1">
        {monthDays.map((day) => {
          const dayEvents = getEventsForDay(day);
          const isToday = isSameDay(day, new Date());
          const isCurrentMonth = isSameMonth(day, selectedDate);

          return (
            <div
              key={day.toString()}
              className={`p-2 min-h-[100px] border transition-colors duration-200 
                ${isCurrentMonth ? 'bg-white hover:bg-gray-50' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'} 
                ${isToday ? 'border-calendar-blue ring-1 ring-calendar-blue' : 'hover:border-gray-300'} 
                cursor-pointer`}
              onClick={() => handleDayClick(day)}
            >
              <div className={`font-semibold ${isToday ? 'text-calendar-blue' : ''}`}>
                {format(day, 'd')}
              </div>
              <div className="space-y-1">
                {dayEvents.map((event) => (
                  <div
                    key={event.id}
                    className="text-sm p-1 rounded bg-calendar-blue text-white truncate cursor-pointer hover:bg-blue-600 transition-colors duration-200"
                    onClick={(e) => handleEventClick(event, e)}
                  >
                    {event.title}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
