import type { Meta, StoryObj } from '@storybook/react-vite';

import { colorPaletteSections } from '../../styles/color-tokens';
import './foundation-playground.css';

type ColorsArgs = {
  tokenKey: string;
  sampleText: string;
  mode: 'swatch' | 'text' | 'surface';
};

const colorOptions = colorPaletteSections.flatMap((section) =>
  Object.entries(section.colors).map(([label, value]) => ({
    section: section.title,
    label,
    value,
  })),
);

const meta = {
  title: 'Foundations/Colors',
  parameters: {
    layout: 'padded',
  },
  args: {
    tokenKey: 'System colors:Primary',
    sampleText: 'Accessible contrast should still read clearly.',
    mode: 'surface',
  },
  argTypes: {
    tokenKey: {
      control: 'select',
      options: colorOptions.map((entry) => `${entry.section}:${entry.label}`),
    },
    sampleText: {
      control: 'text',
    },
    mode: {
      control: 'inline-radio',
      options: ['swatch', 'text', 'surface'],
    },
  },
} satisfies Meta<ColorsArgs>;

export default meta;
type Story = StoryObj<ColorsArgs>;

function resolveColor(tokenKey: string) {
  const entry = colorOptions.find((item) => `${item.section}:${item.label}` === tokenKey);

  return entry ?? colorOptions[0];
}

export const Playground: Story = {
  render: ({ tokenKey, sampleText, mode }) => {
    const color = resolveColor(tokenKey);

    return (
      <div className="foundation-playground">
        <section className="foundation-playground__panel">
          <div className="foundation-playground__preview">
            <div
              className="foundation-playground__swatch"
              style={{
                background: mode === 'surface' ? color.value : '#ffffff',
                color: mode === 'text' ? color.value : 'var(--go-flow-field-text)',
                borderColor: color.value,
                borderStyle: 'solid',
                borderWidth: '1px',
                display: 'grid',
                placeItems: 'center',
              }}
            >
              <div className="foundation-playground__sample">
                <strong>{color.label}</strong>
                <span>{sampleText}</span>
                <span className="foundation-playground__badge">{color.value}</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  },
};
