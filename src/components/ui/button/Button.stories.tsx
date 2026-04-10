import type { Meta, StoryObj } from '@storybook/react-vite';

import { expect, fn, userEvent } from 'storybook/test';

import { Button, type ButtonSize, type ButtonVariant } from './Button';
import './button.stories.css';

const LinkIcon = () => (
  <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    children: 'Button',
    onClick: fn(),
    variant: 'filled',
    size: 'medium',
    disabled: false,
    loading: false,
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
    leadingIcon: {
      control: false,
    },
    trailingIcon: {
      control: false,
    },
    onClick: {
      control: false,
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  play: async ({ canvas, args }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Button' }));
    await expect(args.onClick).toHaveBeenCalled();
  },
};

export const Variants: Story = {
  args: {
    children: 'Button',
  },
  parameters: {
    layout: 'padded',
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
  args: {
    children: 'Button',
  },
  parameters: {
    layout: 'padded',
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
  args: {
    children: 'Button',
  },
  parameters: {
    layout: 'padded',
  },
  render: () => (
    <div className="button-demo-grid button-demo-grid--icons">
      <Button leadingIcon={<LinkIcon />} trailingIcon={<LinkIcon />}>
        Button
      </Button>
      <Button leadingIcon={<LinkIcon />}>Button</Button>
      <Button trailingIcon={<LinkIcon />}>Button</Button>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    children: 'Button',
    disabled: true,
  },
  parameters: {
    layout: 'padded',
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
  args: {
    children: 'Button',
    variant: 'filled',
    size: 'small',
    loading: true,
  },
  parameters: {
    layout: 'centered',
  },
};

export const FigmaMatrix: Story = {
  args: {
    children: 'Button',
  },
  parameters: {
    layout: 'padded',
  },
  render: () => (
    <div className="button-matrix">
      <div className="button-matrix__row">
        <Button variant="filled" size="medium" leadingIcon={<LinkIcon />} trailingIcon={<LinkIcon />}>
          Button
        </Button>
        <Button variant="filled" size="medium" leadingIcon={<LinkIcon />} trailingIcon={<LinkIcon />}>
          Button
        </Button>
        <Button variant="filled" size="medium" disabled leadingIcon={<LinkIcon />} trailingIcon={<LinkIcon />}>
          Button
        </Button>
        <Button variant="filled" size="small" leadingIcon={<LinkIcon />} trailingIcon={<LinkIcon />}>
          Button
        </Button>
      </div>
      <div className="button-matrix__row">
        <Button variant="filled" size="small" leadingIcon={<LinkIcon />} trailingIcon={<LinkIcon />}>
          Button
        </Button>
        <Button variant="filled" size="small" loading>
          Button
        </Button>
        <Button variant="filled" size="small" disabled leadingIcon={<LinkIcon />} trailingIcon={<LinkIcon />}>
          Button
        </Button>
        <Button variant="outline" size="medium" leadingIcon={<LinkIcon />} trailingIcon={<LinkIcon />}>
          Button
        </Button>
      </div>
      <div className="button-matrix__row">
        <Button variant="outline" size="medium" leadingIcon={<LinkIcon />} trailingIcon={<LinkIcon />}>
          Button
        </Button>
        <Button variant="outline" size="medium" disabled leadingIcon={<LinkIcon />} trailingIcon={<LinkIcon />}>
          Button
        </Button>
        <Button variant="outline" size="small" leadingIcon={<LinkIcon />} trailingIcon={<LinkIcon />}>
          Button
        </Button>
        <Button variant="outline" size="small" leadingIcon={<LinkIcon />} trailingIcon={<LinkIcon />}>
          Button
        </Button>
      </div>
      <div className="button-matrix__row">
        <Button variant="outline" size="small" disabled leadingIcon={<LinkIcon />} trailingIcon={<LinkIcon />}>
          Button
        </Button>
        <Button variant="text" size="medium" leadingIcon={<LinkIcon />} trailingIcon={<LinkIcon />}>
          Button
        </Button>
        <Button variant="text" size="medium" disabled leadingIcon={<LinkIcon />} trailingIcon={<LinkIcon />}>
          Button
        </Button>
        <Button variant="text" size="small" leadingIcon={<LinkIcon />} trailingIcon={<LinkIcon />}>
          Button
        </Button>
      </div>
      <div className="button-matrix__row">
        <Button variant="text" size="small" disabled leadingIcon={<LinkIcon />} trailingIcon={<LinkIcon />}>
          Button
        </Button>
        <Button variant="tonal" size="medium" disabled leadingIcon={<LinkIcon />} trailingIcon={<LinkIcon />}>
          Button
        </Button>
        <Button variant="tonal" size="medium" leadingIcon={<LinkIcon />} trailingIcon={<LinkIcon />}>
          Button
        </Button>
        <Button variant="tonal" size="small" leadingIcon={<LinkIcon />} trailingIcon={<LinkIcon />}>
          Button
        </Button>
      </div>
      <div className="button-matrix__row">
        <Button variant="tonal" size="small" disabled leadingIcon={<LinkIcon />} trailingIcon={<LinkIcon />}>
          Button
        </Button>
      </div>
    </div>
  ),
};
