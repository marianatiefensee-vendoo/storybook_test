import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';

import { Button } from '../button/Button';
import { createFigmaDesign } from '../../../stories/figma-design';
import { SectionCard, type SectionCardProgress } from './SectionCard';

const sectionCardFamilyUrl =
  'https://www.figma.com/design/LS1yOsOQqbFFpG4c8T2kQO/Go-Flow-Design-System?node-id=1369-164&m=dev';
const sectionCardCollapsedParityUrl =
  'https://www.figma.com/design/LS1yOsOQqbFFpG4c8T2kQO/Go-Flow-Design-System?node-id=1477-3276&m=dev';
const sectionCardCollapsedCompleteUrl =
  'https://www.figma.com/design/LS1yOsOQqbFFpG4c8T2kQO/Go-Flow-Design-System?node-id=1477-3297&m=dev';
const sectionCardCollapsedNoActionUrl =
  'https://www.figma.com/design/LS1yOsOQqbFFpG4c8T2kQO/Go-Flow-Design-System?node-id=1403-158&m=dev';
const sectionCardCollapsedNoSupportingUrl =
  'https://www.figma.com/design/LS1yOsOQqbFFpG4c8T2kQO/Go-Flow-Design-System?node-id=1403-147&m=dev';
const sectionCardExpandedParityUrl =
  'https://www.figma.com/design/LS1yOsOQqbFFpG4c8T2kQO/Go-Flow-Design-System?node-id=1369-145&m=dev';
const sectionCardExpandedNoSupportingUrl =
  'https://www.figma.com/design/LS1yOsOQqbFFpG4c8T2kQO/Go-Flow-Design-System?node-id=1369-112&m=dev';
const sectionCardExpandedCompleteUrl =
  'https://www.figma.com/design/LS1yOsOQqbFFpG4c8T2kQO/Go-Flow-Design-System?node-id=1477-3401&m=dev';
const sectionCardExpandedNoActionUrl =
  'https://www.figma.com/design/LS1yOsOQqbFFpG4c8T2kQO/Go-Flow-Design-System?node-id=1369-131&m=dev';

type SectionCardSlotKind = 'none' | 'button';

type SectionCardStoryArgs = {
  step: number;
  expanded: boolean;
  progress: SectionCardProgress;
  showSupportingText: boolean;
  showAction: boolean;
  slotKind: SectionCardSlotKind;
  title: string;
  supportingText: string;
};

function renderSectionCardSlot(slotKind: SectionCardSlotKind) {
  if (slotKind === 'button') {
    return (
      <Button size="small" variant="outline">
        Add detail
      </Button>
    );
  }

  return null;
}

function renderSectionCard(args: SectionCardStoryArgs) {
  return (
    <SectionCard
      step={args.step}
      expanded={args.expanded}
      progress={args.progress}
      title={args.title}
      supportingText={args.showSupportingText ? args.supportingText : undefined}
      action={args.showAction ? undefined : null}
    >
      {args.expanded ? renderSectionCardSlot(args.slotKind) : null}
    </SectionCard>
  );
}

const meta = {
  title: 'Components/SectionCard',
  component: SectionCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    design: createFigmaDesign(sectionCardFamilyUrl),
    docs: {
      description: {
        component:
          'Standalone section-card surface with a progress badge, optional supporting text, optional trailing action, and an expanded slot shell for nested components.',
      },
    },
  },
  args: {
    step: 1,
    expanded: false,
    progress: 'upcoming',
    showSupportingText: true,
    showAction: true,
    slotKind: 'none',
    title: 'Section title',
    supportingText: 'Applies to all marketplaces',
  },
  argTypes: {
    step: {
      control: { type: 'number', min: 1, max: 8, step: 1 },
    },
    expanded: {
      control: 'boolean',
    },
    progress: {
      control: 'select',
      options: ['upcoming', 'current', 'complete'] satisfies SectionCardProgress[],
    },
    showSupportingText: {
      control: 'boolean',
    },
    showAction: {
      control: 'boolean',
    },
    slotKind: {
      control: 'radio',
      options: ['none', 'button'] satisfies SectionCardSlotKind[],
    },
    title: {
      control: 'text',
    },
    supportingText: {
      control: 'text',
    },
  },
} satisfies Meta<SectionCardStoryArgs> & { component: typeof SectionCard };

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => {
    const [storyArgs] = useArgs<SectionCardStoryArgs>();
    const resolved = { ...args, ...storyArgs };

    return <div style={{ width: '812px' }}>{renderSectionCard(resolved)}</div>;
  },
};

export const CollapsedParity: Story = {
  parameters: {
    controls: {
      disable: true,
    },
    design: createFigmaDesign(sectionCardCollapsedParityUrl),
  },
  render: () => (
    <div style={{ width: '812px' }}>
      <SectionCard
        step={1}
        expanded={false}
        progress="upcoming"
        title="Section title"
        supportingText="Applies to all marketplaces"
      />
    </div>
  ),
};

export const CollapsedComplete: Story = {
  parameters: {
    controls: {
      disable: true,
    },
    design: createFigmaDesign(sectionCardCollapsedCompleteUrl),
  },
  render: () => (
    <div style={{ width: '812px' }}>
      <SectionCard
        step={1}
        expanded={false}
        progress="complete"
        title="Section title"
        supportingText="Applies to all marketplaces"
      />
    </div>
  ),
};

export const CollapsedNoSupporting: Story = {
  parameters: {
    controls: {
      disable: true,
    },
    design: createFigmaDesign(sectionCardCollapsedNoSupportingUrl),
  },
  render: () => (
    <div style={{ width: '812px' }}>
      <SectionCard
        step={1}
        expanded={false}
        progress="upcoming"
        title="Section title"
      />
    </div>
  ),
};

export const CollapsedNoAction: Story = {
  parameters: {
    controls: {
      disable: true,
    },
    design: createFigmaDesign(sectionCardCollapsedNoActionUrl),
  },
  render: () => (
    <div style={{ width: '812px' }}>
      <SectionCard
        step={1}
        expanded={false}
        progress="upcoming"
        title="Section title"
        supportingText="Applies to all marketplaces"
        action={null}
      />
    </div>
  ),
};

export const ExpandedParity: Story = {
  parameters: {
    controls: {
      disable: true,
    },
    design: createFigmaDesign(sectionCardExpandedParityUrl),
  },
  render: () => (
    <div style={{ width: '812px' }}>
      <SectionCard
        step={1}
        expanded
        progress="current"
        title="Section title"
        supportingText="Applies to all marketplaces"
      />
    </div>
  ),
};

export const ExpandedNoSupporting: Story = {
  parameters: {
    controls: {
      disable: true,
    },
    design: createFigmaDesign(sectionCardExpandedNoSupportingUrl),
  },
  render: () => (
    <div style={{ width: '812px' }}>
      <SectionCard step={1} expanded progress="current" title="Section title" />
    </div>
  ),
};

export const ExpandedComplete: Story = {
  parameters: {
    controls: {
      disable: true,
    },
    design: createFigmaDesign(sectionCardExpandedCompleteUrl),
  },
  render: () => (
    <div style={{ width: '812px' }}>
      <SectionCard
        step={1}
        expanded
        progress="complete"
        title="Section title"
        supportingText="Applies to all marketplaces"
      />
    </div>
  ),
};

export const ExpandedNoAction: Story = {
  parameters: {
    controls: {
      disable: true,
    },
    design: createFigmaDesign(sectionCardExpandedNoActionUrl),
  },
  render: () => (
    <div style={{ width: '812px' }}>
      <SectionCard
        step={1}
        expanded
        progress="current"
        title="Section title"
        supportingText="Applies to all marketplaces"
        action={null}
      />
    </div>
  ),
};

export const ExpandedSlotButton: Story = {
  parameters: {
    controls: {
      disable: true,
    },
    design: createFigmaDesign(sectionCardExpandedParityUrl),
    docs: {
      description: {
        story: 'Expanded slot populated with a nested Button to demonstrate how the body shell swaps in reusable components.',
      },
    },
  },
  render: () => (
    <div style={{ width: '812px' }}>
      <SectionCard
        step={1}
        expanded
        progress="current"
        title="Section title"
        supportingText="Applies to all marketplaces"
      >
        <Button size="small" variant="outline">
          Add detail
        </Button>
      </SectionCard>
    </div>
  ),
};
