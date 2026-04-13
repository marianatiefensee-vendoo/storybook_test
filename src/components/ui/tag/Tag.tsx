import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react';

import './tag.css';

export type TagTone = 'neutral' | 'ai';

export interface TagProps extends Omit<ComponentPropsWithoutRef<'span'>, 'children'> {
  tone?: TagTone;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  children: ReactNode;
}

const toneClassNames: Record<TagTone, string> = {
  neutral: 'tag--neutral',
  ai: 'tag--ai',
};

export const Tag = forwardRef<HTMLSpanElement, TagProps>(function Tag(
  {
    tone = 'neutral',
    leadingIcon,
    trailingIcon,
    children,
    className = '',
    ...spanProps
  },
  ref,
) {
  const classes = ['tag', toneClassNames[tone], className].filter(Boolean).join(' ');

  return (
    <span ref={ref} className={classes} data-tone={tone} {...spanProps}>
      {leadingIcon ? (
        <span aria-hidden="true" className="tag__icon tag__icon--leading">
          {leadingIcon}
        </span>
      ) : null}
      <span className="tag__label">{children}</span>
      {trailingIcon ? (
        <span aria-hidden="true" className="tag__icon tag__icon--trailing">
          {trailingIcon}
        </span>
      ) : null}
    </span>
  );
});

Tag.displayName = 'Tag';
