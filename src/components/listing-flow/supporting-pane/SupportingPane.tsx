import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react';

import { Checkbox } from '../../ui/selection-controls/Checkbox';
import { Icon } from '../../ui/icon/Icon';
import { type IconName } from '../../ui/icon/icon-names';
import {
  ListingFlowChip,
  ListingFlowIconButton,
  ListingFlowStepBadge,
} from '../internal/listing-flow-ui';
import '../listing-flow.css';

export interface SupportingPaneSectionProps
  extends Omit<ComponentPropsWithoutRef<'section'>, 'children'> {
  title: ReactNode;
  trailing?: ReactNode;
  children: ReactNode;
}

export const SupportingPaneSection = forwardRef<
  HTMLElement,
  SupportingPaneSectionProps
>(function SupportingPaneSection(
  { title, trailing, children, className = '', ...sectionProps },
  ref,
) {
  return (
    <section
      ref={ref}
      className={['listing-flow-section', className].filter(Boolean).join(' ')}
      {...sectionProps}
    >
      <div className="listing-flow-section__header">
        <div className="listing-flow-section__title-stack">
          <span className="listing-flow-section__title">{title}</span>
        </div>
        {trailing ? <div className="listing-flow-section__trailing">{trailing}</div> : null}
      </div>
      <div className="listing-flow-section__body">{children}</div>
    </section>
  );
});

SupportingPaneSection.displayName = 'SupportingPaneSection';

export type ListingProgressStepStatus = 'current' | 'complete' | 'upcoming';

export interface ListingProgressStepRowProps
  extends Omit<ComponentPropsWithoutRef<'button'>, 'children' | 'type' | 'onClick'> {
  step: number;
  title: ReactNode;
  supportingText?: ReactNode;
  status?: ListingProgressStepStatus;
  onClick?: () => void;
}

export const ListingProgressStepRow = forwardRef<
  HTMLButtonElement,
  ListingProgressStepRowProps
>(function ListingProgressStepRow(
  {
    step,
    title,
    supportingText,
    status = 'upcoming',
    className = '',
    onClick,
    ...buttonProps
  },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      className={[
        'listing-flow-progress-row',
        `listing-flow-progress-row--${status}`,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      data-status={status}
      onClick={() => onClick?.()}
      {...buttonProps}
    >
      <ListingFlowStepBadge step={step} status={status} />
      <span className="listing-flow-progress-row__content">
        <span className="listing-flow-progress-row__title">{title}</span>
        {supportingText ? (
          <span className="listing-flow-progress-row__supporting">{supportingText}</span>
        ) : null}
      </span>
    </button>
  );
});

ListingProgressStepRow.displayName = 'ListingProgressStepRow';

export interface ListingProgressPanelProps
  extends Omit<ComponentPropsWithoutRef<'section'>, 'children'> {
  title?: ReactNode;
  progressLabel?: ReactNode;
  currentStep?: number;
  steps: Array<{
    step: number;
    title: ReactNode;
    supportingText?: ReactNode;
    status?: ListingProgressStepStatus;
  }>;
  onStepSelect?: (step: number) => void;
}

export function ListingProgressPanel({
  title = 'Listing Progress',
  progressLabel,
  currentStep = 1,
  steps,
  onStepSelect,
  className = '',
  ...sectionProps
}: ListingProgressPanelProps) {
  return (
    <SupportingPaneSection
      title={title}
      trailing={progressLabel ?? <ListingFlowChip tone="neutral">Step {currentStep} of {steps.length}</ListingFlowChip>}
      className={className}
      {...sectionProps}
    >
      <div className="listing-flow-card listing-flow-progress-panel__list">
        {steps.map((step) => {
          const status =
            step.status ??
            (step.step < currentStep ? 'complete' : step.step === currentStep ? 'current' : 'upcoming');

          return (
            <ListingProgressStepRow
              key={step.step}
              step={step.step}
              title={step.title}
              supportingText={step.supportingText}
              status={status}
              onClick={() => onStepSelect?.(step.step)}
            />
          );
        })}
      </div>
    </SupportingPaneSection>
  );
}

export interface ListingPreviewCardProps
  extends Omit<ComponentPropsWithoutRef<'article'>, 'children'> {
  statusLabel: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  priceLabel?: ReactNode;
  chips?: ReactNode[];
  imageSrc?: string;
  imageAlt?: string;
}

export function ListingPreviewCard({
  statusLabel,
  title,
  description,
  priceLabel,
  chips = [],
  imageSrc,
  imageAlt = '',
  className = '',
  ...articleProps
}: ListingPreviewCardProps) {
  return (
    <article
      className={['listing-flow-preview-card', className].filter(Boolean).join(' ')}
      {...articleProps}
    >
      <div className="listing-flow-preview-card__image">
        <ListingFlowChip tone="accent" className="listing-flow-preview-card__cover-chip">
          {statusLabel}
        </ListingFlowChip>
        {imageSrc ? (
          <img className="listing-flow-photo-tile__image" src={imageSrc} alt={imageAlt} />
        ) : (
          <span className="listing-flow-preview-card__placeholder" aria-hidden="true">
            <Icon name="listing_alt" />
          </span>
        )}
      </div>
      <div className="listing-flow-preview-card__body">
        <div className="listing-flow-preview-card__meta">
          <span className="listing-flow-preview-card__status">{statusLabel}</span>
          <div className="listing-flow-preview-card__title">{title}</div>
          {description ? (
            <div className="listing-flow-preview-card__description">{description}</div>
          ) : null}
        </div>
        {priceLabel ? <div className="listing-flow-preview-card__price">{priceLabel}</div> : null}
        {chips.length > 0 ? (
          <div className="listing-flow-preview-card__chips">
            {chips.map((chip, index) => (
              <ListingFlowChip key={index}>{chip}</ListingFlowChip>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}

export interface ListingPreviewPanelProps
  extends Omit<ComponentPropsWithoutRef<'section'>, 'children'>,
    Omit<ListingPreviewCardProps, 'className' | 'title'> {
  title?: ReactNode;
  previewTitle: ReactNode;
}

export function ListingPreviewPanel({
  title = 'Listing Preview',
  className = '',
  previewTitle,
  ...panelProps
}: ListingPreviewPanelProps) {
  const { imageSrc, imageAlt, statusLabel, description, priceLabel, chips, ...sectionProps } = panelProps;

  return (
    <SupportingPaneSection title={title} className={className} {...sectionProps}>
      <ListingPreviewCard
        imageSrc={imageSrc}
        imageAlt={imageAlt}
        statusLabel={statusLabel}
        title={previewTitle}
        description={description}
        priceLabel={priceLabel}
        chips={chips}
      />
    </SupportingPaneSection>
  );
}

export interface MarketplaceSpecificsItem {
  name: string;
  supportText?: ReactNode;
  selected?: boolean;
  disabled?: boolean;
  icon?: IconName;
  onSelectedChange?: (selected: boolean) => void;
}

export interface MarketplaceSpecificsPanelProps
  extends Omit<ComponentPropsWithoutRef<'section'>, 'children'> {
  title?: ReactNode;
  helperText?: ReactNode;
  marketplaces: MarketplaceSpecificsItem[];
  addMarketplaceLabel?: ReactNode;
  onAddMarketplace?: () => void;
}

export function MarketplaceSpecificsPanel({
  title = 'Marketplaces',
  helperText = 'Select a marketplace to customize',
  marketplaces,
  addMarketplaceLabel = 'Add Marketplace',
  onAddMarketplace,
  className = '',
  ...sectionProps
}: MarketplaceSpecificsPanelProps) {
  return (
    <SupportingPaneSection title={title} className={className} {...sectionProps}>
      <div className="listing-flow-card listing-flow-supporting-pane">
        <div className="listing-flow-supporting-pane__row">
          <div className="listing-flow-supporting-pane__row">
            <ListingFlowChip
              tone="neutral"
              icon={<Icon name="info" />}
            >
              {helperText}
            </ListingFlowChip>
          </div>
          <ListingFlowIconButton
            label="Marketplace help"
            icon="help_circle"
            aria-hidden={false}
          />
        </div>
        <div className="listing-flow-marketplace-grid listing-flow-marketplace-grid--two">
          {marketplaces.map((marketplace) => (
            <MarketplaceSelectorReadiness
              key={marketplace.name}
              marketplace={marketplace.name}
              supportingText={marketplace.supportText}
              selected={marketplace.selected}
              disabled={marketplace.disabled}
              icon={marketplace.icon}
              onSelectedChange={marketplace.onSelectedChange}
            />
          ))}
        </div>
        <button
          type="button"
          className="listing-flow-marketplace-selector listing-flow-marketplace-selector--add"
          onClick={() => onAddMarketplace?.()}
        >
          <span className="listing-flow-marketplace-selector__brand">
            <span className="listing-flow-marketplace-selector__logo">
              <Icon name="plus_circle" />
            </span>
            <span className="listing-flow-marketplace-selector__text">
              <span className="listing-flow-marketplace-selector__title">
                {addMarketplaceLabel}
              </span>
              <span className="listing-flow-marketplace-selector__supporting">
                Expand your reach with a new marketplace
              </span>
            </span>
          </span>
        </button>
      </div>
    </SupportingPaneSection>
  );
}

export interface MarketplaceSelectorReadinessProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
  marketplace: string;
  supportingText?: ReactNode;
  selected?: boolean;
  disabled?: boolean;
  icon?: IconName;
  onSelectedChange?: (selected: boolean) => void;
}

export function MarketplaceSelectorReadiness({
  marketplace,
  supportingText,
  selected = false,
  disabled = false,
  icon = 'store',
  onSelectedChange,
  className = '',
  ...divProps
}: MarketplaceSelectorReadinessProps) {
  return (
    <div
      className={[
        'listing-flow-marketplace-selector',
        selected ? 'listing-flow-marketplace-selector--selected' : '',
        disabled ? 'listing-flow-marketplace-selector--disabled' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      data-selected={selected ? 'true' : undefined}
      data-disabled={disabled ? 'true' : undefined}
      {...divProps}
    >
      <Checkbox
        label={
          <span className="listing-flow-marketplace-selector__brand">
            <span className="listing-flow-marketplace-selector__logo">
              <Icon name={icon} />
            </span>
            <span className="listing-flow-marketplace-selector__text">
              <span className="listing-flow-marketplace-selector__title">{marketplace}</span>
              {supportingText ? (
                <span className="listing-flow-marketplace-selector__supporting">
                  {supportingText}
                </span>
              ) : null}
            </span>
          </span>
        }
        checked={selected}
        disabled={disabled}
        onChange={(event) => onSelectedChange?.(event.currentTarget.checked)}
      />
      <span className="listing-flow-marketplace-selector__badge" aria-hidden="true">
        <ListingFlowChip tone={selected ? 'accent' : 'neutral'}>
          {selected ? 'Ready' : 'Inactive'}
        </ListingFlowChip>
      </span>
    </div>
  );
}

export interface MarketplaceSelectionGridProps {
  items: MarketplaceSelectorReadinessProps[];
  columns?: 2 | 3;
}

export function MarketplaceSelectionGrid({
  items,
  columns = 2,
}: MarketplaceSelectionGridProps) {
  return (
    <div
      className={[
        'listing-flow-marketplace-grid',
        columns === 3
          ? 'listing-flow-marketplace-grid--three'
          : 'listing-flow-marketplace-grid--two',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {items.map((item) => (
        <MarketplaceSelectorReadiness key={item.marketplace} {...item} />
      ))}
    </div>
  );
}
