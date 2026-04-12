import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { expect, fn, userEvent, waitFor } from 'storybook/test';
import type { ChangeEvent } from 'react';

import { Switch, type SwitchProps } from './Switch';
import { selectionControlsDesign } from './selection-controls.design';
import './selection-controls.stories.css';

const meta = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    design: selectionControlsDesign,
    docs: {
      description: {
        component:
          'Selection control primitive for binary settings that benefit from an on/off affordance.',
      },
    },
  },
  args: {
    label: 'Show seller phone number',
    supportingText: 'Lets buyers contact you faster.',
    checked: false,
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
    onChange: {
      control: false,
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<SwitchProps>;

export default meta;

type Story = StoryObj<typeof meta>;
type SwitchArgs = Omit<SwitchProps, 'onChange'> & {
  onChange: (checked: boolean) => void;
};

const playgroundDefaults = {
  label: 'Show seller phone number',
  supportingText: 'Lets buyers contact you faster.',
  checked: false,
  invalid: false,
  disabled: false,
  required: false,
} satisfies Partial<SwitchProps>;

function renderPlayground(args: SwitchArgs) {
  const [storyArgs, updateArgs] = useArgs<SwitchArgs>();

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
  } satisfies SwitchProps;

  return (
    <div className="selection-control-story-frame">
      <Switch {...resolvedArgs} />
    </div>
  );
}

export const Playground: Story = {
  render: renderPlayground,
  play: async ({ canvas, args }) => {
    const input = canvas.getByRole('switch');

    await userEvent.click(input);
    await waitFor(() => expect(canvas.getByRole('switch')).toBeChecked());
    await expect(args.onChange).toHaveBeenCalled();
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
      <Switch
        label="Off"
        supportingText="Default switch state."
      />
      <Switch
        checked
        label="On"
        supportingText="Selected state uses the primary track."
      />
      <Switch
        disabled
        label="Disabled"
        supportingText="Disabled controls should mute the surface and text."
      />
      <Switch
        invalid
        errorText="This setting is required for checkout."
        label="Error"
        supportingText="Invalid state is surfaced through the error text."
      />
    </div>
  ),
};
