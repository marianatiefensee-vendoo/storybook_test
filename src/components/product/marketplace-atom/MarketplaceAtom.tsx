import type { ComponentPropsWithoutRef, CSSProperties } from 'react';

import './marketplace-atom.css';
import {
  MARKETPLACE_SUPPORTING_TEXT,
  getMarketplaceLogoSource,
  marketplaceLogoInsetByMarketplaceAndSize,
  type MarketplaceAtomMarketplace,
  type MarketplaceAtomProps,
  type MarketplaceAtomSize,
} from './marketplace-atom.data';

function MarketplaceLabel({
  marketplaceName,
  size,
  className = '',
  ...divProps
}: Omit<ComponentPropsWithoutRef<'div'>, 'children'> & {
  marketplaceName: MarketplaceAtomMarketplace;
  size: MarketplaceAtomSize;
}) {
  return (
    <div
      {...divProps}
      className={[
        'marketplace-atom__label',
        size === 'Small' ? 'marketplace-atom__label--small' : 'marketplace-atom__label--default',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="marketplace-atom__content">
        <div className="marketplace-atom__title">{marketplaceName}</div>
        <div className="marketplace-atom__supporting">{MARKETPLACE_SUPPORTING_TEXT}</div>
      </div>
    </div>
  );
}

export function MarketplaceAtom({
  marketplace = 'eBay',
  size = 'Default',
  className = '',
  ...divProps
}: MarketplaceAtomProps) {
  const logoSource = getMarketplaceLogoSource(marketplace, size);
  const logoInset = marketplaceLogoInsetByMarketplaceAndSize[marketplace][size];

  return (
    <div
      {...divProps}
      className={['marketplace-atom', className].filter(Boolean).join(' ')}
      data-marketplace={marketplace}
      data-size={size}
    >
      <div className="marketplace-atom__logo-shell">
        <div className="marketplace-atom__logo-mark" style={{ inset: logoInset } as CSSProperties}>
          <img className="marketplace-atom__logo-image" src={logoSource} alt="" />
        </div>
      </div>
      <MarketplaceLabel marketplaceName={marketplace} size={size} />
    </div>
  );
}

MarketplaceAtom.displayName = 'MarketplaceAtom';
