import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react';

import { ListingFlowIconButton } from '../internal/listing-flow-ui';
import { ListingSectionHeader } from './ListingSectionHeader';
import '../listing-flow.css';

export interface ListingSectionCardProps
  extends Omit<ComponentPropsWithoutRef<'section'>, 'children' | 'title'> {
  step: number;
  title: ReactNode;
  supportingText?: ReactNode;
  trailing?: ReactNode;
  children?: ReactNode;
}

export const ListingSectionCard = forwardRef<HTMLElement, ListingSectionCardProps>(
  function ListingSectionCard(
    { step, title, supportingText, trailing, children, className = '', ...sectionProps },
    ref,
  ) {
    const hasBody = children != null;
    const resolvedTrailing =
      trailing ?? (
        <ListingFlowIconButton label="Collapse section" icon="chevron_down" />
      );

    return (
      <section
        ref={ref}
        className={['listing-flow-card listing-flow-section', className].filter(Boolean).join(' ')}
        {...sectionProps}
      >
        <ListingSectionHeader
          step={step}
          title={title}
          supportingText={supportingText}
          trailing={resolvedTrailing}
        />
        {hasBody ? <div className="listing-flow-section__body">{children}</div> : null}
      </section>
    );
  },
);

ListingSectionCard.displayName = 'ListingSectionCard';
