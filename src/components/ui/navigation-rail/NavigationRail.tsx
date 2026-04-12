import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react';

import { NavigationRailContext } from './navigation-rail-context';
import './navigation-rail.css';

export interface NavigationRailProps
  extends Omit<ComponentPropsWithoutRef<'nav'>, 'children' | 'aria-label'> {
  ariaLabel: string;
  expanded?: boolean;
  children: ReactNode;
}

export const NavigationRail = forwardRef<HTMLElement, NavigationRailProps>(
  function NavigationRail(
    {
      ariaLabel,
      expanded = true,
      children,
      className = '',
      ...navProps
    },
    ref,
  ) {
    const classes = ['navigation-rail', className].filter(Boolean).join(' ');

    return (
      <nav
        ref={ref}
        aria-label={ariaLabel}
        className={classes}
        data-expanded={expanded ? 'true' : 'false'}
        {...navProps}
      >
        <NavigationRailContext.Provider value={{ expanded }}>
          {children}
        </NavigationRailContext.Provider>
      </nav>
    );
  },
);

NavigationRail.displayName = 'NavigationRail';
