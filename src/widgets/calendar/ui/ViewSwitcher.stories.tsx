import type { Meta, StoryObj } from '@storybook/react';
import { ViewSwitcher } from './ViewSwitcher';

const meta: Meta<typeof ViewSwitcher> = {
  title: 'Widgets/Calendar/ViewSwitcher',
  component: ViewSwitcher,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The ViewSwitcher component provides navigation between different calendar views:
- Day view for detailed hourly schedule
- Week view for weekly overview
- Month view for monthly overview

The component uses Effector for state management and updates the calendar view based on user selection.
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ 
        padding: '2rem',
        background: '#f5f5f5',
        minWidth: '400px'
      }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ViewSwitcher>;

export const Default: Story = {
  render: () => <ViewSwitcher />,
  parameters: {
    docs: {
      description: {
        story: 'The default view switcher showing buttons for Day, Week, and Month views with the current view highlighted.',
      },
    },
  },
}; 