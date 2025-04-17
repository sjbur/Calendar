import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './index';

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'datetime-local'],
    },
    disabled: {
      control: 'boolean',
    },
    onChange: { action: 'changed' },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    label: 'Default Input',
    placeholder: 'Enter text...',
  },
};

export const WithType: Story = {
  args: {
    label: 'Email Input',
    type: 'email',
    placeholder: 'Enter email...',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    disabled: true,
    placeholder: 'Cannot edit...',
  },
};

export const WithoutLabel: Story = {
  args: {
    placeholder: 'No label input...',
  },
};

export const DateTime: Story = {
  args: {
    label: 'Date and Time',
    type: 'datetime-local',
  },
}; 