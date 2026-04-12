import type { Meta, StoryObj } from '@storybook/react-vite';

import { spacingSections } from '../../styles/foundation-tokens';
import './foundation-playground.css';

type SpacingArgs = {
  token: string;
  mode: 'gap' | 'padding' | 'size';
};

const spacingTokens = spacingSections[0].tokens;

const meta = {
  title: 'Foundations/Spacing',
  parameters: {
    layout: 'padded',
  },
  args: {
    token: 'Space 4',
    mode: 'padding',
  },
  argTypes: {
    token: {
      control: 'select',
      options: spacingTokens.map((entry) => entry.name),
    },
    mode: {
      control: 'inline-radio',
      options: ['gap', 'padding', 'size'],
    },
  },
} satisfies Meta<SpacingArgs>;

export default meta;
type Story = StoryObj<SpacingArgs>;

export const Playground: Story = {
  render: ({ token, mode }) => {
    const spacing = spacingTokens.find((entry) => entry.name === token) ?? spacingTokens[0];

    return (
      <div className="foundation-playground">
        <section className="foundation-playground__panel">
          <div className="foundation-playground__preview">
            {mode === 'gap' ? (
              <div className="foundation-playground__row" style={{ gap: spacing.value }}>
                <div className="foundation-playground__badge">One</div>
                <div className="foundation-playground__badge">Two</div>
                <div className="foundation-playground__badge">Three</div>
              </div>
            ) : null}
            {mode === 'padding' ? (
              <div
                style={{
                  padding: spacing.value,
                  border: '1px solid rgba(73, 68, 85, 0.16)',
                  borderRadius: '12px',
                  background: '#ffffff',
                }}
              >
                <div className="foundation-playground__badge">Padding uses {spacing.value}</div>
              </div>
            ) : null}
            {mode === 'size' ? (
              <div
                style={{
                  width: spacing.value,
                  height: spacing.value,
                  background: 'linear-gradient(180deg, var(--go-flow-sys-light-primary), var(--go-flow-sys-light-secondary-container))',
                  borderRadius: '12px',
                }}
              />
            ) : null}
          </div>
        </section>
      </div>
    );
  },
};

export const AllTokens: Story = {
  name: 'Spacing Tokens',
  parameters: {
    layout: 'padded',
    controls: {
      disable: true,
    },
  },
  render: () => (
    <div className="foundation-card-grid">
      {spacingTokens.map((token) => (
        <article key={token.name} className="foundation-card">
          <div className="foundation-card__preview foundation-card__swatch--spacing">
            <div
              className="foundation-card__spacing-bar"
              style={{ width: token.value }}
            />
          </div>
          <div className="foundation-card__meta">
            <strong className="foundation-card__name">{token.name}</strong>
            <span className="foundation-card__description">
              {token.description}
            </span>
          </div>
        </article>
      ))}
    </div>
  ),
};
