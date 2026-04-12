import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { fn, userEvent } from 'storybook/test';

import {
  ListingSectionCard,
  ListingSectionCardItemDetails,
  ListingSectionCardMarketplaces,
  ListingSectionCardPricing,
  ListingSectionCardShipping,
  ListingSectionHeader,
} from './ListingSectionCard';
import { ListingFlowChip, ListingFlowSelectField } from '../internal/listing-flow-ui';
import { Button } from '../../ui/button/Button';
import { createFigmaDesign } from '../../../stories/figma-design';

const sectionDesignUrl =
  'https://www.figma.com/design/941LilI1FqImC2usHWp0qN/Listing-Flow-Draft--Recreate-?node-id=1098-30238&m=dev';

type SectionStoryArgs = {
  step: number;
  title: string;
  supportingText: string;
};

const meta = {
  title: 'Listing Flow/Listing Section Card',
  component: ListingSectionCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    design: createFigmaDesign(sectionDesignUrl),
    docs: {
      description: {
        component:
          'Base section-card primitive and its listing-flow variants for marketplaces, item details, pricing, and shipping.',
      },
    },
  },
  args: {
    step: 3,
    title: 'Title & Description',
    supportingText: 'Describe the item shoppers need to know about.',
  },
  argTypes: {
    step: {
      control: { type: 'number', min: 1, max: 8, step: 1 },
    },
    title: {
      control: 'text',
    },
    supportingText: {
      control: 'text',
    },
  },
} satisfies Meta<SectionStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => {
    const [storyArgs] = useArgs<SectionStoryArgs>();
    const resolved = { ...args, ...storyArgs };

    return (
      <ListingSectionCard
        step={resolved.step}
        title={resolved.title}
        supportingText={resolved.supportingText}
      >
        <ListingFlowChip tone="neutral">Collapsed section body</ListingFlowChip>
      </ListingSectionCard>
    );
  },
};

export const Header: Story = {
  parameters: {
    layout: 'centered',
    controls: {
      disable: true,
    },
  },
  render: () => (
    <div style={{ width: '100%', maxWidth: '480px' }}>
      <ListingSectionHeader
        step={3}
        title="Title & Description"
        supportingText="Describe the item shoppers need to know about."
        trailing={<ListingFlowChip tone="accent">Expanded</ListingFlowChip>}
      />
    </div>
  ),
};

export const Marketplaces: Story = {
  parameters: {
    layout: 'padded',
    design: createFigmaDesign(
      'https://www.figma.com/design/941LilI1FqImC2usHWp0qN/Listing-Flow-Draft--Recreate-?node-id=1098-30238&m=dev',
    ),
  },
  render: () => (
    <ListingSectionCardMarketplaces step={3}>
      <div className="listing-flow-stack">
        <ListingFlowChip tone="accent">Choose where to sell</ListingFlowChip>
        <p>Map the listing to the marketplaces you want to publish to.</p>
      </div>
    </ListingSectionCardMarketplaces>
  ),
};

export const ItemDetails: Story = {
  parameters: {
    layout: 'padded',
    design: createFigmaDesign(
      'https://www.figma.com/design/941LilI1FqImC2usHWp0qN/Listing-Flow-Draft--Recreate-?node-id=1098-30239&m=dev',
    ),
  },
  render: () => (
    <ListingSectionCardItemDetails step={4}>
      <div className="listing-flow-stack">
        <p>Keep the item details section collapsed or expand it later when the content lands.</p>
        <ListingFlowChip tone="neutral">Header-only placeholder</ListingFlowChip>
      </div>
    </ListingSectionCardItemDetails>
  ),
};

export const Pricing: Story = {
  parameters: {
    layout: 'padded',
    design: createFigmaDesign(
      'https://www.figma.com/design/941LilI1FqImC2usHWp0qN/Listing-Flow-Draft--Recreate-?node-id=1098-30276&m=dev',
    ),
  },
  render: () => {
    const recalculatePrice = fn();

    return (
      <ListingSectionCardPricing step={5}>
        <div className="listing-flow-stack">
          <ListingFlowSelectField
            label="Price"
            value="48"
            onValueChange={fn()}
            options={[
              { label: '$48.00', value: '48' },
              { label: '$52.00', value: '52' },
              { label: '$60.00', value: '60' },
            ]}
            trailingChip={<ListingFlowChip tone="accent">AI suggested</ListingFlowChip>}
            supportingText="Use the suggested price or choose your own."
          />
          <Button variant="outline" size="small" onClick={() => recalculatePrice()}>
            Recalculate price
          </Button>
        </div>
      </ListingSectionCardPricing>
    );
  },
  play: async ({ canvas }) => {
    await userEvent.selectOptions(canvas.getByRole('combobox'), '52');
  },
};

export const Shipping: Story = {
  parameters: {
    layout: 'padded',
    design: createFigmaDesign(
      'https://www.figma.com/design/941LilI1FqImC2usHWp0qN/Listing-Flow-Draft--Recreate-?node-id=1098-30277&m=dev',
    ),
  },
  render: () => (
    <ListingSectionCardShipping step={6}>
      <div className="listing-flow-stack">
        <ListingFlowSelectField
          label="Shipping Options"
          value="standard"
          onValueChange={fn()}
          options={[
            { label: 'Standard shipping', value: 'standard' },
            { label: 'Priority shipping', value: 'priority' },
            { label: 'Local pickup', value: 'pickup' },
          ]}
          trailingChip={<ListingFlowChip tone="accent">AI suggested</ListingFlowChip>}
          supportingText="Choose the option that best matches the item."
        />
      </div>
    </ListingSectionCardShipping>
  ),
};
