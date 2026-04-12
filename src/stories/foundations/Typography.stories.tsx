import type { Meta, StoryObj } from '@storybook/react-vite';

import { typographyStyleNames, typographyStyleTokens } from '../../styles/typography-tokens';
import './foundation-playground.css';

type TypographyArgs = {
  styleName: (typeof typographyStyleNames)[number];
  sampleText: string;
  showMetrics: boolean;
  textAlign: 'left' | 'center' | 'right';
};

const meta = {
  title: 'Foundations/Typography',
  parameters: {
    layout: 'padded',
  },
  args: {
    styleName: 'Body Large',
    sampleText: 'The quick brown fox jumps over the lazy dog.',
    showMetrics: true,
    textAlign: 'left',
  },
  argTypes: {
    styleName: {
      control: 'select',
      options: typographyStyleNames,
    },
    sampleText: {
      control: 'text',
    },
    showMetrics: {
      control: 'boolean',
    },
    textAlign: {
      control: 'inline-radio',
      options: ['left', 'center', 'right'],
    },
  },
} satisfies Meta<TypographyArgs>;

export default meta;
type Story = StoryObj<TypographyArgs>;

const styleMap = Object.fromEntries(
  typographyStyleTokens.map((token) => [token.name, token]),
) as Record<(typeof typographyStyleNames)[number], (typeof typographyStyleTokens)[number]>;

export const Playground: Story = {
  render: ({ styleName, sampleText, showMetrics, textAlign }) => {
    const token = styleMap[styleName];

    return (
      <div className="foundation-playground">
        <section className="foundation-playground__panel">
          <div className="foundation-playground__preview">
            <div className="foundation-playground__meta">
              <span className="foundation-playground__badge">{token.section}</span>
              <span className="foundation-playground__badge">{token.name}</span>
              <span className="foundation-playground__badge">
                {token.fontSize}px / {token.lineHeight}px
              </span>
              <span className="foundation-playground__badge">
                {token.fontWeight}
              </span>
            </div>
            <div
              style={{
                fontFamily: 'var(--go-flow-font-family-brand)',
                fontSize: `${token.fontSize}px`,
                lineHeight: `${token.lineHeight}px`,
                fontWeight: token.fontWeight,
                letterSpacing: token.letterSpacing,
                textAlign,
                color: 'var(--go-flow-field-text)',
              }}
            >
              {sampleText}
            </div>
            {showMetrics ? (
              <div className="foundation-playground__meta">
                <span className="foundation-playground__badge">
                  Letter spacing {token.letterSpacing}
                </span>
                <span className="foundation-playground__badge">
                  Family Lexend Variable
                </span>
              </div>
            ) : null}
          </div>
        </section>
      </div>
    );
  },
};
