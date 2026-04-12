import { forwardRef, useId, type ComponentPropsWithoutRef, type ReactNode } from 'react';

import { Icon } from '../../ui/icon/Icon';
import { type IconName } from '../../ui/icon/icon-names';
import '../listing-flow.css';

type ListingFlowChipTone = 'neutral' | 'accent' | 'outline';

interface ListingFlowChipProps {
  tone?: ListingFlowChipTone;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function ListingFlowChip({
  tone = 'neutral',
  icon,
  children,
  className = '',
}: ListingFlowChipProps) {
  return (
    <span
      className={['listing-flow-chip', `listing-flow-chip--${tone}`, className]
        .filter(Boolean)
        .join(' ')}
    >
      {icon ? <span aria-hidden="true">{icon}</span> : null}
      <span>{children}</span>
    </span>
  );
}

export function ListingFlowDivider() {
  return <hr className="listing-flow-divider" />;
}

interface ListingFlowIconButtonProps
  extends Omit<ComponentPropsWithoutRef<'button'>, 'children' | 'type'> {
  label: string;
  icon: IconName;
}

export const ListingFlowIconButton = forwardRef<
  HTMLButtonElement,
  ListingFlowIconButtonProps
>(function ListingFlowIconButton(
  { label, icon, className = '', ...buttonProps },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      className={['listing-flow-icon-button', className].filter(Boolean).join(' ')}
      aria-label={label}
      {...buttonProps}
    >
      <Icon name={icon} />
    </button>
  );
});

ListingFlowIconButton.displayName = 'ListingFlowIconButton';

type ListingFlowStepStatus = 'current' | 'complete' | 'upcoming';

interface ListingFlowStepBadgeProps {
  step: number | string;
  status?: ListingFlowStepStatus;
}

export function ListingFlowStepBadge({
  step,
  status = 'upcoming',
}: ListingFlowStepBadgeProps) {
  return (
    <span className={['listing-flow-step-badge', `listing-flow-step-badge--${status}`].join(' ')}>
      {status === 'complete' ? <Icon name="check" /> : step}
    </span>
  );
}

interface ListingFlowSelectFieldProps
  extends Omit<ComponentPropsWithoutRef<'select'>, 'children' | 'value' | 'onChange'> {
  label: ReactNode;
  value: string;
  options: Array<{ label: string; value: string; disabled?: boolean }>;
  supportingText?: ReactNode;
  trailingChip?: ReactNode;
  onValueChange: (value: string) => void;
}

export function ListingFlowSelectField({
  label,
  value,
  options,
  supportingText,
  trailingChip,
  onValueChange,
  id,
  className = '',
  disabled = false,
  ...selectProps
}: ListingFlowSelectFieldProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;

  return (
    <label className={['listing-flow-select-field', className].filter(Boolean).join(' ')} htmlFor={selectId}>
      <span className="listing-flow-select-field__header">
        <span className="listing-flow-select-field__label">{label}</span>
        {trailingChip ? <span>{trailingChip}</span> : null}
      </span>
      <span className="listing-flow-select-field__select-shell">
        <select
          {...selectProps}
          id={selectId}
          className="listing-flow-select-field__select"
          value={value}
          disabled={disabled}
          onChange={(event) => onValueChange(event.currentTarget.value)}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>
        <span aria-hidden="true" className="listing-flow-select-field__select-icon">
          <Icon name="chevron_down" />
        </span>
      </span>
      {supportingText ? (
        <span className="listing-flow-select-field__supporting">{supportingText}</span>
      ) : null}
    </label>
  );
}

interface MarketplaceLogoTileProps
  extends Omit<ComponentPropsWithoutRef<'button'>, 'type' | 'children'> {
  name: string;
  icon?: IconName;
  compact?: boolean;
}

export const MarketplaceLogoTile = forwardRef<HTMLButtonElement, MarketplaceLogoTileProps>(
  function MarketplaceLogoTile(
    { name, icon, compact = false, className = '', ...buttonProps },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type="button"
        className={[
          'listing-flow-marketplace-selector__logo',
          compact ? 'listing-flow-marketplace-selector__logo--compact' : '',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        aria-label={name}
        {...buttonProps}
      >
        {icon ? <Icon name={icon} /> : <span>{name.slice(0, 1).toUpperCase()}</span>}
      </button>
    );
  },
);

MarketplaceLogoTile.displayName = 'MarketplaceLogoTile';

