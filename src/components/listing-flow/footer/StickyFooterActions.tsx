import { type ComponentPropsWithoutRef, type ReactNode } from 'react';

import { Button } from '../../ui/button/Button';
import '../listing-flow.css';

export interface StickyFooterActionsProps
  extends Omit<ComponentPropsWithoutRef<'footer'>, 'children'> {
  leadingText?: ReactNode;
  secondaryActionLabel: ReactNode;
  primaryActionLabel: ReactNode;
  onSecondaryAction?: () => void;
  onPrimaryAction?: () => void;
}

export function StickyFooterActions({
  leadingText,
  secondaryActionLabel,
  primaryActionLabel,
  onSecondaryAction,
  onPrimaryAction,
  className = '',
  ...footerProps
}: StickyFooterActionsProps) {
  return (
    <footer className={['listing-flow-footer', className].filter(Boolean).join(' ')} {...footerProps}>
      <div className="listing-flow-footer__copy">{leadingText}</div>
      <div className="listing-flow-footer__actions">
        <Button variant="outline" size="small" onClick={() => onSecondaryAction?.()}>
          {secondaryActionLabel}
        </Button>
        <Button variant="filled" size="small" onClick={() => onPrimaryAction?.()}>
          {primaryActionLabel}
        </Button>
      </div>
    </footer>
  );
}

