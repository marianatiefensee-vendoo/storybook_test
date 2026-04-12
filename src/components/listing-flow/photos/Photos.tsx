import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react';

import { Button } from '../../ui/button/Button';
import { Icon } from '../../ui/icon/Icon';
import { ListingFlowChip } from '../internal/listing-flow-ui';
import '../listing-flow.css';

export interface PhotoTileProps
  extends Omit<ComponentPropsWithoutRef<'button'>, 'children' | 'type' | 'onClick'> {
  src?: string;
  alt?: string;
  label?: ReactNode;
  cover?: boolean;
  selected?: boolean;
  onClick?: () => void;
}

export const PhotoTile = forwardRef<HTMLButtonElement, PhotoTileProps>(function PhotoTile(
  { src, alt = '', label, cover = false, selected = false, className = '', onClick, ...buttonProps },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      className={[
        'listing-flow-photo-tile',
        selected ? 'listing-flow-photo-tile--selected' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      data-selected={selected ? 'true' : undefined}
      onClick={() => onClick?.()}
      {...buttonProps}
    >
      {cover ? (
        <ListingFlowChip tone="accent" className="listing-flow-photo-tile__cover-chip">
          Cover
        </ListingFlowChip>
      ) : null}
      {src ? (
        <img className="listing-flow-photo-tile__image" src={src} alt={alt} />
      ) : (
        <span className="listing-flow-photo-tile__placeholder" aria-hidden="true">
          <Icon name="image" />
        </span>
      )}
      {label ? <span className="listing-flow-photo-tile__placeholder">{label}</span> : null}
    </button>
  );
});

PhotoTile.displayName = 'PhotoTile';

export interface EmptyAddPhotoTileProps
  extends Omit<ComponentPropsWithoutRef<'button'>, 'children' | 'type' | 'onClick'> {
  label?: ReactNode;
  onClick?: () => void;
}

export const EmptyAddPhotoTile = forwardRef<
  HTMLButtonElement,
  EmptyAddPhotoTileProps
>(function EmptyAddPhotoTile(
  { label = 'Add photo', className = '', onClick, ...buttonProps },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      className={['listing-flow-photo-tile', 'listing-flow-photo-tile--empty', className]
        .filter(Boolean)
        .join(' ')}
      onClick={() => onClick?.()}
      {...buttonProps}
    >
      <span className="listing-flow-photo-tile__empty-content">
        <Icon name="plus_circle" />
        <span>{label}</span>
      </span>
    </button>
  );
});

EmptyAddPhotoTile.displayName = 'EmptyAddPhotoTile';

export interface PhotoHelpCaptionProps {
  children: ReactNode;
  className?: string;
}

export function PhotoHelpCaption({ children, className = '' }: PhotoHelpCaptionProps) {
  return <p className={['listing-flow-photo-help', className].filter(Boolean).join(' ')}>{children}</p>;
}

export interface PhotoUploadGridProps {
  photos: Array<{
    src?: string;
    alt?: string;
    label?: ReactNode;
    cover?: boolean;
    selected?: boolean;
  }>;
  emptyCount?: number;
  onPhotoClick?: (index: number) => void;
  onAddPhoto?: () => void;
}

export function PhotoUploadGrid({
  photos,
  emptyCount = 4,
  onPhotoClick,
  onAddPhoto,
}: PhotoUploadGridProps) {
  const emptyTiles = Array.from({ length: emptyCount }, (_, index) => index);

  return (
    <div className="listing-flow-stack">
      <div className="listing-flow-photo-grid listing-flow-photo-grid--top">
        {photos.map((photo, index) => (
          <PhotoTile
            key={photo.alt ?? `${index}`}
            {...photo}
            onClick={() => onPhotoClick?.(index)}
          />
        ))}
      </div>
      <div className="listing-flow-photo-grid listing-flow-photo-grid--bottom">
        {emptyTiles.map((index) => (
          <EmptyAddPhotoTile key={index} onClick={() => onAddPhoto?.()} />
        ))}
      </div>
    </div>
  );
}

export interface AiAssistPromoCardProps
  extends Omit<ComponentPropsWithoutRef<'section'>, 'children'> {
  eyebrow?: ReactNode;
  title: ReactNode;
  description: ReactNode;
  primaryActionLabel: ReactNode;
  secondaryActionLabel: ReactNode;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
}

export function AiAssistPromoCard({
  eyebrow = 'AI Assist',
  title,
  description,
  primaryActionLabel,
  secondaryActionLabel,
  onPrimaryAction,
  onSecondaryAction,
  className = '',
  ...sectionProps
}: AiAssistPromoCardProps) {
  return (
    <section className={['listing-flow-promo-card', className].filter(Boolean).join(' ')} {...sectionProps}>
      <div className="listing-flow-promo-card__eyebrow">{eyebrow}</div>
      <div className="listing-flow-promo-card__title">{title}</div>
      <div className="listing-flow-promo-card__description">{description}</div>
      <div className="listing-flow-promo-card__actions">
        <Button
          variant="outline"
          size="small"
          onClick={() => onSecondaryAction?.()}
        >
          {secondaryActionLabel}
        </Button>
        <Button
          variant="filled"
          size="small"
          leadingIcon={<Icon name="sparkle" />}
          onClick={() => onPrimaryAction?.()}
        >
          {primaryActionLabel}
        </Button>
      </div>
    </section>
  );
}

