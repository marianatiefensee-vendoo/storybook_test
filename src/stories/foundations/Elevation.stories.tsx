import type { Meta, StoryObj } from '@storybook/react-vite';

import { elevationSections } from '../../styles/foundation-tokens';
import './foundation-playground.css';

type ElevationArgs = {
  token: string;
};

const elevationTokens = elevationSections[0].tokens;

const meta = {
  title: 'Foundations/Elevation',
  parameters: {
    layout: 'padded',
  },
  args: {
    token: 'Level 2',
  },
  argTypes: {
    token: {
      control: 'select',
      options: elevationTokens.map((entry) => entry.name),
    },
  },
} satisfies Meta<ElevationArgs>;

export default meta;
type Story = StoryObj<ElevationArgs>;

export const Playground: Story = {
  render: ({ token }) => {
    const elevation = elevationTokens.find((entry) => entry.name === token) ?? elevationTokens[0];

    return (
      <div className="foundation-playground">
        <section className="foundation-playground__panel">
          <div className="foundation-playground__preview">
            <div
              className="foundation-playground__swatch"
              style={{
                boxShadow: elevation.value,
                background: '#ffffff',
                display: 'grid',
                placeItems: 'center',
              }}
            >
              <div className="foundation-playground__sample">
                <strong>{elevation.name}</strong>
                <span>{elevation.description}</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  },
};

export const AllTokens: Story = {
  name: 'Elevation Tokens',
  parameters: {
    layout: 'padded',
    controls: {
      disable: true,
    },
  },
  render: () => (
    <div className="foundation-card-grid">
      {elevationTokens.map((token) => (
        <article key={token.name} className="foundation-card">
          <div className="foundation-card__preview">
            <div
              className="foundation-card__swatch foundation-card__elevation"
              style={{
                boxShadow: token.value,
                background: '#ffffff',
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
