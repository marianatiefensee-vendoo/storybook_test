import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { expect, fn, userEvent } from 'storybook/test';
import type { ChangeEvent } from 'react';

import { TextArea, type TextAreaProps } from './TextArea';
import { createFigmaDesign } from '../../../stories/figma-design';
import './text-area.stories.css';

const textAreaDesignUrl =
  'https://www.figma.com/design/LS1yOsOQqbFFpG4c8T2kQO/Go-Flow-Design-System?node-id=1559-12825&m=dev';

const meta = {
  title: 'Components/TextArea',
  component: TextArea,
  parameters: {
    layout: 'centered',
    design: createFigmaDesign(textAreaDesignUrl),
  },
  tags: ['autodocs'],
  args: {
    label: 'Description',
    placeholder: 'Tell us what you are selling...',
    value: '',
    supportingText: 'Add details that help the buyer understand the item.',
    errorText: 'Description is required.',
    invalid: false,
    disabled: false,
    required: false,
    rows: 4,
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
    rows: {
      control: 'number',
    },
    onChange: {
      control: false,
    },
  },
} satisfies Meta<typeof TextArea>;

export default meta;

type Story = StoryObj<typeof meta>;
type TextAreaArgs = NonNullable<Story['args']>;

const playgroundDefaults = {
  label: 'Description',
  placeholder: 'Tell us what you are selling...',
  supportingText: 'Add details that help the buyer understand the item.',
  errorText: 'Description is required.',
  invalid: false,
  disabled: false,
  required: false,
  rows: 4,
} satisfies Partial<TextAreaProps>;

function renderPlayground(args: TextAreaArgs) {
  const [storyArgs, updateArgs] = useArgs<TextAreaArgs>();

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    args.onChange?.(event);
    updateArgs({ value: event.target.value });
  };

  const resolvedArgs = {
    ...playgroundDefaults,
    ...args,
    ...storyArgs,
    value: storyArgs.value ?? '',
    onChange: handleChange,
  } satisfies TextAreaProps;

  return (
    <div className="text-area-story-shell">
      <TextArea {...resolvedArgs} />
    </div>
  );
}

export const Playground: Story = {
  render: renderPlayground,
  play: async ({ canvas }) => {
    const input = canvas.getByRole('textbox');

    await userEvent.clear(input);
    await userEvent.type(input, 'A longer product description.');

    await expect(input).toHaveValue('A longer product description.');
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
    <div className="text-area-story-shell">
      <TextArea
        label="Description"
        placeholder="Tell us what you are selling..."
        supportingText="Add details that help the buyer understand the item."
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
    <div className="text-area-story-shell">
      <TextArea
        autoFocus
        label="Description"
        placeholder="Tell us what you are selling..."
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
    <div className="text-area-story-shell">
      <TextArea
        defaultValue="Mid-century dresser, walnut finish, excellent condition."
        label="Description"
        placeholder="Tell us what you are selling..."
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
    <div className="text-area-story-shell">
      <TextArea
        defaultValue="Disabled description"
        disabled
        label="Description"
        placeholder="Tell us what you are selling..."
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
    <div className="text-area-story-shell">
      <TextArea
        defaultValue=""
        errorText="Description is required."
        invalid
        label="Description"
        placeholder="Tell us what you are selling..."
        rows={4}
      />
    </div>
  ),
};
