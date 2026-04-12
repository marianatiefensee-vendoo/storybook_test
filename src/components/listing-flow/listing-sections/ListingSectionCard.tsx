import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react';

import {
  ListingFlowIconButton,
  ListingFlowStepBadge,
} from '../internal/listing-flow-ui';
import '../listing-flow.css';

export interface ListingSectionHeaderProps {
  step: number;
  title: ReactNode;
  supportingText?: ReactNode;
  trailing?: ReactNode;
}

export function ListingSectionHeader({
  step,
  title,
  supportingText,
  trailing,
}: ListingSectionHeaderProps) {
  return (
    <div className="listing-flow-section__header">
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
    </div>
  );
}

export interface ListingSectionCardProps
  extends Omit<ComponentPropsWithoutRef<'section'>, 'children'> {
  step: number;
  title: ReactNode;
  supportingText?: ReactNode;
  trailing?: ReactNode;
  children: ReactNode;
}

export const ListingSectionCard = forwardRef<HTMLElement, ListingSectionCardProps>(
  function ListingSectionCard(
    { step, title, supportingText, trailing, children, className = '', ...sectionProps },
    ref,
  ) {
    return (
      <section
        ref={ref}
        className={['listing-flow-section', className].filter(Boolean).join(' ')}
        {...sectionProps}
      >
        <ListingSectionHeader
          step={step}
          title={title}
          supportingText={supportingText}
          trailing={
            trailing ?? <ListingFlowIconButton label="Collapse section" icon="chevron_down" />
          }
        />
        <div className="listing-flow-card listing-flow-section__body">{children}</div>
      </section>
    );
  },
);

ListingSectionCard.displayName = 'ListingSectionCard';

export interface ListingSectionCardVariantProps
  extends Omit<ListingSectionCardProps, 'title'> {
  children: ReactNode;
}

export function ListingSectionCardMarketplaces({
  children,
  ...props
}: ListingSectionCardVariantProps) {
  return <ListingSectionCard {...props} title="Marketplaces">{children}</ListingSectionCard>;
}

export function ListingSectionCardItemDetails({
  children,
  ...props
}: ListingSectionCardVariantProps) {
  return <ListingSectionCard {...props} title="Item Details">{children}</ListingSectionCard>;
}

export function ListingSectionCardPricing({
  children,
  ...props
}: ListingSectionCardVariantProps) {
  return <ListingSectionCard {...props} title="Pricing">{children}</ListingSectionCard>;
}

export function ListingSectionCardShipping({
  children,
  ...props
}: ListingSectionCardVariantProps) {
  return <ListingSectionCard {...props} title="Shipping">{children}</ListingSectionCard>;
}
