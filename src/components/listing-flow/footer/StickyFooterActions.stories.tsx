import type { Meta, StoryObj } from '@storybook/react-vite';

import { StickyFooterActions } from './StickyFooterActions';
import { createFigmaDesign } from '../../../stories/figma-design';
import { fn, userEvent, expect } from 'storybook/test';

const footerDesign = createFigmaDesign(
  'https://www.figma.com/design/941LilI1FqImC2usHWp0qN/Listing-Flow-Draft--Recreate-?node-id=1098-30278&m=dev',
);

const meta = {
  title: 'Listing Flow/Sticky Footer Actions',
  component: StickyFooterActions,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    design: footerDesign,
    docs: {
      description: {
        component:
          'Sticky footer action row for the listing flow, built from the shared button primitive and semantic action labels.',
      },
    },
  },
  args: {
    leadingText: 'Draft autosaves as you move through the flow.',
    secondaryActionLabel: 'Save draft',
    primaryActionLabel: 'Continue',
  },
  argTypes: {
    leadingText: {
      control: 'text',
    },
    secondaryActionLabel: {
      control: 'text',
    },
    primaryActionLabel: {
      control: 'text',
    },
  },
} satisfies Meta<typeof StickyFooterActions>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <div style={{ width: '100%', maxWidth: '900px' }}>
      <StickyFooterActions
        {...args}
        onSecondaryAction={fn()}
        onPrimaryAction={fn()}
      />
    </div>
  ),
  play: async ({ canvas }) => {
    const continueButton = canvas.getByRole('button', { name: /continue/i });
    await userEvent.click(continueButton);
    await expect(continueButton).toBeEnabled();
  },
};

