import {
  forwardRef,
  useId,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react';

import './text-area.css';

export interface TextAreaProps
  extends Omit<ComponentPropsWithoutRef<'textarea'>, 'size'> {
  label: ReactNode;
  supportingText?: ReactNode;
  errorText?: ReactNode;
  invalid?: boolean;
}

/**
 * TextArea
 */
export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextArea(
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
      ...textareaProps
    },
    ref,
  ) {
    const generatedId = useId();
    const textareaId = id ?? generatedId;
    const supportingId = supportingText
      ? `${textareaId}-supporting-text`
      : undefined;
    const errorId = invalid && errorText ? `${textareaId}-error-text` : undefined;
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

    const rootClassNames = ['text-area', className].filter(Boolean).join(' ');
    const stateText = invalid && errorText ? errorText : supportingText;

    return (
      <div
        className={rootClassNames}
        data-disabled={disabled ? 'true' : undefined}
        data-filled={isFilled ? 'true' : undefined}
        data-invalid={invalid ? 'true' : undefined}
      >
        <label
          className="text-area__label"
          htmlFor={textareaId}
          data-disabled={disabled ? 'true' : undefined}
          data-invalid={invalid ? 'true' : undefined}
        >
          {label}
          {required ? (
            <span aria-hidden="true" className="text-area__required">
              *
            </span>
          ) : null}
        </label>
        <div className="text-area__control">
          <textarea
            {...textareaProps}
            ref={ref}
            id={textareaId}
            className="text-area__input"
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
            className="text-area__supporting"
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

TextArea.displayName = 'TextArea';
