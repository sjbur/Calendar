import type { Meta, StoryObj } from '@storybook/react';
import { MonthView } from './MonthView';

const meta: Meta<typeof MonthView> = {
  title: 'Widgets/Calendar/MonthView',
  component: MonthView,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The MonthView component displays a month's schedule with:
- Days of the month in a grid
- Week days as headers
- Events listed under each day
- Event creation on day click
- Event details on event click

The view shows a traditional calendar layout with days arranged in a grid, making it easy to see the month at a glance.
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          padding: '2rem',
          background: '#f5f5f5',
          minWidth: '800px',
          minHeight: '600px',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MonthView>;

export const Default: Story = {
  render: () => <MonthView />,
  parameters: {
    docs: {
      description: {
        story:
          'The default month view showing the current month with days arranged in a grid and events listed under each day.',
      },
    },
  },
};
