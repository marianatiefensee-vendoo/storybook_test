import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';

import { expect, fn, userEvent } from 'storybook/test';

import { Button, type ButtonSize, type ButtonVariant } from './Button';
import { Icon } from '../icon/Icon';
import { iconNames, type IconName } from '../icon/icon-names';
import { createFigmaDesign } from '../../../stories/figma-design';
import './button.stories.css';

const buttonDesignUrl =
  'https://www.figma.com/design/LS1yOsOQqbFFpG4c8T2kQO/Go-Flow-Design-System?node-id=1219-5473&m=dev';
const buttonDesign = createFigmaDesign(buttonDesignUrl);

type ButtonStoryArgs = {
  children: string;
  variant: ButtonVariant;
  size: ButtonSize;
  disabled: boolean;
  loading: boolean;
  leadingIconName: '' | IconName;
  trailingIconName: '' | IconName;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  onClick: () => void;
};

function renderButton(args: ButtonStoryArgs) {
  const { leadingIconName, trailingIconName, ...buttonArgs } = args;

  return (
    <Button
      {...buttonArgs}
      leadingIcon={leadingIconName ? <Icon name={leadingIconName} /> : undefined}
      trailingIcon={trailingIconName ? <Icon name={trailingIconName} /> : undefined}
    />
  );
}

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  args: {
    children: 'Button',
    onClick: fn(),
    variant: 'filled',
    size: 'medium',
    disabled: false,
    loading: false,
    leadingIconName: '',
    trailingIconName: '',
  },
  argTypes: {
    children: {
      control: 'text',
    },
    variant: {
      control: 'select',
      options: ['filled', 'outline', 'text', 'tonal'] satisfies ButtonVariant[],
    },
    size: {
      control: 'radio',
      options: ['medium', 'small'] satisfies ButtonSize[],
    },
    disabled: {
      control: 'boolean',
    },
    loading: {
      control: 'boolean',
    },
    leadingIconName: {
      control: 'select',
      options: ['', ...iconNames] as Array<'' | IconName>,
    },
    trailingIconName: {
      control: 'select',
      options: ['', ...iconNames] as Array<'' | IconName>,
    },
    leadingIcon: {
      table: {
        disable: true,
      },
      control: false,
    },
    trailingIcon: {
      table: {
        disable: true,
      },
      control: false,
    },
    onClick: {
      control: false,
    },
  },
} satisfies Meta<ButtonStoryArgs>;

export default meta;
type Story = StoryObj<ButtonStoryArgs>;

export const Playground: Story = {
  render: renderButton,
  parameters: {
    design: buttonDesign,
  },
  play: async ({ canvas, args }) => {
    await userEvent.click(canvas.getByRole('button', { name: args.children as string }));
    await expect(args.onClick).toHaveBeenCalled();
  },
};

export const Variants: Story = {
  parameters: {
    layout: 'padded',
    controls: {
      disable: true,
    },
  },
  render: () => (
    <div className="button-demo-grid">
      {(['filled', 'outline', 'text', 'tonal'] as ButtonVariant[]).map((variant) => (
        <Button key={variant} variant={variant}>
          Button
        </Button>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  parameters: {
    layout: 'padded',
    controls: {
      disable: true,
    },
  },
  render: () => (
    <div className="button-demo-grid button-demo-grid--stacked">
      {(['medium', 'small'] as ButtonSize[]).map((size) => (
        <Button key={size} size={size}>
          Button
        </Button>
      ))}
    </div>
  ),
};

export const WithIcons: Story = {
  parameters: {
    layout: 'padded',
    controls: {
      disable: true,
    },
  },
  render: () => (
    <div className="button-demo-grid button-demo-grid--icons">
      <Button leadingIcon={<Icon name="link" />} trailingIcon={<Icon name="external_link" />}>
        Button
      </Button>
      <Button leadingIcon={<Icon name="add_link" />}>Button</Button>
      <Button trailingIcon={<Icon name="not_linked" />}>Button</Button>
    </div>
  ),
};

export const Disabled: Story = {
  parameters: {
    layout: 'padded',
    controls: {
      disable: true,
    },
  },
  render: () => (
    <div className="button-demo-grid button-demo-grid--stacked">
      {(['filled', 'outline', 'text', 'tonal'] as ButtonVariant[]).map((variant) => (
        <Button key={variant} variant={variant} disabled>
          Button
        </Button>
      ))}
    </div>
  ),
};

export const Loading: Story = {
  parameters: {
    layout: 'centered',
    controls: {
      disable: true,
    },
  },
  render: () => <Button variant="filled" size="small" loading>Button</Button>,
};

export const FigmaMatrix: Story = {
  parameters: {
    layout: 'padded',
    controls: {
      disable: true,
    },
  },
  render: () => (
    <div className="button-matrix">
      <div className="button-matrix__row">
        <Button variant="filled" size="medium" leadingIcon={<Icon name="link" />} trailingIcon={<Icon name="external_link" />}>
          Button
        </Button>
        <Button variant="filled" size="medium" leadingIcon={<Icon name="link" />} trailingIcon={<Icon name="external_link" />}>
          Button
        </Button>
        <Button variant="filled" size="medium" disabled leadingIcon={<Icon name="link" />} trailingIcon={<Icon name="external_link" />}>
          Button
        </Button>
        <Button variant="filled" size="small" leadingIcon={<Icon name="link" />} trailingIcon={<Icon name="external_link" />}>
          Button
        </Button>
      </div>
      <div className="button-matrix__row">
        <Button variant="filled" size="small" leadingIcon={<Icon name="link" />} trailingIcon={<Icon name="external_link" />}>
          Button
        </Button>
        <Button variant="filled" size="small" loading>
          Button
        </Button>
        <Button variant="filled" size="small" disabled leadingIcon={<Icon name="link" />} trailingIcon={<Icon name="external_link" />}>
          Button
        </Button>
        <Button variant="outline" size="medium" leadingIcon={<Icon name="link" />} trailingIcon={<Icon name="external_link" />}>
          Button
        </Button>
      </div>
      <div className="button-matrix__row">
        <Button variant="outline" size="medium" leadingIcon={<Icon name="link" />} trailingIcon={<Icon name="external_link" />}>
          Button
        </Button>
        <Button variant="outline" size="medium" disabled leadingIcon={<Icon name="link" />} trailingIcon={<Icon name="external_link" />}>
          Button
        </Button>
        <Button variant="outline" size="small" leadingIcon={<Icon name="link" />} trailingIcon={<Icon name="external_link" />}>
          Button
        </Button>
        <Button variant="outline" size="small" leadingIcon={<Icon name="link" />} trailingIcon={<Icon name="external_link" />}>
          Button
        </Button>
      </div>
      <div className="button-matrix__row">
        <Button variant="outline" size="small" disabled leadingIcon={<Icon name="link" />} trailingIcon={<Icon name="external_link" />}>
          Button
        </Button>
        <Button variant="text" size="medium" leadingIcon={<Icon name="link" />} trailingIcon={<Icon name="external_link" />}>
          Button
        </Button>
        <Button variant="text" size="medium" disabled leadingIcon={<Icon name="link" />} trailingIcon={<Icon name="external_link" />}>
          Button
        </Button>
        <Button variant="text" size="small" leadingIcon={<Icon name="link" />} trailingIcon={<Icon name="external_link" />}>
          Button
        </Button>
      </div>
      <div className="button-matrix__row">
        <Button variant="text" size="small" disabled leadingIcon={<Icon name="link" />} trailingIcon={<Icon name="external_link" />}>
          Button
        </Button>
        <Button variant="tonal" size="medium" disabled leadingIcon={<Icon name="link" />} trailingIcon={<Icon name="external_link" />}>
          Button
        </Button>
        <Button variant="tonal" size="medium" leadingIcon={<Icon name="link" />} trailingIcon={<Icon name="external_link" />}>
          Button
        </Button>
        <Button variant="tonal" size="small" leadingIcon={<Icon name="link" />} trailingIcon={<Icon name="external_link" />}>
          Button
        </Button>
      </div>
      <div className="button-matrix__row">
        <Button variant="tonal" size="small" disabled leadingIcon={<Icon name="link" />} trailingIcon={<Icon name="external_link" />}>
          Button
        </Button>
      </div>
    </div>
  ),
};
