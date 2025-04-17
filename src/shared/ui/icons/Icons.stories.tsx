import type { Meta, StoryObj } from '@storybook/react';
import { ArrowLeft, ArrowRight } from './index';

const meta: Meta = {
  title: 'UI/Icons',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const ArrowLeftIcon: Story = {
  render: () => <ArrowLeft className="h-6 w-6" />,
};

export const ArrowRightIcon: Story = {
  render: () => <ArrowRight className="h-6 w-6" />,
};

export const IconsWithDifferentSizes: Story = {
  render: () => (
    <div className="flex gap-4">
      <ArrowLeft className="h-4 w-4" />
      <ArrowLeft className="h-6 w-6" />
      <ArrowLeft className="h-8 w-8" />
    </div>
  ),
};

export const IconsWithDifferentColors: Story = {
  render: () => (
    <div className="flex gap-4">
      <ArrowLeft className="h-6 w-6 text-gray-500" />
      <ArrowLeft className="h-6 w-6 text-calendar-blue" />
      <ArrowLeft className="h-6 w-6 text-red-500" />
    </div>
  ),
}; 