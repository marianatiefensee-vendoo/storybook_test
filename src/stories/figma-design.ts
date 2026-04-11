export type FigmaDesignParameter =
  | {
      type: 'figma';
      url: string;
      allowFullscreen?: boolean;
    }
  | {
      type: 'figspec';
      url: string;
      accessToken: string;
    };

const figmaAccessToken = import.meta.env.VITE_STORYBOOK_FIGMA_ACCESS_TOKEN as
  | string
  | undefined;

export function createFigmaDesign(url: string): FigmaDesignParameter {
  if (figmaAccessToken) {
    return {
      type: 'figspec',
      url,
      accessToken: figmaAccessToken,
    };
  }

  return {
    type: 'figma',
    url,
    allowFullscreen: true,
  };
}

