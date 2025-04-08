import { useUnit } from 'effector-react';
import { useEffect } from 'react';
import { format, isSameDay, getHours, getMinutes, setMinutes, setHours } from 'date-fns';
import {
  $calendar,
  $weekDays,
  openEventModal,
  getWeekDaysFx,
  selectEvent,
} from '@entities/calendar/model/store';

export const WeekView = () => {
  const { selectedDate, events } = useUnit($calendar);
  const weekDays = useUnit($weekDays);

  useEffect(() => {
    getWeekDaysFx(selectedDate);
  }, [selectedDate]);

  if (!weekDays.length) return null;

  const hours = Array.from({ length: 24 }, (_, i) => i);

  const calculateEventPosition = (event: { start: Date; end: Date }) => {
    const start = new Date(event.start);
    const end = new Date(event.end);
    const startMinutes = getHours(start) * 60 + getMinutes(start);
    const endMinutes = getHours(end) * 60 + getMinutes(end);
    const duration = endMinutes - startMinutes;

    const hourHeight = 48; // h-12 = 48px

    return {
      top: `${(startMinutes / 60) * hourHeight}px`,
      height: `${(duration / 60) * hourHeight}px`,
      position: 'absolute' as const,
      left: '4px',
      right: '4px',
      zIndex: 1,
    };
  };

  const handleTimeSlotClick = (day: Date, hour: number) => {
    const newDate = new Date(day);
    newDate.setHours(hour);
    newDate.setMinutes(0);
    openEventModal(newDate);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex">
        <div className="flex-none w-20"></div>
        <div className="flex-1 grid grid-cols-7 gap-1">
          {weekDays.map((day) => (
            <div key={day.toString()} className="text-center font-semibold p-2">
              {format(day, 'EEE d')}
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-1 overflow-auto">
        <div className="flex-none w-20 border-r bg-white">
          {hours.map((hour) => (
            <div key={hour} className="h-12 text-right pr-2 text-sm text-gray-500 border-b">
              {format(setMinutes(setHours(new Date(), hour), 0), 'HH:00')}
            </div>
          ))}
        </div>
        <div className="flex-1 grid grid-cols-7 gap-1">
          {weekDays.map((day) => (
            <div key={day.toString()} className="relative min-h-full">
              {/* Сетка часов */}
              {hours.map((hour) => (
                <div
                  key={hour}
                  className="h-12 border-b border-r hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleTimeSlotClick(day, hour)}
                />
              ))}

              {/* События поверх сетки */}
              {events
                .filter((event) => isSameDay(new Date(event.start), day))
                .map((event) => (
                  <div
                    key={event.id}
                    className="absolute left-0 right-0 bg-calendar-blue text-white p-1 text-sm rounded mx-1"
                    style={calculateEventPosition(event)}
                    onClick={(e) => {
                      e.stopPropagation();
                      selectEvent(event);
                    }}
                  >
                    <div className="truncate">{event.title}</div>
                    <div className="text-xs">
                      {format(new Date(event.start), 'HH:mm')} -{' '}
                      {format(new Date(event.end), 'HH:mm')}
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
