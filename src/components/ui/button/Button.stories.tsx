import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { Button, type ButtonProps, type ButtonSize, type ButtonVariant } from './Button';
import './button.stories.css';

type StoryArgs = Omit<ButtonProps, 'children'> & {
  label: string;
  showLeadingIcon: boolean;
  showTrailingIcon: boolean;
};

const LinkIcon = () => (
  <svg
    aria-hidden="true"
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.5 15.5 7.25 17.75a3.182 3.182 0 0 1-4.5 0 3.182 3.182 0 0 1 0-4.5L5 11"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    />
    <path
      d="M14.5 8.5 16.75 6.25a3.182 3.182 0 0 1 4.5 0 3.182 3.182 0 0 1 0 4.5L19 13"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    />
    <path
      d="m8.25 15.75 7.5-7.5"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    />
  </svg>
);

const ButtonStory = ({
  label,
  showLeadingIcon,
  showTrailingIcon,
  leadingIcon,
  trailingIcon,
  ...args
}: StoryArgs) => (
  <Button
    {...args}
    leadingIcon={showLeadingIcon ? leadingIcon ?? <LinkIcon /> : undefined}
    trailingIcon={showTrailingIcon ? trailingIcon ?? <LinkIcon /> : undefined}
  >
    {label}
  </Button>
);

ButtonStory.displayName = 'ButtonStory';

const meta = {
  title: 'Components/Button',
  component: ButtonStory,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onClick: fn(),
    variant: 'filled',
    size: 'medium',
    label: 'Button',
    showLeadingIcon: false,
    showTrailingIcon: false,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'outline', 'text', 'tonal'] satisfies ButtonVariant[],
    },
    size: {
      control: 'radio',
      options: ['medium', 'small'] satisfies ButtonSize[],
    },
    loading: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    showLeadingIcon: {
      control: 'boolean',
    },
    showTrailingIcon: {
      control: 'boolean',
    },
    label: {
      control: 'text',
    },
    leadingIcon: {
      control: false,
    },
    trailingIcon: {
      control: false,
    },
  },
} satisfies Meta<StoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  args: {
    showLeadingIcon: false,
    showTrailingIcon: false,
  },
  parameters: {
    layout: 'padded',
  },
  render: (args) => (
    <div className="button-demo-grid">
      {(['filled', 'outline', 'text', 'tonal'] as ButtonVariant[]).map((variant) => (
        <Button key={variant} {...args} variant={variant}>
          {variant}
        </Button>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  args: {
    showLeadingIcon: false,
    showTrailingIcon: false,
  },
  parameters: {
    layout: 'padded',
  },
  render: (args) => (
    <div className="button-demo-grid button-demo-grid--stacked">
      {(['medium', 'small'] as ButtonSize[]).map((size) => (
        <Button key={size} {...args} size={size}>
          {size}
        </Button>
      ))}
    </div>
  ),
};

export const WithIcons: Story = {
  args: {
    showLeadingIcon: true,
    showTrailingIcon: true,
  },
  parameters: {
    layout: 'padded',
  },
  render: (args) => (
    <div className="button-demo-grid button-demo-grid--icons">
      <Button {...args} leadingIcon={<LinkIcon />} trailingIcon={undefined}>
        Leading icon
      </Button>
      <Button {...args} leadingIcon={undefined} trailingIcon={<LinkIcon />}>
        Trailing icon
      </Button>
      <Button {...args} leadingIcon={<LinkIcon />} trailingIcon={<LinkIcon />}>
        Both icons
      </Button>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    showLeadingIcon: false,
    showTrailingIcon: false,
  },
  parameters: {
    layout: 'padded',
  },
  render: (args) => (
    <div className="button-demo-grid button-demo-grid--stacked">
      {(['filled', 'outline', 'text', 'tonal'] as ButtonVariant[]).map((variant) => (
        <Button key={variant} {...args} variant={variant}>
          {variant}
        </Button>
      ))}
    </div>
  ),
};

export const Loading: Story = {
  args: {
    variant: 'filled',
    size: 'small',
    loading: true,
    showLeadingIcon: false,
    showTrailingIcon: false,
  },
  parameters: {
    layout: 'centered',
  },
};

export const FigmaMatrix: Story = {
  args: {
    showLeadingIcon: false,
    showTrailingIcon: false,
  },
  parameters: {
    layout: 'padded',
  },
  render: (args) => (
    <div className="button-matrix">
      <div className="button-matrix__row">
        <Button {...args} variant="filled" size="medium">
          Button
        </Button>
        <Button {...args} variant="filled" size="medium">
          Button
        </Button>
        <Button {...args} variant="filled" size="medium" disabled>
          Button
        </Button>
        <Button {...args} variant="filled" size="small">
          Button
        </Button>
      </div>
      <div className="button-matrix__row">
        <Button {...args} variant="filled" size="small">
          Button
        </Button>
        <Button {...args} variant="filled" size="small" loading>
          Button
        </Button>
        <Button {...args} variant="filled" size="small" disabled>
          Button
        </Button>
        <Button {...args} variant="outline" size="medium">
          Button
        </Button>
      </div>
      <div className="button-matrix__row">
        <Button {...args} variant="outline" size="medium">
          Button
        </Button>
        <Button {...args} variant="outline" size="medium" disabled>
          Button
        </Button>
        <Button {...args} variant="outline" size="small">
          Button
        </Button>
        <Button {...args} variant="outline" size="small">
          Button
        </Button>
      </div>
      <div className="button-matrix__row">
        <Button {...args} variant="outline" size="small" disabled>
          Button
        </Button>
        <Button {...args} variant="text" size="medium">
          Button
        </Button>
        <Button {...args} variant="text" size="medium" disabled>
          Button
        </Button>
        <Button {...args} variant="text" size="small">
          Button
        </Button>
      </div>
      <div className="button-matrix__row">
        <Button {...args} variant="text" size="small" disabled>
          Button
        </Button>
        <Button {...args} variant="tonal" size="medium" disabled>
          Button
        </Button>
        <Button {...args} variant="tonal" size="medium">
          Button
        </Button>
        <Button {...args} variant="tonal" size="small">
          Button
        </Button>
      </div>
      <div className="button-matrix__row">
        <Button {...args} variant="tonal" size="small" disabled>
          Button
        </Button>
      </div>
    </div>
  ),
};
