import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { useArgs } from 'storybook/preview-api';

import { Button } from '../../components/ui/button/Button';
import { BrandLockup } from '../../components/ui/brand/Brand';
import { Icon } from '../../components/ui/icon/Icon';
import { IconButton } from '../../components/ui/icon-button/IconButton';
import { NavRailItem } from '../../components/ui/navigation-rail/NavRailItem';
import { NavigationRail } from '../../components/ui/navigation-rail/NavigationRail';
import { iconNames, type IconName } from '../../components/ui/icon/icon-names';
import { createFigmaDesign } from '../figma-design';
import { DesktopShellLayout } from './DesktopShellLayout';
import { DesktopShellHeader, ShellHeaderQuota } from './DesktopShellHeader';
import '../../components/ui/navigation-rail/navigation-rail.stories.css';
import './desktop-app-shell.stories.css';

type NavItemId =
  | 'inventory'
  | 'automations'
  | 'analytics'
  | 'marketplaces'
  | 'bulk-actions'
  | 'settings';

type DesktopShellStoryArgs = {
  expanded: boolean;
  selectedNavItem: NavItemId;
  inventoryLabel: string;
  inventoryIconName: IconName;
  automationsLabel: string;
  automationsIconName: IconName;
  analyticsLabel: string;
  analyticsIconName: IconName;
  marketplacesLabel: string;
  marketplacesIconName: IconName;
  bulkActionsLabel: string;
  bulkActionsIconName: IconName;
  settingsLabel: string;
  settingsIconName: IconName;
};

type NavItem = {
  id: NavItemId;
  label: string;
  iconName: IconName;
};

const defaultDesktopShellArgs = {
  expanded: true,
  selectedNavItem: 'inventory',
  inventoryLabel: 'Inventory',
  inventoryIconName: 'package',
  automationsLabel: 'Automations',
  automationsIconName: 'sync',
  analyticsLabel: 'Analytics',
  analyticsIconName: 'analytics',
  marketplacesLabel: 'Marketplaces',
  marketplacesIconName: 'store',
  bulkActionsLabel: 'Bulk Actions',
  bulkActionsIconName: 'controls',
  settingsLabel: 'Settings',
  settingsIconName: 'settings',
} satisfies DesktopShellStoryArgs;

const importShellDesignUrl =
  'https://www.figma.com/design/wnYDUVOEmVuKk7YDu6o3Vz/M---Product-Design-System--Molecules-?node-id=1984-342889&m=dev';
const inventorySaleDetectionShellDesignUrl =
  'https://www.figma.com/design/941LilI1FqImC2usHWp0qNq/Listing-Flow-Draft--Recreate-?node-id=1174-8049&m=dev';

function ShellChrome({
  expanded,
  navItems,
  selectedNavItem,
  ctaLabel,
  onMenuClick,
  content,
}: {
  expanded: boolean;
  navItems: NavItem[];
  selectedNavItem: NavItemId;
  ctaLabel: string;
  onMenuClick?: () => void;
  content: ReactNode;
}) {
  const settingsItem = navItems[navItems.length - 1];

  return (
    <DesktopShellLayout>
      <DesktopShellHeader
        logo={<BrandLockup className="desktop-shell-layout__brand-lockup" />}
        trailing={
          <>
            <ShellHeaderQuota used={0} total={125} unit="Items" period="Oct 10 – Nov 10" />
            <Button variant="filled" size="small">
              {ctaLabel}
            </Button>
            <Button
              variant="outline"
              size="small"
              leadingIcon={<Icon name="user" />}
              trailingIcon={<Icon name="chevron_down" />}
            >
              Account
            </Button>
          </>
        }
      />

      <div className="desktop-shell-layout">
        <aside className="desktop-shell-layout__rail">
          <div className="desktop-shell-layout__rail-header">
            <IconButton
              className="desktop-shell-layout__menu"
              icon={<Icon name={expanded ? 'menu_open' : 'menu'} />}
              label={expanded ? 'Collapse rail' : 'Expand rail'}
              size="medium"
              variant="standard"
              onClick={onMenuClick}
            />
          </div>

          <NavigationRail
            ariaLabel="Primary navigation"
            expanded={expanded}
            className="navigation-rail-story__frame"
          >
            <div className="desktop-shell-layout__rail-items">
              {navItems.map((item) => (
                <NavRailItem
                  key={item.id}
                  layout="rail"
                  icon={<Icon name={item.iconName} />}
                  label={item.label}
                  selected={selectedNavItem === item.id}
                />
              ))}
            </div>

            <div className="desktop-shell-layout__rail-footer">
              <NavRailItem
                layout="rail"
                icon={<Icon name={settingsItem?.iconName ?? 'settings'} />}
                label={settingsItem?.label ?? 'Settings'}
                selected={selectedNavItem === 'settings'}
              />
            </div>
          </NavigationRail>
        </aside>

        <section className="desktop-shell-layout__content">
          <div className="desktop-shell-layout__surface">{content}</div>
        </section>
      </div>
    </DesktopShellLayout>
  );
}

function MetricCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <article className="desktop-shell-pattern__metric-card">
      <p className="desktop-shell-pattern__metric-label">{label}</p>
      <p className="desktop-shell-pattern__metric-value">{value}</p>
      <p className="desktop-shell-pattern__metric-detail">{detail}</p>
    </article>
  );
}

function PageSection({
  title,
  supportingText,
  actions,
  children,
}: {
  title: string;
  supportingText?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="desktop-shell-pattern__section">
      <div className="desktop-shell-pattern__section-header">
        <div>
          <p className="desktop-shell-pattern__section-title">{title}</p>
          {supportingText != null ? (
            <p className="desktop-shell-pattern__section-supporting">{supportingText}</p>
          ) : null}
        </div>
        {actions != null ? <div className="desktop-shell-pattern__section-actions">{actions}</div> : null}
      </div>
      {children}
    </section>
  );
}

function ImportShellContent() {
  return (
    <div className="desktop-shell-pattern__page">
      <header className="desktop-shell-pattern__page-header">
        <div className="desktop-shell-pattern__heading-stack">
          <p className="desktop-shell-pattern__eyebrow">Import flow</p>
          <h1 className="desktop-shell-pattern__page-title">Import listings</h1>
          <p className="desktop-shell-pattern__page-supporting">
            Review the source file, confirm mapped columns, and resolve validation before the next publish step.
          </p>
        </div>
        <div className="desktop-shell-pattern__page-actions">
          <Button variant="outline" size="small">
            Save draft
          </Button>
          <Button variant="filled" size="small">
            Continue import
          </Button>
        </div>
      </header>

      <div className="desktop-shell-pattern__metric-grid">
        <MetricCard label="Source rows" value="248" detail="From Shopify CSV" />
        <MetricCard label="Mapped fields" value="18" detail="3 optional columns remain" />
        <MetricCard label="Validation issues" value="4" detail="2 missing images, 2 duplicates" />
      </div>

      <div className="desktop-shell-pattern__content-grid">
        <PageSection title="Detected columns" supportingText="The import matches the expected row structure.">
          <dl className="desktop-shell-pattern__definition-list">
            <div className="desktop-shell-pattern__definition-row">
              <dt>File name</dt>
              <dd>spring-catalog.csv</dd>
            </div>
            <div className="desktop-shell-pattern__definition-row">
              <dt>SKU column</dt>
              <dd>sku</dd>
            </div>
            <div className="desktop-shell-pattern__definition-row">
              <dt>Variant column</dt>
              <dd>variant_title</dd>
            </div>
            <div className="desktop-shell-pattern__definition-row">
              <dt>Status</dt>
              <dd>Ready for review</dd>
            </div>
          </dl>
        </PageSection>

        <PageSection
          title="Needs review"
          supportingText="These rows need attention before the import can continue."
          actions={<Button size="small">Open issues</Button>}
        >
          <ul className="desktop-shell-pattern__issue-list">
            <li className="desktop-shell-pattern__issue-row">
              <span>Missing image for SKU 1044</span>
              <span>Primary photo absent</span>
            </li>
            <li className="desktop-shell-pattern__issue-row">
              <span>Duplicate listing detected</span>
              <span>Same handle appears twice</span>
            </li>
            <li className="desktop-shell-pattern__issue-row">
              <span>Price format warning</span>
              <span>One cell uses non-numeric text</span>
            </li>
          </ul>
        </PageSection>
      </div>
    </div>
  );
}

function InventorySaleDetectionContent() {
  return (
    <div className="desktop-shell-pattern__page">
      <header className="desktop-shell-pattern__page-header">
        <div className="desktop-shell-pattern__heading-stack">
          <p className="desktop-shell-pattern__eyebrow">Inventory</p>
          <h1 className="desktop-shell-pattern__page-title">Sale detection</h1>
          <p className="desktop-shell-pattern__page-supporting">
            Track recent markdowns and price changes so the team can confirm the sale signals before publishing.
          </p>
        </div>
        <div className="desktop-shell-pattern__page-actions">
          <Button variant="outline" size="small">
            Export report
          </Button>
          <Button variant="filled" size="small">
            Review signals
          </Button>
        </div>
      </header>

      <div className="desktop-shell-pattern__metric-grid">
        <MetricCard label="Items monitored" value="1,284" detail="Across 4 marketplaces" />
        <MetricCard label="Sale signals" value="36" detail="Detected in the last 24 hours" />
        <MetricCard label="Needs review" value="7" detail="Manual confirmation required" />
      </div>

      <div className="desktop-shell-pattern__content-grid desktop-shell-pattern__content-grid--sale">
        <PageSection title="Recent detections" supportingText="Newest sale signals are listed first.">
          <div className="desktop-shell-pattern__table" role="table" aria-label="Recent sale detections">
            <div className="desktop-shell-pattern__table-head" role="row">
              <span role="columnheader">Item</span>
              <span role="columnheader">Current price</span>
              <span role="columnheader">Change</span>
              <span role="columnheader">Signal</span>
            </div>
            <div className="desktop-shell-pattern__table-row" role="row">
              <span role="cell">Canvas tote bag</span>
              <span role="cell">$24.00</span>
              <span role="cell">-15%</span>
              <span role="cell">Sale</span>
            </div>
            <div className="desktop-shell-pattern__table-row" role="row">
              <span role="cell">Water bottle</span>
              <span role="cell">$18.00</span>
              <span role="cell">-10%</span>
              <span role="cell">Price drop</span>
            </div>
            <div className="desktop-shell-pattern__table-row" role="row">
              <span role="cell">Notebook set</span>
              <span role="cell">$12.00</span>
              <span role="cell">-5%</span>
              <span role="cell">Review</span>
            </div>
          </div>
        </PageSection>

        <PageSection
          title="Sale rules"
          supportingText="These rules explain why a row is flagged."
          actions={<Button size="small">Manage rules</Button>}
        >
          <ul className="desktop-shell-pattern__issue-list">
            <li className="desktop-shell-pattern__issue-row">
              <span>Markdown greater than 10%</span>
              <span>Auto-detect as sale</span>
            </li>
            <li className="desktop-shell-pattern__issue-row">
              <span>Price mismatch across channels</span>
              <span>Flag for manual review</span>
            </li>
            <li className="desktop-shell-pattern__issue-row">
              <span>Inventory below threshold</span>
              <span>Mark as urgent</span>
            </li>
          </ul>
        </PageSection>
      </div>
    </div>
  );
}

function PlaygroundContent() {
  return (
    <div className="desktop-shell-pattern__page">
      <header className="desktop-shell-pattern__page-header">
        <div className="desktop-shell-pattern__heading-stack">
          <p className="desktop-shell-pattern__eyebrow">Shell preview</p>
          <h1 className="desktop-shell-pattern__page-title">Inventory overview</h1>
          <p className="desktop-shell-pattern__page-supporting">
            A compact page-style shell example that shows header, rail, and the content slot working together.
          </p>
        </div>
        <div className="desktop-shell-pattern__page-actions">
          <Button variant="outline" size="small">
            Filter
          </Button>
          <Button variant="filled" size="small">
            New item
          </Button>
        </div>
      </header>

      <div className="desktop-shell-pattern__metric-grid">
        <MetricCard label="Active listings" value="862" detail="12 updated today" />
        <MetricCard label="Alerts" value="9" detail="3 require action" />
        <MetricCard label="Channels" value="4" detail="Marketplace sync healthy" />
      </div>

      <div className="desktop-shell-pattern__content-grid">
        <PageSection title="Priority tasks" supportingText="A short list of work waiting for attention.">
          <ul className="desktop-shell-pattern__issue-list">
            <li className="desktop-shell-pattern__issue-row">
              <span>Review new sale signals</span>
              <span>7 items flagged</span>
            </li>
            <li className="desktop-shell-pattern__issue-row">
              <span>Resolve import warnings</span>
              <span>4 rows blocked</span>
            </li>
            <li className="desktop-shell-pattern__issue-row">
              <span>Check marketplace sync</span>
              <span>Last sync 12 min ago</span>
            </li>
          </ul>
        </PageSection>

        <PageSection title="Recent activity" supportingText="Recent changes in the shell content area.">
          <div className="desktop-shell-pattern__table" role="table" aria-label="Recent activity">
            <div className="desktop-shell-pattern__table-head" role="row">
              <span role="columnheader">Action</span>
              <span role="columnheader">Source</span>
              <span role="columnheader">Owner</span>
              <span role="columnheader">Status</span>
            </div>
            <div className="desktop-shell-pattern__table-row" role="row">
              <span role="cell">Updated price</span>
              <span role="cell">Shopify</span>
              <span role="cell">A. Lee</span>
              <span role="cell">Complete</span>
            </div>
            <div className="desktop-shell-pattern__table-row" role="row">
              <span role="cell">Imported file</span>
              <span role="cell">CSV upload</span>
              <span role="cell">M. Chen</span>
              <span role="cell">Review</span>
            </div>
          </div>
        </PageSection>
      </div>
    </div>
  );
}

function DesktopShellPatternPlayground(args: DesktopShellStoryArgs) {
  const [storyArgs, updateArgs] = useArgs<DesktopShellStoryArgs>();
  const resolvedArgs = {
    ...args,
    ...storyArgs,
  };

  return renderShell(
    resolvedArgs,
    <PlaygroundContent />,
    'New item',
    () => {
      updateArgs({ expanded: !resolvedArgs.expanded });
    },
  );
}

function buildNavItems(args: DesktopShellStoryArgs): NavItem[] {
  return [
    {
      id: 'inventory',
      label: args.inventoryLabel,
      iconName: args.inventoryIconName,
    },
    {
      id: 'automations',
      label: args.automationsLabel,
      iconName: args.automationsIconName,
    },
    {
      id: 'analytics',
      label: args.analyticsLabel,
      iconName: args.analyticsIconName,
    },
    {
      id: 'marketplaces',
      label: args.marketplacesLabel,
      iconName: args.marketplacesIconName,
    },
    {
      id: 'bulk-actions',
      label: args.bulkActionsLabel,
      iconName: args.bulkActionsIconName,
    },
    {
      id: 'settings',
      label: args.settingsLabel,
      iconName: args.settingsIconName,
    },
  ];
}

function renderShell(
  args: DesktopShellStoryArgs,
  content: ReactNode,
  ctaLabel: string,
  onMenuClick?: () => void,
) {
  const navItems = buildNavItems(args);

  return (
    <ShellChrome
      expanded={args.expanded}
      navItems={navItems}
      selectedNavItem={args.selectedNavItem}
      ctaLabel={ctaLabel}
      onMenuClick={onMenuClick}
      content={content}
    />
  );
}

const navItemIds: NavItemId[] = [
  'inventory',
  'automations',
  'analytics',
  'marketplaces',
  'bulk-actions',
  'settings',
];

const meta = {
  title: 'Patterns/DesktopAppShell',
  component: DesktopShellPatternPlayground,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    design: createFigmaDesign(importShellDesignUrl),
    docs: {
      description: {
        component:
          'Desktop shell pattern for engineering handoff. Compose the site header, navigation rail, and page content in the caller so the layout stays wrapper-only.',
      },
    },
  },
  args: {
    ...defaultDesktopShellArgs,
  },
  argTypes: {
    expanded: {
      control: 'boolean',
    },
    selectedNavItem: {
      control: 'radio',
      options: navItemIds,
    },
    inventoryLabel: {
      control: 'text',
    },
    inventoryIconName: {
      control: 'select',
      name: 'icon',
      options: iconNames,
    },
    automationsLabel: {
      control: 'text',
    },
    automationsIconName: {
      control: 'select',
      name: 'icon',
      options: iconNames,
    },
    analyticsLabel: {
      control: 'text',
    },
    analyticsIconName: {
      control: 'select',
      name: 'icon',
      options: iconNames,
    },
    marketplacesLabel: {
      control: 'text',
    },
    marketplacesIconName: {
      control: 'select',
      name: 'icon',
      options: iconNames,
    },
    bulkActionsLabel: {
      control: 'text',
    },
    bulkActionsIconName: {
      control: 'select',
      name: 'icon',
      options: iconNames,
    },
    settingsLabel: {
      control: 'text',
    },
    settingsIconName: {
      control: 'select',
      name: 'icon',
      options: iconNames,
    },
  },
} satisfies Meta<DesktopShellStoryArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: DesktopShellPatternPlayground,
  parameters: {
    layout: 'fullscreen',
  },
};

export const ImportShell: Story = {
  parameters: {
    controls: {
      disable: true,
    },
    design: createFigmaDesign(importShellDesignUrl),
  },
  render: () =>
    renderShell(
      defaultDesktopShellArgs,
      <ImportShellContent />,
      'Continue import',
    ),
};

export const InventorySaleDetectionShell: Story = {
  parameters: {
    controls: {
      disable: true,
    },
    design: createFigmaDesign(inventorySaleDetectionShellDesignUrl),
  },
  render: () =>
    renderShell(
      {
        ...defaultDesktopShellArgs,
        expanded: false,
      },
      <InventorySaleDetectionContent />,
      'Review signals',
    ),
};
