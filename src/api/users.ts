import type { AxiosInstance } from "axios";

/**
 * Users API - stub for future backend integration.
 * Replace with actual endpoints when backend is ready.
 */
export class UsersApi {
  constructor(private client: AxiosInstance) {}

  getUsers(_params?: { search?: string; kycStatus?: string; country?: string }) {
    return this.client.get("/users");
  }

  getUserById(id: string) {
    return this.client.get(`/users/${id}`);
  }

  approveKyc(userId: string) {
    return this.client.post(`/users/${userId}/approve-kyc`);
  }

  blockUser(userId: string) {
    return this.client.post(`/users/${userId}/block`);
  }

  unblockUser(userId: string) {
    return this.client.post(`/users/${userId}/unblock`);
  }
}
