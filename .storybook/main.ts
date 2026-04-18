import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-designs',
    '@storybook/addon-links',
    '@storybook/addon-docs',
    '@storybook/addon-mcp',
  ],
  framework: '@storybook/react-vite',
  staticDirs: ['../public'],
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
async viteFinal(config) {
  return {
    ...config,
    base: './', // 👈 critical for Cloudflare
    build: {
      ...config.build,
      minify: false,
    },
  };

export default config;