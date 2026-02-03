export interface UserDTO {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  country?: string;
  kycStatus?: string;
  accountStatus?: string;
}
