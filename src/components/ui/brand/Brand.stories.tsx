import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../button/Button';
import { Icon } from '../icon/Icon';
import { NavRailItem } from '../navigation-rail/NavRailItem';
import { NavigationRail } from '../navigation-rail/NavigationRail';
import { createFigmaDesign } from '../../../stories/figma-design';
import { DesktopShellHeader } from '../../../stories/patterns/DesktopShellHeader';
import {
  Brand,
  BrandLockup,
  BrandMark,
  type BrandVariant,
} from './Brand';
import './brand.stories.css';

const brandFamilyUrl =
  'https://www.figma.com/design/LS1yOsOQqbFFpG4c8T2kQO/Go-Flow-Design-System?node-id=1655-6075&m=dev';

type BrandStoryArgs = {
  variant: BrandVariant;
  alt: string;
};

function renderBrand(args: BrandStoryArgs) {
  return (
    <div className="brand-story__playground">
      <Brand variant={args.variant} alt={args.alt} />
    </div>
  );
}

const meta = {
  title: 'Components/Brand',
  component: Brand,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    design: createFigmaDesign(brandFamilyUrl),
    docs: {
      description: {
        component:
          'Reusable brand primitive family with separate lockup and mark exports. The component preserves the asset aspect ratio by default and lets parent layouts control final rendered size.',
      },
    },
  },
  args: {
    variant: 'lockup',
    alt: 'Vendoo',
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['lockup', 'mark'] satisfies BrandVariant[],
    },
    alt: {
      control: 'text',
    },
  },
} satisfies Meta<BrandStoryArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: renderBrand,
};

export const Variants: Story = {
  parameters: {
    controls: {
      disable: true,
    },
    layout: 'padded',
  },
  render: () => (
    <div className="brand-story__variants">
      <div className="brand-story__tile">
        <BrandLockup className="brand-story__lockup" />
        <span className="brand-story__caption">Lockup</span>
      </div>
      <div className="brand-story__tile">
        <BrandMark className="brand-story__mark" />
        <span className="brand-story__caption">Mark</span>
      </div>
    </div>
  ),
};

export const Context: Story = {
  parameters: {
    controls: {
      disable: true,
    },
    layout: 'padded',
  },
  render: () => (
    <div className="brand-story__contexts">
      <section className="brand-story__context">
        <p className="brand-story__heading">Header usage</p>
        <DesktopShellHeader
          logo={<BrandLockup className="brand-story__lockup--header" />}
          trailing={
            <>
              <Button size="small" variant="filled">
                New Item
              </Button>
              <Button
                size="small"
                trailingIcon={<Icon name="chevron_down" />}
                variant="outline"
              >
                Account
              </Button>
            </>
          }
        />
      </section>

      <section className="brand-story__context">
        <p className="brand-story__heading">Compact / rail usage</p>
        <div className="brand-story__rail-shell">
          <div className="brand-story__rail-brand">
            <BrandMark className="brand-story__mark--compact" />
          </div>
          <NavigationRail ariaLabel="Brand mark example" expanded={false}>
            <NavRailItem layout="rail" icon={<Icon name="package" />} label="Inventory" />
            <NavRailItem layout="rail" icon={<Icon name="settings" />} label="Settings" />
          </NavigationRail>
        </div>
      </section>
    </div>
  ),
};
