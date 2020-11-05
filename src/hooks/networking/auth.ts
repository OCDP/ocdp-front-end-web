import { useCallback } from "react";
import api from "utils/api";

export function usePostLogin() {
  return useCallback(async <O extends Object>(body?: O, params?: O) => {
   return await api.post("/login/", body, {
      params,
    });
  }, []);
}
