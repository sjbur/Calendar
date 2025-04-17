import type { Meta, StoryObj } from '@storybook/react';
import { DayView } from './DayView';

const meta: Meta<typeof DayView> = {
  title: 'Widgets/Calendar/DayView',
  component: DayView,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The DayView component displays a single day's schedule with:
- Hourly time slots
- Events for the selected day
- Event creation on time slot click
- Event details on event click

The view shows a 24-hour timeline with events positioned according to their start and end times.
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ 
        padding: '2rem',
        background: '#f5f5f5',
        minWidth: '800px',
        minHeight: '600px'
      }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof DayView>;

export const Default: Story = {
  render: () => <DayView />,
  parameters: {
    docs: {
      description: {
        story: 'The default day view showing the current day with hourly time slots and any events scheduled for that day.',
      },
    },
  },
}; 