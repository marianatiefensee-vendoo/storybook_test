import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { Button } from '../../components/ui/button/Button';
import { Icon } from '../../components/ui/icon/Icon';
import { BrandLockup } from '../../components/ui/brand/Brand';
import { createFigmaDesign } from '../figma-design';
import { DesktopShellHeader, ShellHeaderQuota } from './DesktopShellHeader';

const uxReferenceUrl =
  'https://www.figma.com/design/wnYDUVOEmVuKk7YDu6o3Vz/M---Product-Design-System--Molecules-?node-id=1018-34725&m=dev';

type DesktopShellHeaderStoryArgs = {
  quotaUsed: number;
  quotaTotal: number;
  quotaUnit: string;
  quotaPeriod: string;
  ctaLabel: string;
  accountLabel: string;
  showQuota: boolean;
};

function renderHeader(args: DesktopShellHeaderStoryArgs) {
  const onCta = fn();
  const onAccount = fn();

  return (
    <DesktopShellHeader
      logo={<BrandLockup className="desktop-shell-header__brand-lockup" />}
      trailing={
        <>
          {args.showQuota ? (
            <ShellHeaderQuota
              used={args.quotaUsed}
              total={args.quotaTotal}
              unit={args.quotaUnit}
              period={args.quotaPeriod}
            />
          ) : null}
          <Button variant="filled" size="small" onClick={onCta}>
            {args.ctaLabel}
          </Button>
          <Button
            variant="outline"
            size="small"
            leadingIcon={<Icon name="user" />}
            trailingIcon={<Icon name="chevron_down" />}
            onClick={onAccount}
          >
            {args.accountLabel}
          </Button>
        </>
      }
    />
  );
}

// Wrapper component so Storybook autodocs reads the story args shape.
function DesktopShellHeaderPreview(args: DesktopShellHeaderStoryArgs) {
  return renderHeader(args);
}

const meta = {
  title: 'Patterns/DesktopShellHeader',
  component: DesktopShellHeaderPreview,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    design: createFigmaDesign(uxReferenceUrl),
    docs: {
      description: {
        component:
          'Site-level shell header. Composes the brand logo, optional usage quota, primary CTA, and account menu trigger from Go Flow DS primitives. UX structure from the M – Product Design System reference; visuals from Go Flow tokens. Sits above the NavigationRail + content area in the full desktop shell.',
      },
    },
  },
  args: {
    quotaUsed: 0,
    quotaTotal: 125,
    quotaUnit: 'Items',
    quotaPeriod: 'Oct 10 – Nov 10',
    ctaLabel: 'New Item',
    accountLabel: 'Account',
    showQuota: true,
  },
  argTypes: {
    quotaUsed: { control: 'number' },
    quotaTotal: { control: 'number' },
    quotaUnit: { control: 'text' },
    quotaPeriod: { control: 'text' },
    ctaLabel: { control: 'text' },
    accountLabel: { control: 'text' },
    showQuota: { control: 'boolean' },
  },
} satisfies Meta<DesktopShellHeaderStoryArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: renderHeader,
};

// Full right-zone: quota + CTA + account trigger.
export const WithQuota: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <DesktopShellHeader
      logo={<BrandLockup className="desktop-shell-header__brand-lockup" />}
      trailing={
        <>
          <ShellHeaderQuota used={0} total={125} unit="Items" period="Oct 10 – Nov 10" />
          <Button variant="filled" size="small" onClick={fn()}>
            New Item
          </Button>
          <Button
            variant="outline"
            size="small"
            leadingIcon={<Icon name="user" />}
            trailingIcon={<Icon name="chevron_down" />}
            onClick={fn()}
          >
            Account
          </Button>
        </>
      }
    />
  ),
};

// No quota — e.g. before data loads or on plans without a quota.
export const ActionsOnly: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <DesktopShellHeader
      logo={<BrandLockup className="desktop-shell-header__brand-lockup" />}
      trailing={
        <>
          <Button variant="filled" size="small" onClick={fn()}>
            New Item
          </Button>
          <Button
            variant="outline"
            size="small"
            leadingIcon={<Icon name="user" />}
            trailingIcon={<Icon name="chevron_down" />}
            onClick={fn()}
          >
            Account
          </Button>
        </>
      }
    />
  ),
};

// Graceful minimum — logo only.
export const Minimal: Story = {
  parameters: { controls: { disable: true } },
  render: () => <DesktopShellHeader logo={<BrandLockup className="desktop-shell-header__brand-lockup" />} />,
};
