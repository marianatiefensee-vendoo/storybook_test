export type ColorPaletteSection = {
  title: string;
  subtitle: string;
  colors: Record<string, string>;
};

export const colorPaletteSections: ColorPaletteSection[] = [
  {
    title: 'System colors',
    subtitle: 'Brand, surface, and feedback roles from the shared semantic token set.',
    colors: {
      Primary: 'var(--go-flow-sys-light-primary)',
      'On Primary': 'var(--go-flow-sys-light-on-primary)',
      'On Surface': 'var(--go-flow-sys-light-on-surface)',
      'On Surface Variant': 'var(--go-flow-sys-light-on-surface-variant)',
      Error: 'var(--go-flow-sys-light-error)',
      'On Error': 'var(--go-flow-sys-light-on-error)',
      'Outline Variant': 'var(--go-flow-sys-light-outline-variant)',
      'Secondary Container': 'var(--go-flow-sys-light-secondary-container)',
      'On Secondary Container': 'var(--go-flow-sys-light-on-secondary-container)',
    },
  },
  {
    title: 'State layers',
    subtitle: 'Interaction overlays shared by components for hover and pressed feedback.',
    colors: {
      'On Surface / 10%': 'var(--go-flow-state-layer-on-surface-10)',
      'Filled Hover': 'var(--go-flow-state-layer-filled-hover)',
      'Outline Hover': 'var(--go-flow-state-layer-outline-hover)',
      'Tonal Hover': 'var(--go-flow-state-layer-tonal-hover)',
    },
  },
] as const;
