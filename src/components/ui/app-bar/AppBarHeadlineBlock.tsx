import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react';

import './app-bar.css';

export type AppBarHeadlineBlockSize = 'small' | 'medium' | 'large';

export interface AppBarHeadlineBlockProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
  headline: ReactNode;
  supportingText?: ReactNode;
  size?: AppBarHeadlineBlockSize;
}

export const AppBarHeadlineBlock = forwardRef<
  HTMLDivElement,
  AppBarHeadlineBlockProps
>(function AppBarHeadlineBlock(
  {
    headline,
    supportingText,
    size = 'small',
    className = '',
    ...divProps
  },
  ref,
) {
  const classes = [
    'app-bar-headline-block',
    `app-bar-headline-block--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={ref} className={classes} {...divProps}>
      <p className="app-bar-headline-block__headline">{headline}</p>
      {supportingText ? (
        <p className="app-bar-headline-block__supporting">{supportingText}</p>
      ) : null}
    </div>
  );
});

AppBarHeadlineBlock.displayName = 'AppBarHeadlineBlock';
