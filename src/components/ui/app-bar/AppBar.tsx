import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react';

import './app-bar.css';

export type AppBarSize = 'small' | 'medium' | 'large';
export type AppBarElevation = 'flat' | 'scrolled';

export interface AppBarProps
  extends Omit<ComponentPropsWithoutRef<'header'>, 'children'> {
  size?: AppBarSize;
  elevation?: AppBarElevation;
  leading?: ReactNode;
  headline?: ReactNode;
  trailing?: ReactNode;
}

export const AppBar = forwardRef<HTMLElement, AppBarProps>(function AppBar(
  {
    size = 'small',
    elevation = 'flat',
    leading,
    headline,
    trailing,
    className = '',
    ...headerProps
  },
  ref,
) {
  const classes = [
    'app-bar',
    `app-bar--${size}`,
    `app-bar--${elevation}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <header
      ref={ref}
      className={classes}
      data-size={size}
      data-elevation={elevation}
      {...headerProps}
    >
      {size === 'small' ? (
        <>
          <div className="app-bar__slot app-bar__slot--leading">{leading}</div>
          <div className="app-bar__headline-slot">{headline}</div>
          <div className="app-bar__slot app-bar__slot--trailing">{trailing}</div>
        </>
      ) : (
        <>
          <div className="app-bar__top-row">
            <div className="app-bar__slot app-bar__slot--leading">{leading}</div>
            <div className="app-bar__slot app-bar__slot--trailing">{trailing}</div>
          </div>
          {headline ? <div className="app-bar__headline-row">{headline}</div> : null}
        </>
      )}
    </header>
  );
});

AppBar.displayName = 'AppBar';
