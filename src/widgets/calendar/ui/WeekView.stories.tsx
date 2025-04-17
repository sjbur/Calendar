import type { Meta, StoryObj } from '@storybook/react';
import { WeekView } from './WeekView';

const meta: Meta<typeof WeekView> = {
  title: 'Widgets/Calendar/WeekView',
  component: WeekView,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The WeekView component displays a week's schedule with:
- Days of the week as columns
- Hourly time slots as rows
- Events positioned in the grid
- Event creation on time slot click
- Event details on event click

The view shows a 7-day week with a 24-hour timeline for each day, allowing users to see their schedule at a glance.
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
type Story = StoryObj<typeof WeekView>;

export const Default: Story = {
  render: () => <WeekView />,
  parameters: {
    docs: {
      description: {
        story: 'The default week view showing the current week with days as columns and hourly time slots as rows.',
      },
    },
  },
}; 