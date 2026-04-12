import type { Meta, StoryObj } from '@storybook/react-vite';

import { Icon } from './Icon';
import { iconNames, type IconName } from './icon-names';
import { createFigmaDesign } from '../../../stories/figma-design';
import './icon.stories.css';

const iconGalleryDesignUrl =
  'https://www.figma.com/design/LS1yOsOQqbFFpG4c8T2kQO/Go-Flow-Design-System?m=dev';

const meta = {
  title: 'Components/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
    design: createFigmaDesign(iconGalleryDesignUrl),
    docs: {
      description: {
        component:
          'Canonical icon layer built from the Figma SVG set and normalized to a 24 by 24 contract.',
      },
    },
  },
  args: {
    name: 'link',
  },
  argTypes: {
    name: {
      name: 'icon',
      control: 'select',
      options: iconNames satisfies readonly IconName[],
      table: {
        type: {
          summary: 'IconName',
          detail: iconNames.map((name) => `"${name}"`).join(' | '),
        },
      },
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <div className="icon-playground">
      <div className="icon-gallery__swatch">
        <Icon {...args} />
      </div>
    </div>
  ),
};
