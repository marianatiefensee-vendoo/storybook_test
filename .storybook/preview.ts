import type { Preview } from '@storybook/react-vite';

const preview: Preview = {
  parameters: {
    docs: {
      source: {
        type: 'code',
        language: 'tsx',
      },
    },
  },
};

export default preview;