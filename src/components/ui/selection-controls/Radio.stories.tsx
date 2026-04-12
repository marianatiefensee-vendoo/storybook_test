import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { expect, fn, userEvent, waitFor } from 'storybook/test';
import type { ChangeEvent } from 'react';

import { Radio, type RadioProps } from './Radio';
import { selectionControlsDesign } from './selection-controls.design';
import './selection-controls.stories.css';

const meta = {
  title: 'Components/Radio',
  component: Radio,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    design: selectionControlsDesign,
    docs: {
      description: {
        component:
          'Selection control primitive for one-of-many choices. Use one radio per option inside a group.',
      },
    },
  },
  args: {
    label: 'Email updates',
    supportingText: 'Receive the daily summary in your inbox.',
    checked: false,
    invalid: false,
    disabled: false,
    required: false,
    name: 'updates',
    value: 'email',
    onChange: fn(),
  },
  argTypes: {
    label: {
      control: 'text',
    },
    supportingText: {
      control: 'text',
    },
    checked: {
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
    name: {
      control: 'text',
    },
    value: {
      control: 'text',
    },
    onChange: {
      control: false,
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<RadioProps>;

export default meta;

type Story = StoryObj<typeof meta>;
type RadioArgs = Omit<RadioProps, 'onChange'> & {
  onChange: (checked: boolean) => void;
};

const playgroundDefaults = {
  label: 'Email updates',
  supportingText: 'Receive the daily summary in your inbox.',
  checked: false,
  invalid: false,
  disabled: false,
  required: false,
  name: 'updates',
  value: 'email',
} satisfies Partial<RadioProps>;

function renderPlayground(args: RadioArgs) {
  const [storyArgs, updateArgs] = useArgs<RadioArgs>();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const checked = event.currentTarget.checked;

    args.onChange?.(checked);
    updateArgs({ checked });
  };

  const resolvedArgs = {
    ...playgroundDefaults,
    ...args,
    ...storyArgs,
    checked: storyArgs.checked ?? args.checked ?? false,
    onChange: handleChange,
  } satisfies RadioProps;

  return (
    <div className="selection-control-story-frame">
      <Radio {...resolvedArgs} />
    </div>
  );
}

export const Playground: Story = {
  render: renderPlayground,
  play: async ({ canvas }) => {
    const input = canvas.getByRole('radio');

    await userEvent.click(input);
    await waitFor(() => expect(canvas.getByRole('radio')).toBeChecked());
  },
};

export const Group: Story = {
  parameters: {
    controls: {
      disable: true,
    },
  },
  render: () => (
    <fieldset className="selection-control-story-frame">
      <legend className="selection-control-story-group">
        <span className="selection-control__label">Notification frequency</span>
        <span className="selection-control__supporting">
          Choose exactly one delivery cadence.
        </span>
      </legend>
      <div className="selection-control-story-group">
        <Radio name="frequency" value="daily" label="Daily" checked />
        <Radio name="frequency" value="weekly" label="Weekly" />
        <Radio name="frequency" value="monthly" label="Monthly" />
      </div>
    </fieldset>
  ),
};

export const States: Story = {
  parameters: {
    controls: {
      disable: true,
    },
  },
  render: () => (
    <div className="selection-control-story-stack">
      <Radio
        label="Unchecked"
        supportingText="Default radio state."
        name="radio-states"
        value="unchecked"
      />
      <Radio
        checked
        label="Checked"
        supportingText="Selected state uses the filled dot."
        name="radio-states"
        value="checked"
      />
      <Radio
        disabled
        label="Disabled"
        supportingText="Disabled controls should mute the surface and text."
        name="radio-states"
        value="disabled"
      />
      <Radio
        invalid
        errorText="You must choose one delivery cadence."
        label="Error"
        supportingText="Invalid state is surfaced through the error text."
        name="radio-states"
        value="error"
      />
    </div>
  ),
};
