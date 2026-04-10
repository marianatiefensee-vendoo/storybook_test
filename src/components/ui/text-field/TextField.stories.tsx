import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { expect, fn, userEvent } from 'storybook/test';
import type { ChangeEvent } from 'react';

import { TextField, type TextFieldProps } from './TextField';
import './text-field.stories.css';

const meta = {
  title: 'Components/TextField',
  component: TextField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    label: 'Email address',
    placeholder: 'name@example.com',
    value: '',
    supportingText: 'We will only use this for account updates.',
    errorText: 'Enter a valid email address.',
    invalid: false,
    disabled: false,
    required: false,
    type: 'email',
    onChange: fn(),
  },
  argTypes: {
    label: {
      control: 'text',
    },
    placeholder: {
      control: 'text',
    },
    value: {
      control: 'text',
    },
    supportingText: {
      control: 'text',
    },
    errorText: {
      control: 'text',
    },
    invalid: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'search', 'tel', 'url'] as const,
    },
    onChange: {
      control: false,
    },
  },
} satisfies Meta<typeof TextField>;

export default meta;

type Story = StoryObj<typeof meta>;
type TextFieldArgs = NonNullable<Story['args']>;

const playgroundDefaults = {
  label: 'Email address',
  placeholder: 'name@example.com',
  supportingText: 'We will only use this for account updates.',
  errorText: 'Enter a valid email address.',
  invalid: false,
  disabled: false,
  required: false,
  type: 'email',
} satisfies Partial<TextFieldProps>;

function renderPlayground(args: TextFieldArgs) {
  const [storyArgs, updateArgs] = useArgs<TextFieldArgs>();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    args.onChange?.(event);
    updateArgs({ value: event.target.value });
  };

  const resolvedArgs = {
    ...playgroundDefaults,
    ...args,
    ...storyArgs,
    value: storyArgs.value ?? '',
    onChange: handleChange,
  } satisfies TextFieldProps;

  return (
    <div className="text-field-story-shell">
      <TextField {...resolvedArgs} />
    </div>
  );
}

export const Playground: Story = {
  render: renderPlayground,
  play: async ({ canvas, args }) => {
    const input = canvas.getByRole('textbox');

    await userEvent.clear(input);
    await userEvent.type(input, 'codex@example.com');

    await expect(args.onChange).toHaveBeenCalled();
    await expect(input).toHaveValue('codex@example.com');
  },
};

export const Default: Story = {
  parameters: {
    layout: 'padded',
    controls: {
      disable: true,
    },
  },
  render: () => (
    <div className="text-field-story-shell">
      <TextField
        label="Email address"
        placeholder="name@example.com"
        supportingText="We will only use this for account updates."
      />
    </div>
  ),
};

export const Focused: Story = {
  parameters: {
    layout: 'padded',
    controls: {
      disable: true,
    },
  },
  render: () => (
    <div className="text-field-story-shell">
      <TextField
        autoFocus
        label="Email address"
        placeholder="name@example.com"
        supportingText="The focused state should show the ring and label color."
      />
    </div>
  ),
  play: async ({ canvas }) => {
    const input = canvas.getByRole('textbox');

    await userEvent.click(input);
    await expect(input).toHaveFocus();
  },
};

export const Filled: Story = {
  parameters: {
    layout: 'padded',
    controls: {
      disable: true,
    },
  },
  render: () => (
    <div className="text-field-story-shell">
      <TextField
        defaultValue="ada@go-flow.app"
        label="Email address"
        placeholder="name@example.com"
        supportingText="A filled field keeps the same structural layout."
      />
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
    <div className="text-field-story-shell">
      <TextField
        defaultValue="disabled@example.com"
        disabled
        label="Email address"
        placeholder="name@example.com"
        supportingText="Disabled fields should mute the surface and labels."
      />
    </div>
  ),
};

export const Error: Story = {
  parameters: {
    layout: 'padded',
    controls: {
      disable: true,
    },
  },
  render: () => (
    <div className="text-field-story-shell">
      <TextField
        defaultValue="invalid@email"
        errorText="Enter a valid email address."
        invalid
        label="Email address"
        placeholder="name@example.com"
      />
    </div>
  ),
};
