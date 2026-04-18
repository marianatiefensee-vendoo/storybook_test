import '../src/styles/fonts.css';
import '../src/styles/design-tokens.css';
import '../src/index.css';

import type { Preview } from '@storybook/react-vite';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;