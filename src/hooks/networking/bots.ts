import { useCallback } from "react";
import api from "utils/api";

export function usePostBot() {
  return useCallback(async <O extends Object>(body?: O, params?: O) => {
    await api.post("/bot/", body, {
      params,
    });
  }, []);
}

export function useGetBot() {
  return useCallback(async (id?: string) => {
    return await api.get<Models.Bot>(`/bot/${id}`);
  }, []);
}

export function useGetBots() {
  return useCallback(async <O extends Object>(params?: O) => {
    return await api.get("/bot/", {
      params,
    });
  }, []);
}
