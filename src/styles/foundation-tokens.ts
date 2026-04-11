export type TokenEntry = {
  name: string;
  value: string;
  description: string;
};

export type FoundationSection = {
  title: string;
  subtitle: string;
  tokens: TokenEntry[];
};

export const spacingSections: FoundationSection[] = [
  {
    title: 'Base scale',
    subtitle: 'The reusable spacing increments that anchor the layout system.',
    tokens: [
      { name: 'Space 0', value: 'var(--go-flow-space-0)', description: '0px' },
      { name: 'Space 1', value: 'var(--go-flow-space-1)', description: '4px' },
      { name: 'Space 2', value: 'var(--go-flow-space-2)', description: '8px' },
      { name: 'Space 2.5', value: 'var(--go-flow-space-2-5)', description: '10px' },
      { name: 'Space 3', value: 'var(--go-flow-space-3)', description: '12px' },
      { name: 'Space 4', value: 'var(--go-flow-space-4)', description: '16px' },
      { name: 'Space 6', value: 'var(--go-flow-space-6)', description: '24px' },
      { name: 'Space 8', value: 'var(--go-flow-space-8)', description: '32px' },
      { name: 'Space 12', value: 'var(--go-flow-space-12)', description: '48px' },
      { name: 'Space 16', value: 'var(--go-flow-space-16)', description: '64px' },
    ],
  },
];

export const shapeSections: FoundationSection[] = [
  {
    title: 'General radius scale',
    subtitle: 'The shared corner-radius language for surfaces and controls.',
    tokens: [
      { name: 'Radius none', value: 'var(--go-flow-radius-none)', description: '0px' },
      { name: 'Radius sm', value: 'var(--go-flow-radius-sm)', description: '4px' },
      { name: 'Radius md', value: 'var(--go-flow-radius-md)', description: '8px' },
      { name: 'Radius lg', value: 'var(--go-flow-radius-lg)', description: '12px' },
      { name: 'Radius xl', value: 'var(--go-flow-radius-xl)', description: '16px' },
      { name: 'Radius full', value: 'var(--go-flow-radius-full)', description: '9999px' },
    ],
  },
  {
    title: 'Component aliases',
    subtitle: 'Shape tokens currently consumed by the core primitives.',
    tokens: [
      { name: 'Button small', value: 'var(--go-flow-radius-button-small)', description: '5px' },
      { name: 'Button medium', value: 'var(--go-flow-radius-button-medium)', description: '8px' },
      { name: 'Field', value: 'var(--go-flow-field-radius)', description: '12px' },
    ],
  },
];

export const elevationSections: FoundationSection[] = [
  {
    title: 'Surface elevation',
    subtitle: 'Shadow tokens for cards, overlays, and raised surfaces.',
    tokens: [
      { name: 'Level 0', value: 'var(--go-flow-elevation-level-0)', description: 'Flat surface' },
      { name: 'Level 1', value: 'var(--go-flow-elevation-level-1)', description: 'Subtle lift' },
      { name: 'Level 2', value: 'var(--go-flow-elevation-level-2)', description: 'Moderate lift' },
      { name: 'Level 3', value: 'var(--go-flow-elevation-level-3)', description: 'Strong lift' },
    ],
  },
];
