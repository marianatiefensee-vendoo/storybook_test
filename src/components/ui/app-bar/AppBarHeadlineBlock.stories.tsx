import type { Meta, StoryObj } from '@storybook/react-vite';

import { AppBarHeadlineBlock, type AppBarHeadlineBlockSize } from './AppBarHeadlineBlock';
import { createFigmaDesign } from '../../../stories/figma-design';
import './app-bar.stories.css';

const appBarHeadlineBlockDesignUrl =
  'https://www.figma.com/design/LS1yOsOQqbFFpG4c8T2kQO/Go-Flow-Design-System?node-id=555-32431&m=dev';

const meta = {
  title: 'Components/AppBarHeadlineBlock',
  component: AppBarHeadlineBlock,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    design: createFigmaDesign(appBarHeadlineBlockDesignUrl),
    docs: {
      description: {
        component:
          'Headline block primitive for top app bars and other screen-title patterns. Use it to inspect the type ramp and supporting text combinations defined in Figma.',
      },
    },
  },
  args: {
    headline: 'Label',
    supportingText: 'Supporting Text',
    size: 'small',
  },
  argTypes: {
    headline: {
      control: 'text',
    },
    supportingText: {
      control: 'text',
    },
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'] satisfies AppBarHeadlineBlockSize[],
    },
  },
} satisfies Meta<typeof AppBarHeadlineBlock>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => <AppBarHeadlineBlock {...args} />,
};

export const Variants: Story = {
  parameters: {
    controls: {
      disable: true,
    },
    layout: 'padded',
  },
  render: () => (
    <div className="app-bar-story__stack">
      <AppBarHeadlineBlock headline="Label" supportingText="Supporting Text" size="small" />
      <AppBarHeadlineBlock headline="Label" size="small" />
      <AppBarHeadlineBlock headline="Label" supportingText="Supporting Text" size="medium" />
      <AppBarHeadlineBlock headline="Label" size="medium" />
      <AppBarHeadlineBlock headline="Label" supportingText="Supporting Text" size="large" />
      <AppBarHeadlineBlock headline="Label" size="large" />
    </div>
  ),
};
