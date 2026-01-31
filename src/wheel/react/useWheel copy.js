import { useEffect, useRef } from "react";
import createWheel from "../core/createWheel";

export function useWheel(options) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const wheel = createWheel(ref.current, options);

    return () => {
      wheel?.destroy();
    };
  }, []);

  return ref;
}