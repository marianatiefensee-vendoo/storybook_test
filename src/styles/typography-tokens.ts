export type TypographyTypesetBlock = {
  title: string;
  subtitle: string;
  fontFamily: string;
  fontWeight: number;
  fontSizes: number[];
  sampleText: string;
  tokenNames: string[];
};

export type TypographySection = {
  title: string;
  subtitle: string;
  blocks: TypographyTypesetBlock[];
};

export type TypographyStyleToken = {
  name: string;
  fontSize: number;
  lineHeight: number;
  fontWeight: number;
  letterSpacing: string;
  section: string;
};

const brandFontFamily = 'var(--go-flow-font-family-brand)';
const sampleText = 'The quick brown fox jumps over the lazy dog.';

export const typographyStyleTokens: TypographyStyleToken[] = [
  { name: 'Display Large', fontSize: 57, lineHeight: 64, fontWeight: 400, letterSpacing: '-0.25px', section: 'Display' },
  { name: 'Display Medium', fontSize: 45, lineHeight: 52, fontWeight: 400, letterSpacing: '0px', section: 'Display' },
  { name: 'Display Small', fontSize: 36, lineHeight: 44, fontWeight: 400, letterSpacing: '0px', section: 'Display' },
  { name: 'Headline Large', fontSize: 32, lineHeight: 40, fontWeight: 400, letterSpacing: '0px', section: 'Headline' },
  { name: 'Headline Medium', fontSize: 28, lineHeight: 36, fontWeight: 400, letterSpacing: '0px', section: 'Headline' },
  { name: 'Headline Small', fontSize: 24, lineHeight: 32, fontWeight: 400, letterSpacing: '0px', section: 'Headline' },
  { name: 'Title Large', fontSize: 22, lineHeight: 28, fontWeight: 400, letterSpacing: '0px', section: 'Title' },
  { name: 'Title Medium', fontSize: 16, lineHeight: 24, fontWeight: 500, letterSpacing: '0.15px', section: 'Title' },
  { name: 'Title Small', fontSize: 14, lineHeight: 20, fontWeight: 500, letterSpacing: '0.1px', section: 'Title' },
  { name: 'Body Large', fontSize: 16, lineHeight: 24, fontWeight: 400, letterSpacing: '0.5px', section: 'Body' },
  { name: 'Body Medium', fontSize: 14, lineHeight: 20, fontWeight: 400, letterSpacing: '0.25px', section: 'Body' },
  { name: 'Body Small', fontSize: 12, lineHeight: 16, fontWeight: 400, letterSpacing: '0.4px', section: 'Body' },
  { name: 'Body Large Emphasized', fontSize: 16, lineHeight: 24, fontWeight: 500, letterSpacing: '0.5px', section: 'Body' },
  { name: 'Body Medium Emphasized', fontSize: 14, lineHeight: 20, fontWeight: 500, letterSpacing: '0.25px', section: 'Body' },
  { name: 'Body Small Emphasized', fontSize: 12, lineHeight: 16, fontWeight: 500, letterSpacing: '0.4px', section: 'Body' },
  { name: 'Label Large', fontSize: 14, lineHeight: 20, fontWeight: 500, letterSpacing: '0.1px', section: 'Label' },
  { name: 'Label Medium', fontSize: 12, lineHeight: 16, fontWeight: 500, letterSpacing: '0.5px', section: 'Label' },
  { name: 'Label Small', fontSize: 11, lineHeight: 16, fontWeight: 500, letterSpacing: '0.5px', section: 'Label' },
];

export const typographyStyleNames = typographyStyleTokens.map((token) => token.name) as readonly string[];

export const typographySections: TypographySection[] = [
  {
    title: 'Display',
    subtitle: 'Largest text styles for hero content and major page moments.',
    blocks: [
      {
        title: 'Display',
        subtitle: 'Regular weight, large scale',
        fontFamily: brandFontFamily,
        fontWeight: 400,
        fontSizes: [57, 45, 36],
        sampleText,
        tokenNames: ['Display Large', 'Display Medium', 'Display Small'],
      },
    ],
  },
  {
    title: 'Headline',
    subtitle: 'Section headers and high-emphasis supporting text.',
    blocks: [
      {
        title: 'Headline',
        subtitle: 'Regular weight, headline scale',
        fontFamily: brandFontFamily,
        fontWeight: 400,
        fontSizes: [32, 28, 24],
        sampleText,
        tokenNames: ['Headline Large', 'Headline Medium', 'Headline Small'],
      },
    ],
  },
  {
    title: 'Title',
    subtitle: 'Component headings and app-level hierarchy.',
    blocks: [
      {
        title: 'Title Regular',
        subtitle: 'Large title style',
        fontFamily: brandFontFamily,
        fontWeight: 400,
        fontSizes: [22],
        sampleText,
        tokenNames: ['Title Large'],
      },
      {
        title: 'Title Emphasized',
        subtitle: 'Medium and small title styles',
        fontFamily: brandFontFamily,
        fontWeight: 500,
        fontSizes: [16, 14],
        sampleText,
        tokenNames: ['Title Medium', 'Title Small'],
      },
    ],
  },
  {
    title: 'Body',
    subtitle: 'Default reading styles used across the system.',
    blocks: [
      {
        title: 'Body Regular',
        subtitle: 'Primary reading scale',
        fontFamily: brandFontFamily,
        fontWeight: 400,
        fontSizes: [16, 14, 12],
        sampleText,
        tokenNames: ['Body Large', 'Body Medium', 'Body Small'],
      },
      {
        title: 'Body Emphasized',
        subtitle: 'Medium-emphasis reading scale',
        fontFamily: brandFontFamily,
        fontWeight: 500,
        fontSizes: [16, 14, 12],
        sampleText,
        tokenNames: [
          'Body Large Emphasized',
          'Body Medium Emphasized',
          'Body Small Emphasized',
        ],
      },
    ],
  },
  {
    title: 'Label',
    subtitle: 'Interactive text and compact labels in the component system.',
    blocks: [
      {
        title: 'Label',
        subtitle: 'Medium-emphasis label scale',
        fontFamily: brandFontFamily,
        fontWeight: 500,
        fontSizes: [14, 12, 11],
        sampleText,
        tokenNames: ['Label Large', 'Label Medium', 'Label Small'],
      },
    ],
  },
] as const;
