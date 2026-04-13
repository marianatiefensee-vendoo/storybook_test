import type { ComponentPropsWithoutRef } from 'react';

export const marketplaceAtomMarketplaces = [
  'eBay',
  'Mercari',
  'Poshmark',
  'Facebook',
  'Shopify',
  'Vestiaire',
  'Etsy',
  'Grailed',
  'Whatnot',
  'Depop',
] as const;

export const marketplaceAtomSizes = ['Default', 'Small'] as const;

export type MarketplaceAtomMarketplace = (typeof marketplaceAtomMarketplaces)[number];
export type MarketplaceAtomSize = (typeof marketplaceAtomSizes)[number];

export interface MarketplaceAtomProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
  marketplace?: MarketplaceAtomMarketplace;
  size?: MarketplaceAtomSize;
}

export const marketplaceLogoFileNameByMarketplace: Record<MarketplaceAtomMarketplace, string> = {
  eBay: 'ebay',
  Mercari: 'mercari',
  Poshmark: 'poshmark',
  Facebook: 'facebook',
  Shopify: 'shopify',
  Vestiaire: 'vestiaire',
  Etsy: 'etsy',
  Grailed: 'grailed',
  Whatnot: 'whatnot',
  Depop: 'depop',
};

export const marketplaceLogoInsetByMarketplaceAndSize: Record<
  MarketplaceAtomMarketplace,
  Record<MarketplaceAtomSize, string>
> = {
  eBay: {
    Default: '36.68% 16.77%',
    Small: 'calc(36.68% - 0.15px) calc(16.77% - 0.38px)',
  },
  Mercari: {
    Default: '24.06% 31.33% 26.23% 32.29%',
    Small: 'calc(24.06% - 0.3px) calc(31.33% - 0.21px) calc(26.23% - 0.27px) calc(32.29% - 0.2px)',
  },
  Poshmark: {
    Default: '23.25% 28% 25.42% 27.58%',
    Small: 'calc(23.25% - 0.31px) calc(28% - 0.25px) calc(25.42% - 0.28px) calc(27.58% - 0.26px)',
  },
  Facebook: {
    Default: '14%',
    Small: 'calc(14% - 0.41px)',
  },
  Shopify: {
    Default: '22% 25%',
    Small: 'calc(22% - 0.32px) calc(25% - 0.29px)',
  },
  Vestiaire: {
    Default: '27% 25% 26.95% 25%',
    Small: 'calc(27% - 0.26px) calc(25% - 0.29px) calc(26.95% - 0.26px) calc(25% - 0.29px)',
  },
  Etsy: {
    Default: '31% 20% 35.59% 10%',
    Small: 'calc(31% - 0.22px) calc(20% - 0.34px) calc(35.59% - 0.16px) calc(10% - 0.46px)',
  },
  Grailed: {
    Default: '44.67% 10.67% 44.04% 10%',
    Small: 'calc(44.67% - 0.06px) calc(10.67% - 0.45px) calc(44.04% - 0.07px) calc(10% - 0.46px)',
  },
  Whatnot: {
    Default: '32% 15.07% 33.03% 15%',
    Small: 'calc(32% - 0.21px) calc(15.07% - 0.4px) calc(33.03% - 0.19px) calc(15% - 0.4px)',
  },
  Depop: {
    Default: '38% 8% 40.67% 9.33%',
    Small: 'calc(38% - 0.14px) calc(8% - 0.48px) calc(40.67% - 0.11px) calc(9.33% - 0.46px)',
  },
};

const marketplaceAssetSources = import.meta.glob('./assets/*.svg', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

export const marketplaceAssetSourceByFileName = Object.fromEntries(
  Object.entries(marketplaceAssetSources).map(([filePath, source]) => [
    filePath.split('/').pop()?.replace(/\.svg$/i, '') ?? filePath,
    source,
  ]),
) as Record<string, string>;

export const MARKETPLACE_SUPPORTING_TEXT = 'Supporting line text, lorem ipsum dolor';

export function getMarketplaceLogoSource(
  marketplace: MarketplaceAtomMarketplace,
  size: MarketplaceAtomSize,
) {
  const fileName = `${marketplaceLogoFileNameByMarketplace[marketplace]}-${size.toLowerCase()}`;
  const source = marketplaceAssetSourceByFileName[fileName];

  if (!source) {
    throw new Error(`Missing marketplace logo asset: ${fileName}`);
  }

  return source;
}
