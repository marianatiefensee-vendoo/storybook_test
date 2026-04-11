export type TypographySample = {
  title: string;
  description: string;
  font: string;
  letterSpacing: string;
  sample: string;
};

export type TypographySection = {
  title: string;
  subtitle: string;
  samples: TypographySample[];
};

export const typographySections: TypographySection[] = [
  {
    title: 'Display',
    subtitle: 'Largest text styles for hero content and prominent page moments.',
    samples: [
      {
        title: 'Display Large',
        description: '57px / 64px, regular, -0.25px',
        font: 'var(--go-flow-typography-display-large)',
        letterSpacing: 'var(--go-flow-typography-display-large-letter-spacing)',
        sample: 'Aa',
      },
      {
        title: 'Display Medium',
        description: '45px / 52px, regular',
        font: 'var(--go-flow-typography-display-medium)',
        letterSpacing: 'var(--go-flow-typography-display-medium-letter-spacing)',
        sample: 'Aa',
      },
      {
        title: 'Display Small',
        description: '36px / 44px, regular',
        font: 'var(--go-flow-typography-display-small)',
        letterSpacing: 'var(--go-flow-typography-display-small-letter-spacing)',
        sample: 'Aa',
      },
    ],
  },
  {
    title: 'Headline',
    subtitle: 'Section headers and high-emphasis supporting text.',
    samples: [
      {
        title: 'Headline Large',
        description: '32px / 40px, regular',
        font: 'var(--go-flow-typography-headline-large)',
        letterSpacing: 'var(--go-flow-typography-headline-large-letter-spacing)',
        sample: 'Aa',
      },
      {
        title: 'Headline Medium',
        description: '28px / 36px, regular',
        font: 'var(--go-flow-typography-headline-medium)',
        letterSpacing: 'var(--go-flow-typography-headline-medium-letter-spacing)',
        sample: 'Aa',
      },
      {
        title: 'Headline Small',
        description: '24px / 32px, regular',
        font: 'var(--go-flow-typography-headline-small)',
        letterSpacing: 'var(--go-flow-typography-headline-small-letter-spacing)',
        sample: 'Aa',
      },
    ],
  },
  {
    title: 'Title',
    subtitle: 'Component headings and app-level hierarchy.',
    samples: [
      {
        title: 'Title Large',
        description: '22px / 28px, regular',
        font: 'var(--go-flow-typography-title-large)',
        letterSpacing: 'var(--go-flow-typography-title-large-letter-spacing)',
        sample: 'Aa',
      },
      {
        title: 'Title Medium',
        description: '16px / 24px, medium, 0.15px',
        font: 'var(--go-flow-typography-title-medium)',
        letterSpacing: 'var(--go-flow-typography-title-medium-letter-spacing)',
        sample: 'Aa',
      },
      {
        title: 'Title Small',
        description: '14px / 20px, medium, 0.1px',
        font: 'var(--go-flow-typography-title-small)',
        letterSpacing: 'var(--go-flow-typography-title-small-letter-spacing)',
        sample: 'Aa',
      },
    ],
  },
  {
    title: 'Body',
    subtitle: 'Default reading styles used across the system.',
    samples: [
      {
        title: 'Body Large',
        description: '16px / 24px, regular, 0.5px',
        font: 'var(--go-flow-typography-body-large)',
        letterSpacing: 'var(--go-flow-typography-body-large-letter-spacing)',
        sample: 'Aa',
      },
      {
        title: 'Body Medium',
        description: '14px / 20px, regular, 0.25px',
        font: 'var(--go-flow-typography-body-medium)',
        letterSpacing: 'var(--go-flow-typography-body-medium-letter-spacing)',
        sample: 'Aa',
      },
      {
        title: 'Body Small',
        description: '12px / 16px, regular, 0.4px',
        font: 'var(--go-flow-typography-body-small)',
        letterSpacing: 'var(--go-flow-typography-body-small-letter-spacing)',
        sample: 'Aa',
      },
      {
        title: 'Body Large Emphasized',
        description: '16px / 24px, medium, 0.5px',
        font: 'var(--go-flow-typography-body-large-emphasized)',
        letterSpacing: 'var(--go-flow-typography-body-large-emphasized-letter-spacing)',
        sample: 'Aa',
      },
      {
        title: 'Body Medium Emphasized',
        description: '14px / 20px, medium, 0.25px',
        font: 'var(--go-flow-typography-body-medium-emphasized)',
        letterSpacing: 'var(--go-flow-typography-body-medium-emphasized-letter-spacing)',
        sample: 'Aa',
      },
      {
        title: 'Body Small Emphasized',
        description: '12px / 16px, medium, 0.4px',
        font: 'var(--go-flow-typography-body-small-emphasized)',
        letterSpacing: 'var(--go-flow-typography-body-small-emphasized-letter-spacing)',
        sample: 'Aa',
      },
    ],
  },
  {
    title: 'Label',
    subtitle: 'Interactive text and compact labels in the component system.',
    samples: [
      {
        title: 'Label Large',
        description: '14px / 20px, medium, 0.1px',
        font: 'var(--go-flow-typography-label-large)',
        letterSpacing: 'var(--go-flow-typography-label-large-letter-spacing)',
        sample: 'Aa',
      },
      {
        title: 'Label Medium',
        description: '12px / 16px, medium, 0.5px',
        font: 'var(--go-flow-typography-label-medium)',
        letterSpacing: 'var(--go-flow-typography-label-medium-letter-spacing)',
        sample: 'Aa',
      },
      {
        title: 'Label Small',
        description: '11px / 16px, medium, 0.5px',
        font: 'var(--go-flow-typography-label-small)',
        letterSpacing: 'var(--go-flow-typography-label-small-letter-spacing)',
        sample: 'Aa',
      },
    ],
  },
] as const;
