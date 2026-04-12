import {
  forwardRef,
  useEffect,
  useId,
  useRef,
  type ComponentPropsWithoutRef,
  type ForwardedRef,
  type MutableRefObject,
  type ReactNode,
} from 'react';

import { assignForwardedRef } from './selection-control-utils';
import './selection-controls.css';

export interface CheckboxProps
  extends Omit<ComponentPropsWithoutRef<'input'>, 'type' | 'size'> {
  label: ReactNode;
  supportingText?: ReactNode;
  errorText?: ReactNode;
  invalid?: boolean;
  indeterminate?: boolean;
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

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(
    {
      label,
      supportingText,
      errorText,
      invalid = false,
      indeterminate = false,
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

    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    const supportingId = supportingText ? `${inputId}-supporting-text` : undefined;
    const errorId = invalid && errorText ? `${inputId}-error-text` : undefined;
    const visibleTextId = errorId ?? supportingId;
    const describedBy = [ariaDescribedBy, visibleTextId].filter(Boolean).join(' ') || undefined;
    const isChecked = checked ?? defaultChecked ?? false;
    const stateText = invalid && errorText ? errorText : supportingText;
    const rootClassNames = ['selection-control', 'selection-control--checkbox', className]
      .filter(Boolean)
      .join(' ');

    return (
      <label
        className={rootClassNames}
        data-checked={isChecked ? 'true' : undefined}
        data-disabled={disabled ? 'true' : undefined}
        data-indeterminate={indeterminate ? 'true' : undefined}
        data-invalid={invalid ? 'true' : undefined}
      >
      <input
          {...inputProps}
          ref={setInputRef(ref, inputRef)}
          id={inputId}
          className="selection-control__input"
          type="checkbox"
          disabled={disabled}
          required={required}
          checked={checked}
          defaultChecked={defaultChecked}
        aria-describedby={describedBy}
        aria-labelledby={labelId}
        aria-invalid={invalid ? true : ariaInvalid}
        aria-checked={indeterminate ? 'mixed' : checked ?? defaultChecked}
        onChange={onChange}
      />
        <span className="selection-control__indicator" aria-hidden="true">
          <svg
            className="selection-control__mark selection-control__mark--check"
            viewBox="0 0 20 20"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M5.5 10.25L8.25 13L14.5 6.75"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
          <svg
            className="selection-control__mark selection-control__mark--dash"
            viewBox="0 0 20 20"
            aria-hidden="true"
            focusable="false"
          >
            <rect x="5.5" y="9" width="9" height="2" rx="1" fill="currentColor" />
          </svg>
        </span>
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
      </label>
    );
  },
);

Checkbox.displayName = 'Checkbox';
