import {
  forwardRef,
  useId,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react';

import './text-field.css';

export interface TextFieldProps
  extends Omit<ComponentPropsWithoutRef<'input'>, 'size'> {
  label: ReactNode;
  supportingText?: ReactNode;
  errorText?: ReactNode;
  invalid?: boolean;
}

/**
 * TextField
 */
export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField(
    {
      label,
      supportingText,
      errorText,
      invalid = false,
      id,
      className = '',
      disabled = false,
      required,
      value,
      defaultValue,
      'aria-describedby': ariaDescribedBy,
      'aria-invalid': ariaInvalid,
      ...inputProps
    },
    ref,
  ) {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const supportingId = supportingText
      ? `${inputId}-supporting-text`
      : undefined;
    const errorId = invalid && errorText ? `${inputId}-error-text` : undefined;
    const visibleTextId = errorId ?? supportingId;
    const describedBy = [ariaDescribedBy, visibleTextId]
      .filter(Boolean)
      .join(' ') || undefined;
    const isFilled =
      value != null
        ? String(value).length > 0
        : defaultValue != null
          ? String(defaultValue).length > 0
          : false;

    const rootClassNames = ['text-field', className].filter(Boolean).join(' ');
    const stateText = invalid && errorText ? errorText : supportingText;

    return (
      <div
        className={rootClassNames}
        data-disabled={disabled ? 'true' : undefined}
        data-filled={isFilled ? 'true' : undefined}
        data-invalid={invalid ? 'true' : undefined}
      >
        <label
          className="text-field__label"
          htmlFor={inputId}
          data-disabled={disabled ? 'true' : undefined}
          data-invalid={invalid ? 'true' : undefined}
        >
          {label}
          {required ? (
            <span aria-hidden="true" className="text-field__required">
              *
            </span>
          ) : null}
        </label>
        <div className="text-field__control">
          <input
            {...inputProps}
            ref={ref}
            id={inputId}
            className="text-field__input"
            disabled={disabled}
            required={required}
            aria-describedby={describedBy}
            aria-invalid={invalid ? true : ariaInvalid}
            data-filled={isFilled ? 'true' : undefined}
            data-invalid={invalid ? 'true' : undefined}
            data-disabled={disabled ? 'true' : undefined}
          />
        </div>
        {stateText ? (
          <div
            className="text-field__supporting"
            id={visibleTextId}
            data-invalid={invalid ? 'true' : undefined}
            data-disabled={disabled ? 'true' : undefined}
          >
            {stateText}
          </div>
        ) : null}
      </div>
    );
  },
);

TextField.displayName = 'TextField';
