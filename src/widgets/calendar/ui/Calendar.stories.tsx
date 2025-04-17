import type { Meta, StoryObj } from '@storybook/react';
import { Calendar } from './Calendar';

const meta: Meta<typeof Calendar> = {
  title: 'Widgets/Calendar/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The Calendar component is the main container that:
- Manages the overall calendar state
- Handles view switching between Day, Week, and Month views
- Provides a consistent layout and styling
- Integrates with Effector for state management

This component serves as the entry point for the calendar functionality and coordinates between different view components.
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
type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  render: () => <Calendar />,
  parameters: {
    docs: {
      description: {
        story:
          'The default calendar view showing the current month with the view switcher and the selected view displayed below.',
      },
    },
  },
};
