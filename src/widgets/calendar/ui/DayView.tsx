import { useUnit } from 'effector-react';
import { format, getHours, getMinutes, setMinutes, setHours, isSameDay } from 'date-fns';
import { $calendar } from '@/entities/calendar';
import { openEventModal, selectEvent } from '@/features/eventManagement';
import { Event } from '@/entities/calendar';

interface EventWithLayout extends Event {
  column: number;
  totalColumns: number;
}

export const DayView = () => {
  const { selectedDate, events } = useUnit($calendar);
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const getDayEvents = () => {
    return events.filter((event) => isSameDay(new Date(event.start), selectedDate));
  };

  const getEventTime = (date: Date) => getHours(date) * 60 + getMinutes(date);

  const layoutEvents = (events: Event[]): EventWithLayout[] => {
    if (events.length === 0) return [];

    // Sort events by start time and then by end time
    const sortedEvents = [...events].sort((a, b) => {
      const startDiff = getEventTime(new Date(a.start)) - getEventTime(new Date(b.start));
      if (startDiff === 0) {
        return getEventTime(new Date(b.end)) - getEventTime(new Date(a.end));
      }
      return startDiff;
    });

    const columns: Event[][] = [];
    const eventsWithLayout: EventWithLayout[] = [];

    sortedEvents.forEach((event) => {
      const eventStart = getEventTime(new Date(event.start));
      const eventEnd = getEventTime(new Date(event.end));

      // Find a column where the event doesn't overlap
      let columnIndex = 0;
      while (
        columns[columnIndex]?.some((placedEvent) => {
          const placedStart = getEventTime(new Date(placedEvent.start));
          const placedEnd = getEventTime(new Date(placedEvent.end));
          return !(eventEnd <= placedStart || eventStart >= placedEnd);
        })
      ) {
        columnIndex++;
      }

      if (!columns[columnIndex]) {
        columns[columnIndex] = [];
      }
      columns[columnIndex].push(event);

      // Find all events that overlap with current event
      const overlappingEvents = sortedEvents.filter((otherEvent) => {
        if (otherEvent === event) return false;
        const otherStart = getEventTime(new Date(otherEvent.start));
        const otherEnd = getEventTime(new Date(otherEvent.end));
        return !(eventEnd <= otherStart || eventStart >= otherEnd);
      });

      const totalColumns = overlappingEvents.length + 1;

      eventsWithLayout.push({
        ...event,
        column: columnIndex,
        totalColumns: Math.max(columns.length, totalColumns),
      });
    });

    return eventsWithLayout;
  };

  const calculateEventPosition = (event: EventWithLayout) => {
    const start = new Date(event.start);
    const end = new Date(event.end);
    const startMinutes = getHours(start) * 60 + getMinutes(start);
    const endMinutes = getHours(end) * 60 + getMinutes(end);
    const duration = endMinutes - startMinutes;

    const hourHeight = 48; // h-12 = 48px
    const containerHeight = hourHeight * 24;
    const columnWidth = 100 / event.totalColumns;
    const gap = 4; // 4px gap between events

    return {
      top: `${(startMinutes / (24 * 60)) * containerHeight}px`,
      height: `${(duration / (24 * 60)) * containerHeight}px`,
      left: `calc(${event.column * columnWidth}% + ${gap}px)`,
      width: `calc(${columnWidth}% - ${gap * 2}px)`,
      position: 'absolute' as const,
      zIndex: 10,
    };
  };

  const handleTimeSlotClick = (hour: number) => {
    const newDate = new Date(selectedDate);
    newDate.setHours(hour);
    newDate.setMinutes(0);
    openEventModal(newDate);
  };

  const dayEvents = layoutEvents(getDayEvents());

  return (
    <div className="flex flex-col h-full">
      <div className="flex">
        <div className="flex-none w-20"></div>
        <div className="flex-1">
          <div className="text-center font-semibold p-2" role="heading" aria-level={2}>
            {format(selectedDate, 'EEEE, MMMM d')}
          </div>
        </div>
      </div>
      <div className="flex flex-1 overflow-auto">
        <div className="flex-none w-20 border-r bg-white">
          {hours.map((hour) => (
            <div
              key={hour}
              className="h-12 text-right pr-2 text-sm text-gray-500 border-b"
              role="time"
              aria-label={`${format(setMinutes(setHours(new Date(), hour), 0), 'HH:00')}`}
            >
              {format(setMinutes(setHours(new Date(), hour), 0), 'HH:00')}
            </div>
          ))}
        </div>
        <div className="flex-1 relative">
          {hours.map((hour) => (
            <div
              key={hour}
              role="button"
              aria-label={`time slot ${format(setMinutes(setHours(new Date(), hour), 0), 'HH:00')}`}
              className="h-12 border-b hover:bg-gray-50 cursor-pointer"
              onClick={() => handleTimeSlotClick(hour)}
            />
          ))}
          {dayEvents.map((event) => (
            <div
              key={event.id}
              role="button"
              aria-label={`event ${event.title}`}
              className="absolute bg-calendar-blue text-white p-1 text-sm rounded hover:bg-blue-600 transition-colors duration-200"
              style={calculateEventPosition(event)}
              onClick={(e) => {
                e.stopPropagation();
                selectEvent(event);
              }}
              title={`${event.title} (${format(new Date(event.start), 'HH:mm')} - ${format(new Date(event.end), 'HH:mm')})`}
            >
              <div className="truncate">{event.title}</div>
              <div className="text-xs">
                {format(new Date(event.start), 'HH:mm')} - {format(new Date(event.end), 'HH:mm')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
