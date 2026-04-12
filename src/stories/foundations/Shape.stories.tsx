import type { Meta, StoryObj } from '@storybook/react-vite';

import { shapeSections } from '../../styles/foundation-tokens';
import './foundation-playground.css';

type ShapeArgs = {
  token: string;
};

const shapeTokens = shapeSections.flatMap((section) => section.tokens);

const meta = {
  title: 'Foundations/Shape',
  parameters: {
    layout: 'padded',
  },
  args: {
    token: 'Radius lg',
  },
  argTypes: {
    token: {
      control: 'select',
      options: shapeTokens.map((entry) => entry.name),
    },
  },
} satisfies Meta<ShapeArgs>;

export default meta;
type Story = StoryObj<ShapeArgs>;

export const Playground: Story = {
  render: ({ token }) => {
    const shape = shapeTokens.find((entry) => entry.name === token) ?? shapeTokens[0];

    return (
      <div className="foundation-playground">
        <section className="foundation-playground__panel">
          <div className="foundation-playground__preview">
            <div
              className="foundation-playground__swatch"
              style={{
                borderRadius: shape.value,
                background: '#ffffff',
                boxShadow: 'var(--go-flow-elevation-level-1)',
                display: 'grid',
                placeItems: 'center',
              }}
            >
              <div className="foundation-playground__sample">
                <strong>{shape.name}</strong>
                <span>{shape.description}</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  },
};

export const AllTokens: Story = {
  name: 'Shape Tokens',
  parameters: {
    layout: 'padded',
    controls: {
      disable: true,
    },
  },
  render: () => (
    <div className="foundation-card-grid">
      {shapeTokens.map((token) => (
        <article key={token.name} className="foundation-card">
          <div className="foundation-card__preview">
            <div
              className="foundation-card__swatch foundation-card__shape"
              style={{
                borderRadius: token.value,
                background: '#ffffff',
                boxShadow: 'var(--go-flow-elevation-level-1)',
              }}
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
