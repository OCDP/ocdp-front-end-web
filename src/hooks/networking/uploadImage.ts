import { useCallback } from "react";
import api from "utils/api";

export function usePostImageMessage() {
  return useCallback(async <O extends Object>(body?: {}, params?: O) => {
    return await api.post<{ url: string }>("upload-static/", body, { params });
  }, []);
}
