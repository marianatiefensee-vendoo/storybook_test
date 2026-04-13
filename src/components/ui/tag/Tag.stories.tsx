import type { Meta, StoryObj } from '@storybook/react-vite';

import { Icon } from '../icon/Icon';
import { iconNames, type IconName } from '../icon/icon-names';
import { createFigmaDesign } from '../../../stories/figma-design';
import { Tag, type TagTone } from './Tag';
import './tag.stories.css';

const tagFamilyUrl =
  'https://www.figma.com/design/LS1yOsOQqbFFpG4c8T2kQO/Go-Flow-Design-System?node-id=823-53207&m=dev';

type TagStoryArgs = {
  children: string;
  tone: TagTone;
  iconName: '' | IconName;
};

function resolveIconName(tone: TagTone, iconName: '' | IconName) {
  if (iconName) {
    return iconName;
  }

  return tone === 'ai' ? 'sparkle' : 'tag';
}

function renderTag(args: TagStoryArgs) {
  const iconName = resolveIconName(args.tone, args.iconName);

  return (
    <Tag tone={args.tone} icon={<Icon name={iconName} />}>
      {args.children}
    </Tag>
  );
}

const meta = {
  title: 'Components/Tag',
  component: Tag as unknown as Meta<TagStoryArgs>['component'],
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    design: createFigmaDesign(tagFamilyUrl),
    docs: {
      description: {
        component:
          'Compact tag primitive with neutral and AI tones. The playground keeps the label and icon args-driven while the variant story mirrors the exact Figma family node.',
      },
    },
  },
  args: {
    children: 'Status',
    tone: 'neutral',
    iconName: '',
  },
  argTypes: {
    children: {
      control: 'text',
    },
    tone: {
      control: 'radio',
      options: ['neutral', 'ai'] satisfies TagTone[],
    },
    iconName: {
      control: 'select',
      options: ['', ...iconNames] as Array<'' | IconName>,
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<TagStoryArgs>;

export default meta;

type Story = StoryObj<TagStoryArgs>;

export const Playground: Story = {
  render: renderTag,
};

export const Variants: Story = {
  parameters: {
    controls: {
      disable: true,
    },
    layout: 'padded',
  },
  render: () => (
    <div className="tag-story__frame">
      <Tag tone="neutral" icon={<Icon name="tag" />}>
        Status
      </Tag>
      <Tag tone="ai" icon={<Icon name="sparkle" />}>
        Status
      </Tag>
    </div>
  ),
};
