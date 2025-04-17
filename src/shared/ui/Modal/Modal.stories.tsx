import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Modal } from './index';
import { Button } from '@/shared/ui/Button';

const meta: Meta<typeof Modal> = {
  title: 'UI/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ 
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f5f5f5'
      }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Controls the visibility of the modal',
    },
    title: {
      control: 'text',
      description: 'Modal title',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

const ModalWithButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal isOpen={isOpen} title="Example Modal">
        <div className="space-y-4">
          <p>This is a modal content. You can put any content here.</p>
          <div className="flex justify-end">
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export const Default: Story = {
  render: () => <ModalWithButton />,
};

export const WithTitle: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal isOpen={isOpen} title="Custom Title">
          <div className="space-y-4">
            <p>This modal has a custom title.</p>
            <div className="flex justify-end">
              <Button variant="secondary" onClick={() => setIsOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    );
  },
};

export const WithoutTitle: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal isOpen={isOpen}>
          <div className="space-y-4">
            <p>This modal has no title.</p>
            <div className="flex justify-end">
              <Button variant="secondary" onClick={() => setIsOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    );
  },
};

export const WithLongContent: Story = {
  args: {
    isOpen: true,
    title: 'Long Content Modal',
    children: (
      <div className="p-4">
        <p>This is a long content modal.</p>
        <p>It can contain multiple paragraphs and other elements.</p>
        <div className="mt-4">
          <button className="px-4 py-2 bg-calendar-blue text-white rounded">
            Example Button
          </button>
        </div>
      </div>
    ),
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    title: 'Closed Modal',
    children: <div className="p-4">This modal is closed</div>,
  },
}; 