import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { expect, fn, userEvent, waitFor } from 'storybook/test';
import type { ChangeEvent } from 'react';

import { Checkbox, type CheckboxProps } from './Checkbox';
import { selectionControlsDesign } from './selection-controls.design';
import './selection-controls.stories.css';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    design: selectionControlsDesign,
    docs: {
      description: {
        component:
          'Selection control primitive for yes-or-no decisions, including an optional indeterminate state.',
      },
    },
  },
  args: {
    label: 'Enable notifications',
    supportingText: 'Get reminders about messages and updates.',
    errorText: 'You must choose whether notifications are enabled.',
    checked: false,
    indeterminate: false,
    invalid: false,
    disabled: false,
    required: false,
    onChange: fn(),
  },
  argTypes: {
    label: {
      control: 'text',
    },
    supportingText: {
      control: 'text',
    },
    errorText: {
      control: 'text',
    },
    checked: {
      control: 'boolean',
    },
    indeterminate: {
      control: 'boolean',
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
    onChange: {
      control: false,
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<CheckboxProps>;

export default meta;

type Story = StoryObj<typeof meta>;
type CheckboxArgs = Omit<CheckboxProps, 'onChange'> & {
  onChange: (checked: boolean) => void;
};

const playgroundDefaults = {
  label: 'Enable notifications',
  supportingText: 'Get reminders about messages and updates.',
  errorText: 'You must choose whether notifications are enabled.',
  checked: false,
  indeterminate: false,
  invalid: false,
  disabled: false,
  required: false,
} satisfies Partial<CheckboxProps>;

function renderPlayground(args: CheckboxArgs) {
  const [storyArgs, updateArgs] = useArgs<CheckboxArgs>();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const checked = event.currentTarget.checked;

    args.onChange?.(checked);
    updateArgs({
      checked,
      indeterminate: false,
    });
  };

  const resolvedArgs = {
    ...playgroundDefaults,
    ...args,
    ...storyArgs,
    checked: storyArgs.checked ?? args.checked ?? false,
    onChange: handleChange,
  } satisfies CheckboxProps;

  return (
    <div className="selection-control-story-frame">
      <Checkbox {...resolvedArgs} />
    </div>
  );
}

export const Playground: Story = {
  render: renderPlayground,
  play: async ({ canvas }) => {
    const input = canvas.getByRole('checkbox');

    await userEvent.click(input);
    await waitFor(() => expect(canvas.getByRole('checkbox')).toBeChecked());
  },
};

export const States: Story = {
  parameters: {
    controls: {
      disable: true,
    },
  },
  render: () => (
    <div className="selection-control-story-stack">
      <Checkbox
        label="Unchecked"
        supportingText="Default state with a visible label and helper copy."
      />
      <Checkbox
        checked
        label="Checked"
        supportingText="Selected state uses the primary fill and check mark."
      />
      <Checkbox
        indeterminate
        label="Indeterminate"
        supportingText="Useful when a parent control has mixed child state."
      />
      <Checkbox
        disabled
        label="Disabled"
        supportingText="Disabled controls should mute the surface and text."
      />
      <Checkbox
        invalid
        errorText="You must choose whether notifications are enabled."
        label="Error"
        supportingText="Invalid state is surfaced through the error text."
      />
    </div>
  ),
};
