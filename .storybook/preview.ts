import type { Preview } from '@storybook/react-vite'
import '../src/styles/fonts.css'
import '../src/styles/design-tokens.css'

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    docs: {
      toc: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
};

export default preview;