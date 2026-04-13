import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react';

import './tag.css';

export type TagTone = 'neutral' | 'ai';

export interface TagProps extends Omit<ComponentPropsWithoutRef<'span'>, 'children'> {
  tone?: TagTone;
  icon?: ReactNode;
  children: ReactNode;
}

const toneClassNames: Record<TagTone, string> = {
  neutral: 'tag--neutral',
  ai: 'tag--ai',
};

export const Tag = forwardRef<HTMLSpanElement, TagProps>(function Tag(
  {
    tone = 'neutral',
    icon,
    children,
    className = '',
    ...spanProps
  },
  ref,
) {
  const classes = ['tag', toneClassNames[tone], className].filter(Boolean).join(' ');

  return (
    <span ref={ref} className={classes} data-tone={tone} {...spanProps}>
      {icon ? (
        <span aria-hidden="true" className="tag__icon">
          {icon}
        </span>
      ) : null}
      <span className="tag__label">{children}</span>
    </span>
  );
});

Tag.displayName = 'Tag';
