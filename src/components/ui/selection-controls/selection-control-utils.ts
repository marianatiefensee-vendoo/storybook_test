import type { ForwardedRef } from 'react';

export function assignForwardedRef<T>(
  ref: ForwardedRef<T>,
  value: T | null,
) {
  if (typeof ref === 'function') {
    ref(value);
    return;
  }

  if (ref) {
    ref.current = value;
  }
}

