import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn, userEvent } from 'storybook/test';

import { AppBar, type AppBarElevation, type AppBarSize } from './AppBar';
import { AppBarHeadlineBlock } from './AppBarHeadlineBlock';
import { Icon } from '../icon/Icon';
import { createFigmaDesign } from '../../../stories/figma-design';
import './app-bar.stories.css';

const appBarDesignUrl =
  'https://www.figma.com/design/LS1yOsOQqbFFpG4c8T2kQO/Go-Flow-Design-System?node-id=555-32859&m=dev';

type AppBarStoryArgs = {
  size: AppBarSize;
  elevation: AppBarElevation;
  headlineText: string;
  supportingText: string;
};

function AppBarSmallHeadline({
  headlineText,
  supportingText,
}: Pick<AppBarStoryArgs, 'headlineText' | 'supportingText'>) {
  return (
    <div className="app-bar-story__small-headline">
      <p className="app-bar-story__small-headline-title">{headlineText}</p>
      <p className="app-bar-story__small-headline-supporting">{supportingText}</p>
    </div>
  );
}

function AppBarAction({
  label,
  iconName,
  onClick,
}: {
  label: string;
  iconName: 'menu' | 'more_vertical' | 'search' | 'menu_open';
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className="app-bar-story__action"
      onClick={() => onClick()}
    >
      <Icon name={iconName} />
    </button>
  );
}

const meta = {
  title: 'Components/AppBar',
  component: AppBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    design: createFigmaDesign(appBarDesignUrl),
    docs: {
      description: {
        component:
          'Top app bar layout primitive for desktop screens. The playground keeps the size and elevation controls visible while the slots stay composed from shared icon and headline primitives.',
      },
    },
  },
  args: {
    size: 'small',
    elevation: 'flat',
    headlineText: 'Label',
    supportingText: 'Supporting Text',
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'] satisfies AppBarSize[],
    },
    elevation: {
      control: 'radio',
      options: ['flat', 'scrolled'] satisfies AppBarElevation[],
    },
    headlineText: {
      control: 'text',
    },
    supportingText: {
      control: 'text',
    },
    leading: {
      table: {
        disable: true,
      },
      control: false,
    },
    headline: {
      table: {
        disable: true,
      },
      control: false,
    },
    trailing: {
      table: {
        disable: true,
      },
      control: false,
    },
  },
} satisfies Meta<AppBarStoryArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

function renderAppBar(args: AppBarStoryArgs) {
  const leadingClick = fn();
  const trailingClick1 = fn();
  const trailingClick2 = fn();
  const trailingClick3 = fn();
  const headline =
    args.size === 'small' ? (
      <AppBarSmallHeadline headlineText={args.headlineText} supportingText={args.supportingText} />
    ) : (
      <AppBarHeadlineBlock
        headline={args.headlineText}
        supportingText={args.supportingText}
        size={args.size}
      />
    );

  return (
    <div className="app-bar-story__panel">
      <AppBar
        size={args.size}
        elevation={args.elevation}
        leading={<AppBarAction label="Open navigation" iconName="menu" onClick={leadingClick} />}
        headline={headline}
        trailing={
          <div className="app-bar-story__actions">
            <AppBarAction label="Search" iconName="search" onClick={trailingClick1} />
            <AppBarAction label="More options" iconName="more_vertical" onClick={trailingClick2} />
            <AppBarAction label="Open navigation panel" iconName="menu_open" onClick={trailingClick3} />
          </div>
        }
      />
    </div>
  );
}

export const Playground: Story = {
  render: renderAppBar,
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole('button', { name: /Open navigation/i }));
    await userEvent.click(canvas.getByRole('button', { name: /Search/i }));
  },
};

export const Variants: Story = {
  parameters: {
    controls: {
      disable: true,
    },
    layout: 'padded',
  },
  render: () => (
    <div className="app-bar-story__stack">
      <AppBar
        size="small"
        elevation="flat"
        leading={
          <AppBarAction label="Open navigation" iconName="menu" onClick={fn()} />
        }
        headline={
          <AppBarSmallHeadline headlineText="Label" supportingText="Supporting Text" />
        }
        trailing={
          <div className="app-bar-story__actions">
            <AppBarAction label="Search" iconName="search" onClick={fn()} />
            <AppBarAction label="More options" iconName="more_vertical" onClick={fn()} />
            <AppBarAction label="Open navigation panel" iconName="menu_open" onClick={fn()} />
          </div>
        }
      />
      <AppBar
        size="medium"
        elevation="flat"
        leading={<AppBarAction label="Open navigation" iconName="menu" onClick={fn()} />}
        headline={
          <AppBarHeadlineBlock headline="Label" supportingText="Supporting Text" size="medium" />
        }
        trailing={
          <div className="app-bar-story__actions">
            <AppBarAction label="Search" iconName="search" onClick={fn()} />
            <AppBarAction label="More options" iconName="more_vertical" onClick={fn()} />
            <AppBarAction label="Open navigation panel" iconName="menu_open" onClick={fn()} />
          </div>
        }
      />
      <AppBar
        size="large"
        elevation="scrolled"
        leading={<AppBarAction label="Open navigation" iconName="menu" onClick={fn()} />}
        headline={
          <AppBarHeadlineBlock headline="Label" supportingText="Supporting Text" size="large" />
        }
        trailing={
          <div className="app-bar-story__actions">
            <AppBarAction label="Search" iconName="search" onClick={fn()} />
            <AppBarAction label="More options" iconName="more_vertical" onClick={fn()} />
            <AppBarAction label="Open navigation panel" iconName="menu_open" onClick={fn()} />
          </div>
        }
      />
    </div>
  ),
};
