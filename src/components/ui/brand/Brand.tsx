import {
  forwardRef,
  type ComponentPropsWithoutRef,
} from 'react';

import './brand.css';

export type BrandVariant = 'lockup' | 'mark';

type BrandAsset = {
  src: string;
  width: number;
  height: number;
};

const brandAssets: Record<BrandVariant, BrandAsset> = {
  lockup: {
    src: 'https://www.figma.com/api/mcp/asset/864bf8fa-6400-4a5d-852b-fea7e473d086',
    width: 181,
    height: 35,
  },
  mark: {
    src: 'https://www.figma.com/api/mcp/asset/9cc6f5b2-e0e8-4f6d-9c42-c293fdd2225a',
    width: 140,
    height: 120,
  },
};

export interface BrandProps
  extends Omit<ComponentPropsWithoutRef<'img'>, 'alt' | 'children' | 'height' | 'src' | 'width'> {
  variant?: BrandVariant;
  alt?: string;
}

function getBrandClassName(variant: BrandVariant, className = '') {
  return ['brand', `brand--${variant}`, className].filter(Boolean).join(' ');
}

export const Brand = forwardRef<HTMLImageElement, BrandProps>(function Brand(
  {
    variant = 'lockup',
    alt = 'Vendoo',
    className = '',
    style,
    decoding = 'async',
    loading = 'eager',
    draggable = false,
    ...imgProps
  },
  ref,
) {
  const asset = brandAssets[variant];

  return (
    <img
      ref={ref}
      alt={alt}
      className={getBrandClassName(variant, className)}
      decoding={decoding}
      draggable={draggable}
      height={asset.height}
      loading={loading}
      src={asset.src}
      style={style}
      width={asset.width}
      data-variant={variant}
      {...imgProps}
    />
  );
});

Brand.displayName = 'Brand';

export const BrandLockup = forwardRef<HTMLImageElement, Omit<BrandProps, 'variant'>>(
  function BrandLockup(props, ref) {
    return <Brand ref={ref} variant="lockup" {...props} />;
  },
);

BrandLockup.displayName = 'BrandLockup';

export const BrandMark = forwardRef<HTMLImageElement, Omit<BrandProps, 'variant'>>(
  function BrandMark(props, ref) {
    return <Brand ref={ref} variant="mark" {...props} />;
  },
);

BrandMark.displayName = 'BrandMark';
