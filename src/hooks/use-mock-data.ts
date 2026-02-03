/**
 * Hooks for fetching mock data when mock services are enabled.
 * Uses React Query for caching and loading states.
 */

import { useQuery } from "@tanstack/react-query";
import { shouldUseMockService } from "@/lib/config";
import { mockDataService } from "@/services/mock";

export function useUsers() {
  const useMock = shouldUseMockService();

  return useQuery({
    queryKey: ["users"],
    queryFn: () => mockDataService.getUsers(),
    enabled: useMock,
    staleTime: 5 * 60 * 1000,
  });
}

export function useBusinesses() {
  const useMock = shouldUseMockService();

  return useQuery({
    queryKey: ["businesses"],
    queryFn: () => mockDataService.getBusinesses(),
    enabled: useMock,
    staleTime: 5 * 60 * 1000,
  });
}

export function useTransactions() {
  const useMock = shouldUseMockService();

  return useQuery({
    queryKey: ["transactions"],
    queryFn: () => mockDataService.getTransactions(),
    enabled: useMock,
    staleTime: 5 * 60 * 1000,
  });
}

export function useAgents() {
  const useMock = shouldUseMockService();

  return useQuery({
    queryKey: ["agents"],
    queryFn: () => mockDataService.getAgents(),
    enabled: useMock,
    staleTime: 5 * 60 * 1000,
  });
}

export function useAgentTiers() {
  const useMock = shouldUseMockService();

  return useQuery({
    queryKey: ["agentTiers"],
    queryFn: () => mockDataService.getAgentTiers(),
    enabled: useMock,
    staleTime: 5 * 60 * 1000,
  });
}
