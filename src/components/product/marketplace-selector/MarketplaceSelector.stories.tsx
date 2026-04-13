import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';

import { createFigmaDesign } from '../../../stories/figma-design';
import {
  marketplaceAtomMarketplaces,
  type MarketplaceAtomMarketplace,
} from '../marketplace-atom';
import {
  MarketplaceSelector,
  type MarketplaceSelectorProps,
} from './MarketplaceSelector';
import {
  marketplaceSelectorStates,
  type MarketplaceSelectorState,
} from './marketplace-selector.data';

const familyDesignUrl =
  'https://www.figma.com/design/LS1yOsOQqbFFpG4c8T2kQO/Go-Flow-Design-System?node-id=1477-3433&m=dev';
const notConnectedParityDesignUrl =
  'https://www.figma.com/design/LS1yOsOQqbFFpG4c8T2kQO/Go-Flow-Design-System?node-id=1477-3434&m=dev';
const selectedParityDesignUrl =
  'https://www.figma.com/design/LS1yOsOQqbFFpG4c8T2kQO/Go-Flow-Design-System?node-id=1477-3439&m=dev';
const notSelectedParityDesignUrl =
  'https://www.figma.com/design/LS1yOsOQqbFFpG4c8T2kQO/Go-Flow-Design-System?node-id=1644-5903&m=dev';

const storyLabelStyle = {
  color: 'var(--go-flow-sys-light-on-surface-variant)',
  font: 'var(--go-flow-typography-label-large)',
  letterSpacing: 'var(--go-flow-typography-label-large-letter-spacing)',
} as const;

const storyStackStyle = {
  display: 'grid',
  gap: 'var(--go-flow-space-4)',
  justifyItems: 'start',
} as const;

const storySectionStyle = {
  display: 'grid',
  gap: 'var(--go-flow-space-3)',
} as const;

const defaultStoryArgs = {
  marketplace: 'eBay',
  state: 'not_selected',
} satisfies Partial<MarketplaceSelectorProps>;

const meta = {
  title: 'Product/Marketplace Selector',
  component: MarketplaceSelector,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    design: createFigmaDesign(familyDesignUrl),
    docs: {
      description: {
        component:
          'Composed marketplace selector row built from the shared marketplace atom and a selector-specific trailing control. The component supports the three visual states present in the Go Flow design system family: not connected, selected, and not selected.',
      },
    },
  },
  args: defaultStoryArgs,
  argTypes: {
    marketplace: {
      control: 'select',
      options: [...marketplaceAtomMarketplaces] satisfies MarketplaceAtomMarketplace[],
    },
    state: {
      control: 'radio',
      options: [...marketplaceSelectorStates] satisfies MarketplaceSelectorState[],
    },
  },
} satisfies Meta<MarketplaceSelectorProps>;

export default meta;
type Story = StoryObj<typeof meta>;

function renderPlayground(args: Partial<MarketplaceSelectorProps>) {
  const [storyArgs, updateArgs] = useArgs<Partial<MarketplaceSelectorProps>>();
  const resolvedArgs = { ...defaultStoryArgs, ...args, ...storyArgs };
  const frameWidth = resolvedArgs.state === 'not_connected' ? '401px' : '407px';

  return (
    <div style={{ width: frameWidth }}>
      <MarketplaceSelector
        marketplace={resolvedArgs.marketplace}
        state={resolvedArgs.state}
        onSelectedChange={(selected) => {
          updateArgs({
            state: selected ? 'selected' : 'not_selected',
          });
        }}
      />
    </div>
  );
}

export const Playground: Story = {
  render: renderPlayground,
};

export const States: Story = {
  parameters: {
    layout: 'padded',
    controls: {
      disable: true,
    },
  },
  render: () => (
    <div style={storyStackStyle}>
      <section style={storySectionStyle}>
        <div style={storyLabelStyle}>Not connected</div>
        <div style={{ width: '401px' }}>
          <MarketplaceSelector marketplace="eBay" state="not_connected" />
        </div>
      </section>
      <section style={storySectionStyle}>
        <div style={storyLabelStyle}>Selected</div>
        <div style={{ width: '407px' }}>
          <MarketplaceSelector marketplace="eBay" state="selected" />
        </div>
      </section>
      <section style={storySectionStyle}>
        <div style={storyLabelStyle}>Not selected</div>
        <div style={{ width: '407px' }}>
          <MarketplaceSelector marketplace="eBay" state="not_selected" />
        </div>
      </section>
    </div>
  ),
};

export const FigmaNotConnectedParity: Story = {
  parameters: {
    layout: 'centered',
    design: createFigmaDesign(notConnectedParityDesignUrl),
    controls: {
      disable: true,
    },
  },
  render: () => (
    <div style={{ width: '401px' }}>
      <MarketplaceSelector marketplace="eBay" state="not_connected" />
    </div>
  ),
};

export const FigmaSelectedParity: Story = {
  parameters: {
    layout: 'centered',
    design: createFigmaDesign(selectedParityDesignUrl),
    controls: {
      disable: true,
    },
  },
  render: () => (
    <div style={{ width: '407px' }}>
      <MarketplaceSelector marketplace="eBay" state="selected" />
    </div>
  ),
};

export const FigmaNotSelectedParity: Story = {
  parameters: {
    layout: 'centered',
    design: createFigmaDesign(notSelectedParityDesignUrl),
    controls: {
      disable: true,
    },
  },
  render: () => (
    <div style={{ width: '407px' }}>
      <MarketplaceSelector marketplace="eBay" state="not_selected" />
    </div>
  ),
};
