import { useUnit } from 'effector-react';
import { format, getHours, getMinutes, setMinutes, setHours } from 'date-fns';
import { $calendar, openEventModal, selectEvent } from '@entities/calendar/model/store';

export const DayView = () => {
  const { selectedDate, events } = useUnit($calendar);

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

  const handleTimeSlotClick = (hour: number) => {
    const newDate = new Date(selectedDate);
    newDate.setHours(hour);
    newDate.setMinutes(0);
    openEventModal(newDate);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex">
        <div className="flex-none w-20"></div>
        <div className="flex-1">
          <div className="text-center font-semibold p-2">
            {format(selectedDate, 'EEEE, MMMM d')}
          </div>
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
        <div className="flex-1">
          {hours.map((hour) => (
            <div
              key={hour}
              className="h-12 border-b hover:bg-gray-50 cursor-pointer relative"
              onClick={() => handleTimeSlotClick(hour)}
            >
              {events
                .filter((event) => {
                  const eventStart = new Date(event.start);
                  return getHours(eventStart) === hour;
                })
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
