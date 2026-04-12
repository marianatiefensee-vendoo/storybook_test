import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { expect, fn, userEvent, waitFor } from 'storybook/test';

import {
  MarketplaceSpecificsPanel,
  ListingPreviewCard,
  ListingPreviewPanel,
  ListingProgressPanel,
  ListingProgressStepRow,
  SupportingPaneSection,
  type ListingProgressStepStatus,
} from './SupportingPane';
import { createFigmaDesign } from '../../../stories/figma-design';

const supportingPaneDesign = createFigmaDesign(
  'https://www.figma.com/design/941LilI1FqImC2usHWp0qN/Listing-Flow-Draft--Recreate-?node-id=1098-30111&m=dev',
);

type SupportingPaneStoryArgs = {
  title: string;
  trailingLabel: string;
  step: number;
  status: ListingProgressStepStatus;
  currentStep: number;
  previewTitle: string;
  previewDescription: string;
  previewPrice: string;
  selectedPreviewChips: string[];
};

const meta = {
  title: 'Listing Flow/Supporting Pane',
  component: SupportingPaneSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    design: supportingPaneDesign,
    docs: {
      description: {
        component:
          'Supporting-pane primitives for the listing flow, including section chrome, progress state, marketplace selection, and the generated preview card.',
      },
    },
  },
  args: {
    title: 'Supporting Pane',
    trailingLabel: 'Context',
    step: 2,
    status: 'current',
    currentStep: 1,
    previewTitle: 'Vendoo denim jacket',
    previewDescription:
      'Vintage washed denim jacket with a relaxed fit and subtle distressing.',
    previewPrice: '$48.00',
    selectedPreviewChips: ['Jacket', 'Size M', 'Blue'],
  },
  argTypes: {
    title: {
      control: 'text',
    },
    trailingLabel: {
      control: 'text',
    },
    step: {
      control: { type: 'number', min: 1, max: 6, step: 1 },
    },
    status: {
      control: 'radio',
      options: ['current', 'complete', 'upcoming'] satisfies ListingProgressStepStatus[],
    },
    currentStep: {
      control: { type: 'number', min: 1, max: 6, step: 1 },
    },
    previewTitle: {
      control: 'text',
    },
    previewDescription: {
      control: 'text',
    },
    previewPrice: {
      control: 'text',
    },
    selectedPreviewChips: {
      control: false,
    },
  },
} satisfies Meta<SupportingPaneStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => {
    const [storyArgs, updateArgs] = useArgs<SupportingPaneStoryArgs>();
    const resolved = { ...args, ...storyArgs };

    return (
      <SupportingPaneSection
        title={resolved.title}
        trailing={<span className="listing-flow-chip listing-flow-chip--neutral">{resolved.trailingLabel}</span>}
      >
        <div className="listing-flow-stack">
          <ListingProgressStepRow
            step={resolved.step}
            status={resolved.status}
            title="Title & Description"
            supportingText="Describe your item for shoppers."
            onClick={() =>
              updateArgs({
                status:
                  resolved.status === 'current'
                    ? 'complete'
                    : resolved.status === 'complete'
                      ? 'upcoming'
                      : 'current',
              })
            }
          />
          <ListingPreviewCard
            statusLabel="Listing Generated"
            title={resolved.previewTitle}
            description={resolved.previewDescription}
            priceLabel={resolved.previewPrice}
            chips={resolved.selectedPreviewChips.map((chip) => <span key={chip}>{chip}</span>)}
          />
        </div>
      </SupportingPaneSection>
    );
  },
};

export const ProgressPanel: Story = {
  parameters: {
    layout: 'padded',
    design: createFigmaDesign(
      'https://www.figma.com/design/941LilI1FqImC2usHWp0qN/Listing-Flow-Draft--Recreate-?node-id=1098-30127&m=dev',
    ),
  },
  render: () => {
    const [storyArgs, updateArgs] = useArgs<SupportingPaneStoryArgs>();
    const currentStep = storyArgs.currentStep ?? 1;

    return (
      <ListingProgressPanel
        currentStep={currentStep}
        steps={[
          { step: 1, title: 'Photos', supportingText: 'Add four clear images.' },
          { step: 2, title: 'Title & Description', supportingText: 'Set the listing content.' },
          { step: 3, title: 'Marketplaces', supportingText: 'Pick your selling channels.' },
          { step: 4, title: 'Item Details', supportingText: 'Share details shoppers need.' },
        ]}
        onStepSelect={(step) => updateArgs({ currentStep: step })}
      />
    );
  },
  play: async ({ canvas }) => {
    const targetRow = canvas.getByRole('button', { name: /Marketplaces/i });
    await userEvent.click(targetRow);
    await waitFor(() => expect(targetRow).toHaveAttribute('data-status', 'current'));
  },
};

export const PreviewPanel: Story = {
  parameters: {
    layout: 'centered',
    design: createFigmaDesign(
      'https://www.figma.com/design/941LilI1FqImC2usHWp0qN/Listing-Flow-Draft--Recreate-?node-id=1098-30145&m=dev',
    ),
  },
  render: () => (
    <ListingPreviewPanel
      previewTitle="Vintage denim jacket"
      statusLabel="Listing Generated"
      description="Vintage washed denim jacket with a relaxed fit and subtle distressing."
      priceLabel="$48.00"
      chips={[
        <span key="1">Jacket</span>,
        <span key="2">Size M</span>,
        <span key="3">Blue</span>,
      ]}
    />
  ),
};

export const MarketplaceSpecifics: Story = {
  parameters: {
    layout: 'centered',
    design: createFigmaDesign(
      'https://www.figma.com/design/941LilI1FqImC2usHWp0qN/Listing-Flow-Draft--Recreate-?node-id=1118-14093&m=dev',
    ),
  },
  render: () => (
    <MarketplaceSpecificsPanel
      marketplaces={[
        {
          name: 'eBay',
          supportText: 'Ready to list',
          selected: true,
          icon: 'store',
          onSelectedChange: fn(),
        },
        {
          name: 'Poshmark',
          supportText: 'Needs setup',
          selected: false,
          icon: 'shopping_bag',
          onSelectedChange: fn(),
        },
      ]}
      onAddMarketplace={fn()}
    />
  ),
};
