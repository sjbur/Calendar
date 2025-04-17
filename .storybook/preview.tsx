import type { Preview } from '@storybook/react';
import { fn } from '@storybook/test';
import React from 'react';
import '../src/app/styles/index.css';

const preview: Preview = {
  parameters: {
    actions: {
      argTypesRegex: '^on[A-Z].*',
      handles: ['click', 'change', 'submit'],
    },

    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    layout: 'centered',

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '1rem' }}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
