import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { expect, userEvent, waitFor } from 'storybook/test';

import {
  MarketplaceSelectionGrid,
  MarketplaceSelectorReadiness,
  type MarketplaceSpecificsItem,
} from '../supporting-pane/SupportingPane';
import { createFigmaDesign } from '../../../stories/figma-design';
import type { IconName } from '../../ui/icon/icon-names';

const marketplacesDesign = createFigmaDesign(
  'https://www.figma.com/design/941LilI1FqImC2usHWp0qN/Listing-Flow-Draft--Recreate-?node-id=1118-14093&m=dev',
);

type MarketplaceStoriesArgs = {
  selected: string;
};

const demoMarketplaces = [
  { name: 'eBay', icon: 'store', supportText: 'Ready to list' },
  { name: 'Poshmark', icon: 'shopping_bag', supportText: 'Needs setup' },
  { name: 'Mercari', icon: 'package', supportText: 'Ready to list' },
  { name: 'Etsy', icon: 'jacket', supportText: 'Waiting for details' },
] satisfies Array<MarketplaceSpecificsItem & { icon: IconName }>;

const meta = {
  title: 'Listing Flow/Marketplaces',
  component: MarketplaceSelectorReadiness,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    design: marketplacesDesign,
    docs: {
      description: {
        component:
          'Marketplace selection primitives that use the shared checkbox control and group into the marketplace grid shown in the listing flow.',
      },
    },
  },
  args: {
    selected: 'eBay',
  },
  argTypes: {
    selected: {
      control: 'text',
    },
  },
} satisfies Meta<MarketplaceStoriesArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => {
    const [storyArgs, updateArgs] = useArgs<MarketplaceStoriesArgs>();
    const resolved = { ...args, ...storyArgs };

    return (
      <div className="listing-flow-marketplace-grid listing-flow-marketplace-grid--two">
        {demoMarketplaces.map((marketplace) => (
          <MarketplaceSelectorReadiness
            key={marketplace.name}
            marketplace={marketplace.name}
            icon={marketplace.icon}
            supportingText={marketplace.supportText}
            selected={resolved.selected === marketplace.name}
            onSelectedChange={(selected) => {
              if (selected) {
                updateArgs({ selected: marketplace.name });
              }
            }}
          />
        ))}
      </div>
    );
  },
  play: async ({ canvas }) => {
    const poshmark = canvas.getByRole('checkbox', { name: /Poshmark/i });
    await userEvent.click(poshmark);
    await waitFor(() => expect(poshmark).toBeChecked());
  },
};

export const Grid: Story = {
  parameters: {
    layout: 'padded',
    controls: {
      disable: true,
    },
    design: marketplacesDesign,
  },
  render: () => (
    <MarketplaceSelectionGrid
      columns={2}
      items={[
        {
          marketplace: 'eBay',
          icon: 'store',
          selected: true,
          supportText: 'Ready to list',
        },
        {
          marketplace: 'Poshmark',
          icon: 'shopping_bag',
          supportText: 'Needs setup',
        },
        {
          marketplace: 'Mercari',
          icon: 'package',
          supportText: 'Ready to list',
        },
        {
          marketplace: 'Etsy',
          icon: 'jacket',
          supportText: 'Waiting for details',
        },
      ]}
    />
  ),
};
