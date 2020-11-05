import { useEffect, useCallback } from "react";

export default function (effect: () => void) {
  const unmountEffect = useCallback(() => effect, [effect]);
  useEffect(unmountEffect, []);
}
