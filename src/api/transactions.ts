import type { AxiosInstance } from "axios";

/**
 * Transactions API - stub for future backend integration.
 * Replace with actual endpoints when backend is ready.
 */
export class TransactionsApi {
  constructor(private client: AxiosInstance) {}

  getTransactions(_params?: { search?: string; type?: string; status?: string }) {
    return this.client.get("/transactions");
  }

  getTransactionById(id: string) {
    return this.client.get(`/transactions/${id}`);
  }

  updateTransactionStatus(transactionId: string, status: string) {
    return this.client.patch(`/transactions/${transactionId}/status`, { status });
  }
}
