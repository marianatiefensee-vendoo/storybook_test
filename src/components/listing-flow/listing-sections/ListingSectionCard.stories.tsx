import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';

import { ListingSectionCard, type ListingSectionCardProps } from './ListingSectionCard';
import { createFigmaDesign } from '../../../stories/figma-design';

const sectionDesignUrl =
  'https://www.figma.com/design/941LilI1FqImC2usHWp0qN/Listing-Flow-Draft--Recreate-?node-id=1098-30238&m=dev';

type SectionStoryArgs = {
  step: number;
  title: string;
  supportingText: string;
  children: ListingSectionCardProps['children'];
};

const meta = {
  title: 'Listing Flow/Listing Section Card',
  component: ListingSectionCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    design: createFigmaDesign(sectionDesignUrl),
    docs: {
      description: {
        component:
          'Structural listing-flow section wrapper with a step header and card body.',
      },
    },
  },
  args: {
    step: 3,
    title: 'Title & Description',
    supportingText: 'Describe the item shoppers need to know about.',
    children: (
      <div className="listing-flow-stack">
        <p>Section body content.</p>
      </div>
    ),
  },
  argTypes: {
    step: {
      control: { type: 'number', min: 1, max: 8, step: 1 },
    },
    title: {
      control: 'text',
    },
    supportingText: {
      control: 'text',
    },
    children: {
      control: false,
    },
  },
} satisfies Meta<ListingSectionCardProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => {
    const [storyArgs] = useArgs<SectionStoryArgs>();
    const resolved = { ...args, ...storyArgs };

    return (
      <ListingSectionCard
        step={resolved.step}
        title={resolved.title}
        supportingText={resolved.supportingText}
      >
        {resolved.children}
      </ListingSectionCard>
    );
  },
};

export const Parity: Story = {
  parameters: {
    layout: 'centered',
    controls: {
      disable: true,
    },
    design: createFigmaDesign(sectionDesignUrl),
  },
  render: () => (
    <div style={{ width: '100%', maxWidth: '480px' }}>
      <ListingSectionCard
        step={3}
        title="Title & Description"
        supportingText="Describe the item shoppers need to know about."
      >
        <div className="listing-flow-stack">
          <p>Section body content.</p>
        </div>
      </ListingSectionCard>
    </div>
  ),
};
