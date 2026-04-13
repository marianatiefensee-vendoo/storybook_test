import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react';

import { ListingFlowIconButton } from '../internal/listing-flow-ui';
import { ListingSectionHeader, type ListingSectionProgress } from './ListingSectionHeader';
import '../listing-flow.css';

export interface ListingSectionCardProps
  extends Omit<ComponentPropsWithoutRef<'section'>, 'children' | 'title'> {
  step: number;
  progress?: ListingSectionProgress;
  showAction?: boolean;
  title: ReactNode;
  supportingText?: ReactNode;
  trailing?: ReactNode;
  children?: ReactNode;
}

export const ListingSectionCard = forwardRef<HTMLElement, ListingSectionCardProps>(
  function ListingSectionCard(
    {
      step,
      progress = 'upcoming',
      showAction = true,
      title,
      supportingText,
      trailing,
      children,
      className = '',
      ...sectionProps
    },
    ref,
  ) {
    const hasBody = children != null;
    const resolvedTrailing =
      trailing ?? (showAction ? (
        <ListingFlowIconButton label="Collapse section" icon="chevron_down" />
      ) : null);

    return (
      <section
        ref={ref}
        className={['listing-flow-card listing-flow-section', className].filter(Boolean).join(' ')}
        {...sectionProps}
      >
        <ListingSectionHeader
          step={step}
          progress={progress}
          title={title}
          supportingText={supportingText}
          trailing={resolvedTrailing ?? undefined}
        />
        {hasBody ? <div className="listing-flow-section__body">{children}</div> : null}
      </section>
    );
  },
);

ListingSectionCard.displayName = 'ListingSectionCard';
