import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react';

import { ListingFlowStepBadge } from '../internal/listing-flow-ui';
import '../listing-flow.css';

export interface ListingSectionHeaderProps
  extends Omit<ComponentPropsWithoutRef<'header'>, 'children' | 'title'> {
  step: number;
  title: ReactNode;
  supportingText?: ReactNode;
  trailing?: ReactNode;
}

export const ListingSectionHeader = forwardRef<
  HTMLElement,
  ListingSectionHeaderProps
>(function ListingSectionHeader(
  { step, title, supportingText, trailing, className = '', ...headerProps },
  ref,
) {
  return (
    <header
      ref={ref}
      className={['listing-flow-section__header', className].filter(Boolean).join(' ')}
      {...headerProps}
    >
      <div className="listing-flow-section__header-main">
        <ListingFlowStepBadge step={step} status="current" />
        <div className="listing-flow-section__title-stack">
          <span className="listing-flow-section__title">{title}</span>
          {supportingText ? (
            <span className="listing-flow-section__supporting">{supportingText}</span>
          ) : null}
        </div>
      </div>
      {trailing ? <div className="listing-flow-section__trailing">{trailing}</div> : null}
    </header>
  );
});

ListingSectionHeader.displayName = 'ListingSectionHeader';
