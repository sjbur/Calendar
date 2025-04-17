import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Modal } from './index';
import { Button } from '@/shared/ui/Button';

const meta: Meta<typeof Modal> = {
  title: 'UI/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The Modal component provides a reusable modal dialog that:
- Can be shown/hidden based on isOpen prop
- Supports a title
- Has a consistent styling
- Can contain any content
- Is centered on the screen
        `,
      },
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
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
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

const ModalWithTitle = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Custom Title">
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
};

const ModalWithoutTitle = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
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
};

const ModalWithLongContent = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Long Content Modal">
        <div className="p-4">
          <p>This is a long content modal.</p>
          <p>It can contain multiple paragraphs and other elements.</p>
          <div className="mt-4">
            <Button>Example Button</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const ModalFullscreen = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Open Fullscreen Modal</Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Fullscreen Modal" fullscreen>
        <div className="p-4">
          <p>This is a fullscreen modal that takes up the entire viewport.</p>
          <p>It's useful for complex forms or detailed content that needs more space.</p>
          <div className="mt-4">
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
  render: () => <ModalWithTitle />,
};

export const WithoutTitle: Story = {
  render: () => <ModalWithoutTitle />,
};

export const WithLongContent: Story = {
  render: () => <ModalWithLongContent />,
};

export const Fullscreen: Story = {
  render: () => <ModalFullscreen />,
};
