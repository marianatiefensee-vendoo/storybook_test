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
  showLeadingIcon: boolean;
  showTrailingIcon: boolean;
  leadingIconName: '' | IconName;
  trailingIconName: '' | IconName;
};

function resolveDefaultLeadingIconName(tone: TagTone) {
  return tone === 'ai' ? 'sparkle' : 'tag';
}

function renderIcon(iconName: '' | IconName) {
  if (!iconName) {
    return null;
  }

  return <Icon name={iconName} />;
}

function renderTag(args: TagStoryArgs) {
  const leadingIconName = args.leadingIconName || resolveDefaultLeadingIconName(args.tone);
  const trailingIconName = args.trailingIconName || 'tag';

  return (
    <Tag
      tone={args.tone}
      leadingIcon={args.showLeadingIcon ? renderIcon(leadingIconName) : null}
      trailingIcon={args.showTrailingIcon ? renderIcon(trailingIconName) : null}
    >
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
    showLeadingIcon: true,
    showTrailingIcon: false,
    leadingIconName: '',
    trailingIconName: '',
  },
  argTypes: {
    children: {
      control: 'text',
    },
    tone: {
      control: 'radio',
      options: ['neutral', 'ai'] satisfies TagTone[],
    },
    showLeadingIcon: {
      control: 'boolean',
      table: {
        disable: true,
      },
    },
    showTrailingIcon: {
      control: 'boolean',
      table: {
        disable: true,
      },
    },
    leadingIconName: {
      control: 'select',
      options: ['', ...iconNames] as Array<'' | IconName>,
      table: {
        disable: true,
      },
    },
    trailingIconName: {
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
      <Tag tone="neutral" leadingIcon={<Icon name="tag" />}>
        Status
      </Tag>
      <Tag tone="ai" leadingIcon={<Icon name="sparkle" />}>
        Status
      </Tag>
    </div>
  ),
};
