import { useCallback } from "react";
import api from "utils/api";

export function usePostFlow() {
  return useCallback(
    async <O extends Object>(botId?: string, body?: O, params?: O) => {
      await api.post(`/bot/${botId}/flow/`, body, {
        params,
      });
    },
    []
  );
}

export function usePatchFlow() {
  return useCallback(
    async <O extends Object>(
      botId?: string,
      flowId?: string,
      body?: O,
      params?: O
    ) => {
      await api.patch<Pick<Models.FlowReq, "name" | "content_edit">>(
        `/bot/${botId}/flow/${flowId}/`,
        body,
        {
          params,
        }
      );
    },
    []
  );
}

export function useGetFlow() {
  return useCallback(async (botId?: string, flowId?: string) => {
    return await api.get<Models.FlowReq>(`/bot/${botId}/flow/${flowId}/`);
  }, []);
}

export function useGetFlows() {
  return useCallback(async <O extends Object>(params?: O) => {
    return await api.get("/bot/", {
      params,
    });
  }, []);
}
