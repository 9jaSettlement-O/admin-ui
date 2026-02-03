/**
 * Mock data service for dashboard entities.
 * Returns mock data with simulated API delay.
 */

import {
  mockUsers,
  mockUserDetails,
  mockBusinesses,
  mockBusinessDetails,
  mockTransactions,
  mockAgents,
  mockAgentDetails,
  mockAgentTiers,
  mockVirtualAccounts,
  mockVirtualAccountDetails,
  mockSettlements,
} from "@/_data/mock-data";

const MOCK_DELAY_MS = 400;

function delay(ms = MOCK_DELAY_MS): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const mockDataService = {
  async getUsers() {
    await delay();
    return mockUsers;
  },

  async getBusinesses() {
    await delay();
    return mockBusinesses;
  },

  async getTransactions() {
    await delay();
    return mockTransactions;
  },

  async getAgents() {
    await delay();
    return mockAgents;
  },

  async getAgentTiers() {
    await delay();
    return mockAgentTiers;
  },

  async getUserById(id: string) {
    await delay();
    return mockUsers.find((u) => u.id === id) ?? null;
  },

  async getUserDetailById(id: string) {
    await delay();
    return mockUserDetails.find((u) => u.id === id) ?? null;
  },

  async getVirtualAccounts() {
    await delay();
    return mockVirtualAccounts;
  },

  async getSettlements() {
    await delay();
    return mockSettlements;
  },

  async getBusinessById(id: string) {
    await delay();
    return mockBusinesses.find((b) => b.id === id) ?? null;
  },

  async getBusinessDetailById(id: string) {
    await delay();
    return mockBusinessDetails.find((b) => b.id === id) ?? null;
  },

  async getTransactionById(id: string) {
    await delay();
    return mockTransactions.find((t) => t.id === id) ?? null;
  },

  async getAgentById(id: string) {
    await delay();
    return mockAgents.find((a) => a.id === id) ?? null;
  },

  async getAgentDetailById(id: string) {
    await delay();
    return mockAgentDetails.find((a) => a.id === id) ?? null;
  },

  async getVirtualAccountById(id: string) {
    await delay();
    return mockVirtualAccounts.find((a) => a.id === id) ?? null;
  },

  async getVirtualAccountDetailById(id: string) {
    await delay();
    return mockVirtualAccountDetails.find((a) => a.id === id) ?? null;
  },

  async getSettlementById(id: string) {
    await delay();
    return mockSettlements.find((s) => s.id === id) ?? null;
  },
};
