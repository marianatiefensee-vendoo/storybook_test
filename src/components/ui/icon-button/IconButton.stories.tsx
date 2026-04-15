import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent } from 'storybook/test';

import { IconButton, type IconButtonProps, type IconButtonSize, type IconButtonVariant } from './IconButton';
import { Icon } from '../icon/Icon';
import { iconNames, type IconName } from '../icon/icon-names';
import { createFigmaDesign } from '../../../stories/figma-design';
import './icon-button.stories.css';

const iconButtonDesignUrl =
  'https://www.figma.com/design/LS1yOsOQqbFFpG4c8T2kQO/Go-Flow-Design-System?node-id=1-5144&m=dev';

type IconButtonStoryArgs = IconButtonProps & {
  iconName: '' | IconName;
};

function renderIconButton(args: IconButtonStoryArgs) {
  const { iconName, icon: _icon, ...buttonArgs } = args;

  return <IconButton {...buttonArgs} icon={iconName ? <Icon name={iconName} /> : null} />;
}

const meta = {
  title: 'Components/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    design: createFigmaDesign(iconButtonDesignUrl),
    docs: {
      description: {
        component:
          'Atomic icon-button primitive for standalone actions. The story controls keep icon selection story-only while the public API stays label-first and token-driven.',
      },
    },
  },
  args: {
    label: 'Open navigation',
    icon: null,
    iconName: 'menu',
    variant: 'standard',
    size: 'medium',
    disabled: false,
    onClick: fn(),
  },
  argTypes: {
    label: {
      control: 'text',
    },
    iconName: {
      control: 'select',
      options: ['', ...iconNames] as Array<'' | IconName>,
    },
    variant: {
      control: 'radio',
      options: ['standard', 'outline', 'filled', 'tonal'] satisfies IconButtonVariant[],
    },
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'] satisfies IconButtonSize[],
    },
    disabled: {
      control: 'boolean',
    },
    icon: {
      table: {
        disable: true,
      },
      control: false,
    },
    onClick: {
      control: false,
    },
  },
} satisfies Meta<IconButtonStoryArgs> & { component: typeof IconButton };

export default meta;

type Story = StoryObj<IconButtonStoryArgs>;

export const Playground: Story = {
  render: renderIconButton,
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Open navigation' }));
    await expect(canvas.getByRole('button', { name: 'Open navigation' })).toBeInTheDocument();
  },
};

export const Variants: Story = {
  parameters: {
    controls: {
      disable: true,
    },
    layout: 'padded',
  },
  render: () => (
    <div className="icon-button-story__grid">
      {(['standard', 'outline', 'filled', 'tonal'] as IconButtonVariant[]).map((variant) => (
        <div key={variant} className="icon-button-story__tile">
          <IconButton
            icon={<Icon name="menu" />}
            label={variant}
            variant={variant}
            size="medium"
          />
          <span className="icon-button-story__caption">{variant}</span>
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  parameters: {
    controls: {
      disable: true,
    },
    layout: 'padded',
  },
  render: () => (
    <div className="icon-button-story__grid">
      {(['small', 'medium', 'large'] as IconButtonSize[]).map((size) => (
        <div key={size} className="icon-button-story__tile">
          <IconButton icon={<Icon name="menu" />} label={size} variant="standard" size={size} />
          <span className="icon-button-story__caption">{size}</span>
        </div>
      ))}
    </div>
  ),
};

export const States: Story = {
  parameters: {
    controls: {
      disable: true,
    },
    layout: 'padded',
  },
  render: () => (
    <div className="icon-button-story__grid">
      <div className="icon-button-story__tile">
        <IconButton icon={<Icon name="menu" />} label="Default" variant="standard" size="medium" />
        <span className="icon-button-story__caption">Default</span>
      </div>
      <div className="icon-button-story__tile icon-button-story__tile--hover">
        <IconButton icon={<Icon name="menu" />} label="Hover" variant="standard" size="medium" />
        <span className="icon-button-story__caption">Hover</span>
      </div>
      <div className="icon-button-story__tile icon-button-story__tile--focus">
        <IconButton
          icon={<Icon name="menu" />}
          label="Focus visible"
          variant="standard"
          size="medium"
        />
        <span className="icon-button-story__caption">Focus visible</span>
      </div>
      <div className="icon-button-story__tile">
        <IconButton
          icon={<Icon name="menu" />}
          label="Disabled"
          variant="standard"
          size="medium"
          disabled
        />
        <span className="icon-button-story__caption">Disabled</span>
      </div>
    </div>
  ),
};

export const FigmaMatrix: Story = {
  parameters: {
    controls: {
      disable: true,
    },
    layout: 'padded',
    design: createFigmaDesign('https://www.figma.com/design/LS1yOsOQqbFFpG4c8T2kQO/Go-Flow-Design-System?node-id=1-5070&m=dev'),
  },
  render: () => (
    <div className="icon-button-story__matrix">
      {(['standard', 'outline', 'filled', 'tonal'] as IconButtonVariant[]).map((variant) => (
        <div key={variant} className="icon-button-story__matrix-column">
          <div className="icon-button-story__matrix-heading">{variant}</div>
          {(['small', 'medium', 'large'] as IconButtonSize[]).map((size) => (
            <div key={`${variant}-${size}`} className="icon-button-story__tile">
              <IconButton
                icon={<Icon name="menu" />}
                label={`${variant} ${size}`}
                variant={variant}
                size={size}
              />
              <span className="icon-button-story__caption">{size}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
};
