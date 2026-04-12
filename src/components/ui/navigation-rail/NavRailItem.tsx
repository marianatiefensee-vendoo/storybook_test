import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type MouseEventHandler,
  type ReactNode,
  type Ref,
} from 'react';

import { useNavigationRailContext } from './navigation-rail-context';
import './navigation-rail.css';

export type NavRailItemLayout = 'bar' | 'rail';
export type NavRailItemBadgeVariant = 'compact' | 'prominent';

export interface NavRailItemProps
  extends Omit<ComponentPropsWithoutRef<'button'>, 'children' | 'type' | 'onClick' | 'disabled'> {
  layout?: NavRailItemLayout;
  icon: ReactNode;
  label: string;
  selected?: boolean;
  badge?: string | number;
  badgeVariant?: NavRailItemBadgeVariant;
  disabled?: boolean;
  href?: string;
  onClick?: () => void;
}

function getBadgeVariant(
  badge: NavRailItemProps['badge'],
  badgeVariant: NavRailItemBadgeVariant | undefined,
) {
  if (badgeVariant) {
    return badgeVariant;
  }

  return badge != null ? 'prominent' : undefined;
}

function renderBadge(
  badge: NavRailItemProps['badge'],
  badgeVariant: NavRailItemBadgeVariant | undefined,
) {
  const resolvedVariant = getBadgeVariant(badge, badgeVariant);

  if (!resolvedVariant) {
    return null;
  }

  if (resolvedVariant === 'compact') {
    return (
      <span
        aria-hidden="true"
        className="nav-rail-item__badge nav-rail-item__badge--compact"
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className="nav-rail-item__badge nav-rail-item__badge--prominent"
    >
      {badge ?? '3'}
    </span>
  );
}

export const NavRailItem = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  NavRailItemProps
>(function NavRailItem(
  {
    layout = 'rail',
    icon,
    label,
    selected = false,
    badge,
    badgeVariant,
    disabled = false,
    href,
    className = '',
    onClick,
    ...restProps
  },
  ref,
  ) {
  const { expanded } = useNavigationRailContext();
  const isDocked = layout === 'rail' && !expanded;
  const isBar = layout === 'bar';
  const resolvedBadgeVariant = getBadgeVariant(badge, badgeVariant);
  const classes = [
    'nav-rail-item',
    isBar ? 'nav-rail-item--bar' : 'nav-rail-item--rail',
    isDocked ? 'nav-rail-item--docked' : 'nav-rail-item--expanded',
    selected ? 'nav-rail-item--selected' : '',
    disabled ? 'nav-rail-item--disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleClick: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement> = (
    event,
  ) => {
    if (disabled) {
      event.preventDefault();
      return;
    }

    onClick?.();
  };

  const badgeElement = renderBadge(badge, resolvedBadgeVariant);

  if (href) {
    return (
      <a
        ref={ref as Ref<HTMLAnchorElement>}
        className={classes}
        data-layout={layout}
        data-selected={selected ? 'true' : undefined}
        data-disabled={disabled ? 'true' : undefined}
        data-docked={isDocked ? 'true' : undefined}
        aria-current={selected ? 'page' : undefined}
        aria-label={isDocked ? label : undefined}
        {...(restProps as ComponentPropsWithoutRef<'a'>)}
        href={disabled ? undefined : href}
        aria-disabled={disabled ? true : undefined}
        tabIndex={disabled ? -1 : undefined}
        onClick={handleClick}
      >
        {isBar ? (
          <>
            <span
              className="nav-rail-item__bar-icon-shell"
              data-selected={selected ? 'true' : undefined}
            >
              <span className="nav-rail-item__icon">{icon}</span>
              {badgeElement}
            </span>
            <span className="nav-rail-item__label nav-rail-item__label--bar">
              {label}
            </span>
          </>
        ) : (
          <span
            className={[
              'nav-rail-item__rail-shell',
              isDocked ? 'nav-rail-item__rail-shell--docked' : '',
              selected ? 'nav-rail-item__rail-shell--selected' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            <span className="nav-rail-item__icon">{icon}</span>
            {badgeElement}
            <span
              className={[
                'nav-rail-item__label',
                'nav-rail-item__label--rail',
                isDocked ? 'nav-rail-item__label--sr-only' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {label}
            </span>
          </span>
        )}
      </a>
    );
  }

  return (
    <button
      ref={ref as Ref<HTMLButtonElement>}
      className={classes}
      type="button"
      disabled={disabled}
      data-layout={layout}
      data-selected={selected ? 'true' : undefined}
      data-disabled={disabled ? 'true' : undefined}
      data-docked={isDocked ? 'true' : undefined}
      aria-current={selected ? 'page' : undefined}
      aria-label={isDocked ? label : undefined}
      {...(restProps as ComponentPropsWithoutRef<'button'>)}
      onClick={handleClick}
    >
      {isBar ? (
        <>
          <span
            className="nav-rail-item__bar-icon-shell"
            data-selected={selected ? 'true' : undefined}
          >
            <span className="nav-rail-item__icon">{icon}</span>
            {badgeElement}
          </span>
          <span className="nav-rail-item__label nav-rail-item__label--bar">
            {label}
          </span>
        </>
      ) : (
        <span
          className={[
            'nav-rail-item__rail-shell',
            isDocked ? 'nav-rail-item__rail-shell--docked' : '',
            selected ? 'nav-rail-item__rail-shell--selected' : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <span className="nav-rail-item__icon">{icon}</span>
          {badgeElement}
          <span
            className={[
              'nav-rail-item__label',
              'nav-rail-item__label--rail',
              isDocked ? 'nav-rail-item__label--sr-only' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {label}
          </span>
        </span>
      )}
    </button>
  );
});

NavRailItem.displayName = 'NavRailItem';
