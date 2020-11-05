import { useCallback, useState } from "react";

export default () => {
  const [, forceUpdate] = useState<boolean>();
  return useCallback(() => forceUpdate((old) => !old), [forceUpdate]);
};
