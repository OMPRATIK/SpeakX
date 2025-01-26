import { useEffect, useState } from "react";

export default function useDebounce<T>(duration: number, value: T) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(
    function () {
      const timer = setTimeout(() => {
        setDebouncedValue(value);
      }, duration);

      return () => {
        clearTimeout(timer);
      };
    },
    [value, duration]
  );

  return debouncedValue;
}
