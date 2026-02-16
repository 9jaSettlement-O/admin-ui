/**
 * Standardized API mutation hook with mock service fallback.
 * When mock is enabled or API fails (400/404/502/network), uses mockService.
 */

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { shouldUseMockService } from "@/lib/config";

export interface UseApiMutationOptions<TData, TVariables, TError = Error> {
  mutationFn: (variables: TVariables) => Promise<TData>;
  onSuccess?: (data: TData, variables: TVariables) => void;
  onError?: (error: TError, variables: TVariables) => void;
  showErrorToast?: boolean;
  showSuccessToast?: boolean;
  successMessage?: string;
  mockService?: (variables: TVariables) => Promise<TData>;
  retry?: boolean;
}

export function useApiMutation<TData = unknown, TVariables = unknown, TError = Error>(
  options: UseApiMutationOptions<TData, TVariables, TError>
) {
  const {
    mutationFn,
    onSuccess,
    onError,
    showErrorToast = true,
    showSuccessToast = false,
    successMessage,
    mockService,
    retry = false,
  } = options;

  return useMutation<TData, TError, TVariables>({
    mutationFn: async (variables: TVariables) => {
      try {
        if (shouldUseMockService() && mockService) {
          try {
            return await mockService(variables);
          } catch {
            // Mock failed, try real API
          }
        }
        return await mutationFn(variables);
      } catch (error: unknown) {
        const err = error as { response?: { status?: number } };
        const status = err?.response?.status;
        const isApiError =
          status === 400 ||
          status === 404 ||
          status === 502 ||
          err?.response === undefined;

        if (mockService && (shouldUseMockService() || isApiError)) {
          try {
            return await mockService(variables);
          } catch {
            throw error;
          }
        }
        throw error;
      }
    },
    onSuccess: (data, variables) => {
      if (showSuccessToast && successMessage) {
        toast.success(successMessage);
      }
      onSuccess?.(data, variables);
    },
    onError: (error, variables) => {
      if (showErrorToast) {
        const msg = error instanceof Error ? error.message : "An error occurred";
        toast.error(msg);
      }
      onError?.(error, variables);
    },
    retry,
  });
}
