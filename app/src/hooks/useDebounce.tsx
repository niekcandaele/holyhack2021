import * as React from 'react';

export function useDebounce(value: number, delay: number): number {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    /*
      Cancel the timeout if value changes (also on delay change or unmount)
      This is how we prevent debounced value from updating if value is changed
      within the delay period. Timeout gets cleared and restarted.
    */
    return (): void => {
      clearTimeout(handler);
    };
  }, [value, delay]); // only recall if value or delay changes.

  return debouncedValue;
}
