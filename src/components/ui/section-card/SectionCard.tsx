import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react';

import { IconButton } from '../icon-button/IconButton';
import { Icon } from '../icon/Icon';
import './section-card.css';

export type SectionCardProgress = 'upcoming' | 'current' | 'complete';

export interface SectionCardProps
  extends Omit<ComponentPropsWithoutRef<'section'>, 'children' | 'title'> {
  step: number;
  expanded?: boolean;
  progress?: SectionCardProgress;
  title: ReactNode;
  supportingText?: ReactNode;
  action?: ReactNode | null;
  children?: ReactNode;
}

type SectionCardBadgeProps = {
  step: number;
  progress: SectionCardProgress;
  expanded: boolean;
};

function SectionCardBadge({ step, progress, expanded }: SectionCardBadgeProps) {
  return (
    <span
      className={[
        'section-card__badge',
        expanded ? 'section-card__badge--expanded' : 'section-card__badge--collapsed',
      ].join(' ')}
    >
      {progress === 'complete' ? (
        <Icon name="check" className="section-card__badge-icon" />
      ) : (
        step
      )}
    </span>
  );
}

export const SectionCard = forwardRef<HTMLElement, SectionCardProps>(function SectionCard(
  {
    step,
    expanded = false,
    progress = 'upcoming',
    title,
    supportingText,
    action,
    children,
    className = '',
    ...sectionProps
  },
  ref,
) {
  const hasSupportingText = supportingText != null;
  const resolvedAction =
    action === undefined ? (
      <IconButton
        label={expanded ? 'Collapse section' : 'Expand section'}
        icon={<Icon name={expanded ? 'chevron_up' : 'chevron_down'} />}
      />
    ) : (
      action
    );

  return (
    <section
      ref={ref}
      className={[
        'section-card',
        expanded ? 'section-card--expanded' : 'section-card--collapsed',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      data-expanded={expanded}
      data-progress={progress}
      {...sectionProps}
    >
      <div className="section-card__header">
        <div className="section-card__header-main">
          <SectionCardBadge step={step} progress={progress} expanded={expanded} />
          <div
            className={[
              'section-card__title-stack',
              hasSupportingText ? 'section-card__title-stack--supporting' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            <span className="section-card__title">{title}</span>
            {hasSupportingText ? (
              <span className="section-card__supporting">{supportingText}</span>
            ) : null}
          </div>
        </div>
        {resolvedAction != null ? <div className="section-card__action">{resolvedAction}</div> : null}
      </div>
      {expanded ? (
        <>
          <div className="section-card__divider" />
          <div className="section-card__slot">{children}</div>
        </>
      ) : null}
    </section>
  );
});

SectionCard.displayName = 'SectionCard';
