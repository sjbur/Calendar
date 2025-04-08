import { useUnit } from 'effector-react';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import {
  $eventManagement,
  closeEventModal,
  addEvent,
  updateEvent,
  removeEvent,
} from '../model/store';
import { Event } from '@/entities/calendar';
import { Modal } from '@/shared/ui/Modal';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';

interface FormData {
  title: string;
  start: string;
  end: string;
  description: string;
}

export const EventModal = () => {
  const { isModalOpen, selectedEvent, selectedDate } = useUnit($eventManagement);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    start: '',
    end: '',
    description: '',
  });

  useEffect(() => {
    if (selectedEvent) {
      setFormData({
        title: selectedEvent.title,
        start: format(new Date(selectedEvent.start), "yyyy-MM-dd'T'HH:mm"),
        end: format(new Date(selectedEvent.end), "yyyy-MM-dd'T'HH:mm"),
        description: selectedEvent.description || '',
      });
    } else if (selectedDate) {
      const date = new Date(selectedDate);
      date.setMinutes(0);
      const endDate = new Date(date);
      endDate.setHours(date.getHours() + 1);

      setFormData({
        title: '',
        start: format(date, "yyyy-MM-dd'T'HH:mm"),
        end: format(endDate, "yyyy-MM-dd'T'HH:mm"),
        description: '',
      });
    }
  }, [selectedEvent, selectedDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const eventData: Omit<Event, 'id'> = {
      title: formData.title,
      start: new Date(formData.start),
      end: new Date(formData.end),
      description: formData.description,
    };

    if (selectedEvent) {
      updateEvent({ ...eventData, id: selectedEvent.id });
    } else {
      addEvent(eventData);
    }

    closeEventModal();
  };

  const handleDelete = () => {
    if (selectedEvent) {
      removeEvent(selectedEvent.id);
      closeEventModal();
    }
  };

  return (
    <Modal isOpen={isModalOpen} title={selectedEvent ? 'Edit Event' : 'New Event'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Title"
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <Input
          label="Start"
          type="datetime-local"
          value={formData.start}
          onChange={(e) => setFormData({ ...formData, start: e.target.value })}
          required
        />
        <Input
          label="End"
          type="datetime-local"
          value={formData.end}
          onChange={(e) => setFormData({ ...formData, end: e.target.value })}
          required
        />
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-calendar-blue focus:border-calendar-blue"
            rows={3}
          />
        </div>
        <div className="flex justify-between">
          <div>
            <Button variant="secondary" onClick={() => closeEventModal()} className="mr-2">
              Cancel
            </Button>
            <Button type="submit">{selectedEvent ? 'Update' : 'Create'}</Button>
          </div>
          {selectedEvent && (
            <Button variant="danger" type="button" onClick={() => handleDelete()}>
              Delete
            </Button>
          )}
        </div>
      </form>
    </Modal>
  );
};
