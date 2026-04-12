import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { expect, fn, userEvent, waitFor } from 'storybook/test';

import {
  AiAssistPromoCard,
  EmptyAddPhotoTile,
  PhotoHelpCaption,
  PhotoTile,
  PhotoUploadGrid,
} from './Photos';
import { createFigmaDesign } from '../../../stories/figma-design';
import { ListingFlowChip } from '../internal/listing-flow-ui';

const photosDesign = createFigmaDesign(
  'https://www.figma.com/design/941LilI1FqImC2usHWp0qN/Listing-Flow-Draft--Recreate-?node-id=1098-31275&m=dev',
);

type PhotoStoriesArgs = {
  selectedIndex: number;
};

const demoPhotos = [
  '#d8c1ff',
  '#c3b0ff',
  '#f2e7fe',
  '#e6e0ee',
].map((color, index) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 240 240">
      <rect width="240" height="240" rx="24" fill="${color}" />
      <circle cx="120" cy="96" r="34" fill="#ffffff" fill-opacity="0.7" />
      <text x="120" y="158" text-anchor="middle" font-family="Arial, sans-serif" font-size="28" font-weight="700" fill="#4a00bf">Photo ${index + 1}</text>
    </svg>
  `)}`,
);

const meta = {
  title: 'Listing Flow/Photos',
  component: PhotoUploadGrid,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    design: photosDesign,
    docs: {
      description: {
        component:
          'Photo-flow primitives for uploaded tiles, empty add slots, helper copy, and the smart-listing promo surface.',
      },
    },
  },
  args: {
    selectedIndex: 0,
  },
  argTypes: {
    selectedIndex: {
      control: { type: 'number', min: 0, max: 3, step: 1 },
    },
  },
} satisfies Meta<PhotoStoriesArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => {
    const [storyArgs, updateArgs] = useArgs<PhotoStoriesArgs>();
    const resolved = { ...args, ...storyArgs };

    return (
      <PhotoUploadGrid
        photos={demoPhotos.map((src, index) => ({
          src,
          alt: `Sample photo ${index + 1}`,
          cover: index === 0,
          selected: index === resolved.selectedIndex,
        }))}
        onPhotoClick={(index) => updateArgs({ selectedIndex: index })}
        onAddPhoto={fn()}
      />
    );
  },
  play: async ({ canvas }) => {
    const photo = canvas.getByRole('button', { name: /Sample photo 2/i });
    await userEvent.click(photo);
    await waitFor(() => expect(photo).toHaveAttribute('data-selected', 'true'));
  },
};

export const TileStates: Story = {
  parameters: {
    layout: 'padded',
    controls: {
      disable: true,
    },
  },
  render: () => (
    <div className="listing-flow-photo-grid listing-flow-photo-grid--top">
      <PhotoTile
        src={demoPhotos[0]}
        alt="Selected sample"
        cover
        selected
        label={<ListingFlowChip tone="accent">Cover</ListingFlowChip>}
      />
      <PhotoTile src={demoPhotos[1]} alt="Plain sample" />
      <EmptyAddPhotoTile />
      <EmptyAddPhotoTile label="Add another" />
    </div>
  ),
};

export const PromoCard: Story = {
  parameters: {
    layout: 'centered',
    design: createFigmaDesign(
      'https://www.figma.com/design/941LilI1FqImC2usHWp0qN/Listing-Flow-Draft--Recreate-?node-id=1098-31300&m=dev',
    ),
  },
  render: () => (
    <AiAssistPromoCard
      title="Create smarter listings with less effort"
      description="Start from scratch or let AI suggest a stronger title, description, and price."
      primaryActionLabel="Create with AI"
      secondaryActionLabel="Start from scratch"
      onPrimaryAction={fn()}
      onSecondaryAction={fn()}
    />
  ),
};

export const HelpCaption: Story = {
  parameters: {
    layout: 'centered',
    controls: {
      disable: true,
    },
  },
  render: () => (
    <PhotoHelpCaption>
      Use bright, in-focus photos to help shoppers understand the item condition.
    </PhotoHelpCaption>
  ),
};
