import type {
  ComponentPropsWithoutRef,
  KeyboardEvent,
  MouseEvent,
} from 'react';

import { MarketplaceAtom, type MarketplaceAtomMarketplace } from '../marketplace-atom';
import { Icon } from '../../ui/icon/Icon';
import { type MarketplaceSelectorState } from './marketplace-selector.data';

import './marketplace-selector.css';

export interface MarketplaceSelectorProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
  marketplace?: MarketplaceAtomMarketplace;
  state?: MarketplaceSelectorState;
  onSelectedChange?: (selected: boolean) => void;
}

export function MarketplaceSelector({
  marketplace = 'eBay',
  state = 'not_selected',
  onSelectedChange,
  className = '',
  tabIndex,
  onClick,
  onKeyDown,
  ...divProps
}: MarketplaceSelectorProps) {
  const isSelected = state === 'selected';
  const isInteractive = state !== 'not_connected';

  const rootClassNames = [
    'marketplace-selector',
    isInteractive ? 'marketplace-selector--interactive' : 'marketplace-selector--static',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    if (!isInteractive) {
      return;
    }

    onClick?.(event);

    if (event.defaultPrevented) {
      return;
    }

    onSelectedChange?.(!isSelected);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!isInteractive) {
      return;
    }

    onKeyDown?.(event);

    if (event.defaultPrevented) {
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelectedChange?.(!isSelected);
    }
  };

  return (
    <div
      {...divProps}
      className={rootClassNames}
      data-marketplace={marketplace}
      data-state={state}
      role={isInteractive ? 'checkbox' : undefined}
      tabIndex={isInteractive ? tabIndex ?? 0 : undefined}
      aria-checked={isInteractive ? isSelected : undefined}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <div className="marketplace-selector__content">
        <MarketplaceAtom
          marketplace={marketplace}
          className={[
            'marketplace-selector__atom',
            state !== 'not_connected' ? 'marketplace-selector__atom--compact' : '',
          ]
            .filter(Boolean)
            .join(' ')}
        />
      </div>

      <div className="marketplace-selector__trailing" aria-hidden="true">
        {state === 'not_connected' ? (
          <div className="marketplace-selector__icon-shell marketplace-selector__icon-shell--muted">
            <Icon name="not_linked" className="marketplace-selector__icon" />
          </div>
        ) : (
          <div
            className={[
              'marketplace-selector__checkbox-shell',
              isSelected
                ? 'marketplace-selector__checkbox-shell--selected'
                : 'marketplace-selector__checkbox-shell--not-selected',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {isSelected ? <Icon name="check" className="marketplace-selector__checkbox-mark" /> : null}
          </div>
        )}
      </div>
    </div>
  );
}

MarketplaceSelector.displayName = 'MarketplaceSelector';
