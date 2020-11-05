import { useEffect, useCallback } from "react";

export default function (effect: () => void | Promise<void>) {
  const mountEffect = useCallback(() => {
    effect();
  }, [effect]);
  useEffect(mountEffect, []);
}
