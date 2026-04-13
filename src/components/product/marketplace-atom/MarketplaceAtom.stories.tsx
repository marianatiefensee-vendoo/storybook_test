import type { Meta, StoryObj } from '@storybook/react-vite';

import { createFigmaDesign } from '../../../stories/figma-design';
import { MarketplaceAtom } from './MarketplaceAtom';
import {
  marketplaceAtomMarketplaces,
  marketplaceAtomSizes,
  type MarketplaceAtomMarketplace,
  type MarketplaceAtomSize,
} from './marketplace-atom.data';

const familyDesignUrl =
  'https://www.figma.com/design/LS1yOsOQqbFFpG4c8T2kQO/Go-Flow-Design-System?node-id=1585-5777&m=dev';
const defaultParityDesignUrl =
  'https://www.figma.com/design/LS1yOsOQqbFFpG4c8T2kQO/Go-Flow-Design-System?node-id=1070-2986&m=dev';
const smallParityDesignUrl =
  'https://www.figma.com/design/LS1yOsOQqbFFpG4c8T2kQO/Go-Flow-Design-System?node-id=1608-4943&m=dev';

type MarketplaceAtomStoryArgs = {
  marketplace: MarketplaceAtomMarketplace;
  size: MarketplaceAtomSize;
};

const storyGridStyle = {
  display: 'grid',
  gap: 'var(--go-flow-space-4)',
  justifyContent: 'start',
} as const;

const storyRowStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: 'var(--go-flow-space-4)',
} as const;

const storySectionStyle = {
  display: 'grid',
  gap: 'var(--go-flow-space-3)',
} as const;

const meta = {
  title: 'Product/Marketplace Atom',
  component: MarketplaceAtom,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    design: createFigmaDesign(familyDesignUrl),
    docs: {
      description: {
        component:
          'Display-only marketplace atom with a canonical logo mapping and size-aware label treatment. Use the Playground for args, the matrix stories for coverage, and the parity stories for exact Figma nodes.',
      },
    },
  },
  args: {
    marketplace: 'eBay',
    size: 'Default',
  },
  argTypes: {
    marketplace: {
      control: 'select',
      options: [...marketplaceAtomMarketplaces] satisfies MarketplaceAtomMarketplace[],
    },
    size: {
      control: 'radio',
      options: [...marketplaceAtomSizes] satisfies MarketplaceAtomSize[],
    },
  },
} satisfies Meta<MarketplaceAtomStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

function renderMarketplaceAtom(args: Partial<MarketplaceAtomStoryArgs>) {
  return (
    <MarketplaceAtom
      marketplace={args.marketplace ?? 'eBay'}
      size={args.size ?? 'Default'}
    />
  );
}

export const Playground: Story = {
  render: renderMarketplaceAtom,
};

export const Variants: Story = {
  parameters: {
    layout: 'padded',
    controls: {
      disable: true,
    },
  },
  render: () => (
    <div style={{ ...storyGridStyle, gridTemplateColumns: 'repeat(2, max-content)' }}>
      {marketplaceAtomMarketplaces.map((marketplace) => (
        <MarketplaceAtom key={marketplace} marketplace={marketplace} size="Default" />
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  parameters: {
    layout: 'padded',
    controls: {
      disable: true,
    },
  },
  render: () => (
    <div style={{ ...storyGridStyle, gap: 'var(--go-flow-space-6)' }}>
      {marketplaceAtomSizes.map((size) => (
        <section key={size} style={storySectionStyle}>
          <div
            style={{
              color: 'var(--go-flow-sys-light-on-surface-variant)',
              font: 'var(--go-flow-typography-label-large)',
              letterSpacing: 'var(--go-flow-typography-label-large-letter-spacing)',
            }}
          >
            {size}
          </div>
          <div style={storyRowStyle}>
            {marketplaceAtomMarketplaces.map((marketplace) => (
              <MarketplaceAtom key={`${size}-${marketplace}`} marketplace={marketplace} size={size} />
            ))}
          </div>
        </section>
      ))}
    </div>
  ),
};

export const FigmaDefaultParity: Story = {
  parameters: {
    layout: 'centered',
    design: createFigmaDesign(defaultParityDesignUrl),
    controls: {
      disable: true,
    },
  },
  render: () => <MarketplaceAtom marketplace="eBay" size="Default" />,
};

export const FigmaSmallParity: Story = {
  parameters: {
    layout: 'centered',
    design: createFigmaDesign(smallParityDesignUrl),
    controls: {
      disable: true,
    },
  },
  render: () => <MarketplaceAtom marketplace="eBay" size="Small" />,
};
