import type { AxiosInstance } from "axios";

/**
 * Businesses API - stub for future backend integration.
 * Replace with actual endpoints when backend is ready.
 */
export class BusinessesApi {
  constructor(private client: AxiosInstance) {}

  getBusinesses(_params?: { search?: string; kybStatus?: string; country?: string }) {
    return this.client.get("/businesses");
  }

  getBusinessById(id: string) {
    return this.client.get(`/businesses/${id}`);
  }

  approveKyb(businessId: string) {
    return this.client.post(`/businesses/${businessId}/approve-kyb`);
  }

  declineKyb(businessId: string) {
    return this.client.post(`/businesses/${businessId}/decline-kyb`);
  }

  blockBusiness(businessId: string) {
    return this.client.post(`/businesses/${businessId}/block`);
  }

  unblockBusiness(businessId: string) {
    return this.client.post(`/businesses/${businessId}/unblock`);
  }
}
