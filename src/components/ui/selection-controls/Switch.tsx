import {
  forwardRef,
  useId,
  useRef,
  type ComponentPropsWithoutRef,
  type ForwardedRef,
  type MutableRefObject,
  type ReactNode,
} from 'react';

import { Icon } from '../icon/Icon';
import { assignForwardedRef } from './selection-control-utils';
import './selection-controls.css';

export interface SwitchProps
  extends Omit<ComponentPropsWithoutRef<'input'>, 'type' | 'size'> {
  label: ReactNode;
  supportingText?: ReactNode;
  errorText?: ReactNode;
  invalid?: boolean;
}

function setInputRef(
  forwardedRef: ForwardedRef<HTMLInputElement>,
  localRef: MutableRefObject<HTMLInputElement | null>,
) {
  return (node: HTMLInputElement | null) => {
    localRef.current = node;
    assignForwardedRef(forwardedRef, node);
  };
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  {
    label,
    supportingText,
    errorText,
    invalid = false,
    id,
    className = '',
    disabled = false,
    required,
    checked,
    defaultChecked,
    'aria-describedby': ariaDescribedBy,
    'aria-invalid': ariaInvalid,
    onChange,
    ...inputProps
  },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const labelId = `${inputId}-label`;
  const supportingId = supportingText ? `${inputId}-supporting-text` : undefined;
  const errorId = invalid && errorText ? `${inputId}-error-text` : undefined;
  const visibleTextId = errorId ?? supportingId;
  const describedBy = [ariaDescribedBy, visibleTextId].filter(Boolean).join(' ') || undefined;
  const isChecked = checked ?? defaultChecked ?? false;
  const stateText = invalid && errorText ? errorText : supportingText;
  const rootClassNames = ['selection-control', 'selection-control--switch', className]
    .filter(Boolean)
    .join(' ');

  return (
    <label
      className={rootClassNames}
      data-checked={isChecked ? 'true' : undefined}
      data-disabled={disabled ? 'true' : undefined}
      data-invalid={invalid ? 'true' : undefined}
    >
      <input
        {...inputProps}
        ref={setInputRef(ref, inputRef)}
        id={inputId}
        className="selection-control__input"
        type="checkbox"
        role="switch"
        disabled={disabled}
        required={required}
        checked={checked}
        defaultChecked={defaultChecked}
        aria-describedby={describedBy}
        aria-labelledby={labelId}
        aria-invalid={invalid ? true : ariaInvalid}
        onChange={onChange}
      />
      <span className="selection-control__content">
        <span className="selection-control__label" id={labelId}>
          {label}
          {required ? <span aria-hidden="true"> *</span> : null}
        </span>
        {stateText ? (
          <span
            className="selection-control__supporting"
            id={visibleTextId}
            data-invalid={invalid ? 'true' : undefined}
            data-disabled={disabled ? 'true' : undefined}
          >
            {stateText}
          </span>
        ) : null}
      </span>
      <span className="selection-control__switch" aria-hidden="true">
        <span className="selection-control__switch-thumb">
          <Icon
            name={isChecked ? 'check' : 'x'}
            className="selection-control__switch-icon"
          />
        </span>
      </span>
    </label>
  );
});

Switch.displayName = 'Switch';
