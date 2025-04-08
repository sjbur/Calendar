import { useUnit } from 'effector-react';
import { useEffect, useState } from 'react';
import { format, parse, addHours } from 'date-fns';
import {
  $calendar,
  closeEventModal,
  addEvent,
  updateEvent,
  removeEvent,
} from '@entities/calendar/model/store';

export const EventModal = () => {
  const { isEventModalOpen, selectedEvent, selectedDate } = useUnit($calendar);
  const [formData, setFormData] = useState({
    title: '',
    startTime: '09:00',
    endTime: '10:00',
    description: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (selectedEvent) {
      setFormData({
        title: selectedEvent.title,
        startTime: format(new Date(selectedEvent.start), 'HH:mm'),
        endTime: format(new Date(selectedEvent.end), 'HH:mm'),
        description: selectedEvent.description || '',
      });
    } else if (selectedDate) {
      const currentHour = format(selectedDate, 'HH:mm');
      const nextHour = format(addHours(selectedDate, 1), 'HH:mm');
      setFormData({
        title: '',
        startTime: currentHour,
        endTime: nextHour,
        description: '',
      });
    }
  }, [selectedEvent, selectedDate]);

  if (!isEventModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const startDateTime = parse(formData.startTime, 'HH:mm', selectedDate);
    const endDateTime = parse(formData.endTime, 'HH:mm', selectedDate);

    if (endDateTime <= startDateTime) {
      setError('End time must be after start time');
      return;
    }

    const eventData = {
      title: formData.title,
      start: startDateTime,
      end: endDateTime,
      description: formData.description,
    };

    if (selectedEvent) {
      updateEvent({ ...selectedEvent, ...eventData });
    } else {
      addEvent(eventData);
    }
    closeEventModal();
  };

  const handleDelete = () => {
    if (selectedEvent && window.confirm('Are you sure you want to delete this event?')) {
      removeEvent(selectedEvent.id);
      closeEventModal();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">
          {selectedEvent ? 'Edit Event' : 'Create Event'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Start Time</label>
            <input
              type="time"
              value={formData.startTime}
              onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">End Time</label>
            <input
              type="time"
              value={formData.endTime}
              onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-2 border rounded"
              rows={3}
            />
          </div>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <div className="flex justify-between">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={closeEventModal}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              {selectedEvent && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
                >
                  Delete
                </button>
              )}
            </div>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-calendar-blue text-white hover:bg-blue-600"
            >
              {selectedEvent ? 'Save' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
