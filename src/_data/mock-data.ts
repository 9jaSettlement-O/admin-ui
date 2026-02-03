/**
 * Mock data for admin dashboard.
 * Used when VITE_USE_MOCK_SERVICES is true or in DEV without API.
 */

/** Extended user for detail view */
export interface MockUserDetail {
  id: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  email: string;
  phone?: string;
  country?: string;
  kycStatus: string;
  accountStatus?: string;
  dob?: string;
  address?: string;
}

/** Users: Nigerians resident in Canada (primary customer base for CAD ↔ NGN) */
export const mockUsers = [
  {
    id: "1",
    firstName: "Chidi",
    lastName: "Okafor",
    email: "chidi.okafo@example.com",
    phone: "+1 416 555 0123",
    country: "Canada",
    kycStatus: "Tier 2 Verified",
  },
  {
    id: "2",
    firstName: "Amara",
    lastName: "Nwosu",
    email: "amara.nwosu@example.com",
    phone: "+1 647 555 0456",
    country: "Canada",
    kycStatus: "Tier 1 Verified",
  },
  {
    id: "3",
    firstName: "Oluwaseun",
    lastName: "Adeyemi",
    email: "seun.adeyemi@example.com",
    phone: "+1 905 555 0789",
    country: "Canada",
    kycStatus: "Awaiting KYC Review",
  },
  {
    id: "4",
    firstName: "Ngozi",
    lastName: "Eze",
    email: "ngozi.eze@example.com",
    phone: "+1 514 555 0321",
    country: "Canada",
    kycStatus: "Unverified",
  },
];

/** Extended user details - Nigerians resident in Canada */
export const mockUserDetails: MockUserDetail[] = [
  {
    id: "1",
    firstName: "Chidi",
    lastName: "Okafor",
    middleName: "Chukwuemeka",
    email: "chidi.okafo@example.com",
    phone: "+1 416 555 0123",
    country: "Canada",
    kycStatus: "Tier 2 Verified",
    accountStatus: "Active",
    dob: "1985-06-15",
    address: "123 Yonge St, Toronto, ON M5C 1W4, Canada",
  },
  {
    id: "2",
    firstName: "Amara",
    lastName: "Nwosu",
    middleName: "Chioma",
    email: "amara.nwosu@example.com",
    phone: "+1 647 555 0456",
    country: "Canada",
    kycStatus: "Tier 1 Verified",
    accountStatus: "Active",
    dob: "1990-03-22",
    address: "456 Bloor St W, Toronto, ON M5S 1X8, Canada",
  },
  {
    id: "3",
    firstName: "Oluwaseun",
    lastName: "Adeyemi",
    middleName: "Tunde",
    email: "seun.adeyemi@example.com",
    phone: "+1 905 555 0789",
    country: "Canada",
    kycStatus: "Awaiting KYC Review",
    accountStatus: "Active",
    dob: "1988-11-08",
    address: "78 King St E, Mississauga, ON L5A 1B2, Canada",
  },
  {
    id: "4",
    firstName: "Ngozi",
    lastName: "Eze",
    email: "ngozi.eze@example.com",
    phone: "+1 514 555 0321",
    country: "Canada",
    kycStatus: "Unverified",
    accountStatus: "Active",
    dob: "1992-07-14",
    address: "12 Rue Sainte-Catherine, Montreal, QC H2X 1Y4, Canada",
  },
];

export const mockBusinesses = [
  {
    id: "1",
    name: "Tech Solutions Ltd",
    email: "admin@techsolutions.com",
    phone: "+234 803 456 7890",
    country: "Nigeria",
    kybStatus: "Verified",
  },
  {
    id: "2",
    name: "Global Innovations Inc",
    email: "contact@globalinnovations.com",
    phone: "+234 805 123 4567",
    country: "Nigeria",
    kybStatus: "Verified",
  },
  {
    id: "3",
    name: "African Trade Partners",
    email: "business@africantrade.com",
    phone: "+254 712 345 6789",
    country: "Kenya",
    kybStatus: "Awaiting KYB Review",
  },
  {
    id: "4",
    name: "West Africa Commerce",
    email: "info@westafricacomm.com",
    phone: "+233 546 123 4567",
    country: "Ghana",
    kybStatus: "Unverified",
  },
];

export const mockVirtualAccounts = [
  { id: "1", accountName: "Chidi Okafor", ownedBy: "Chidi Okafor", dateCreated: "2023-05-15 09:30:00", email: "chidi.okafo@example.com", phoneNumber: "+1 416 555 0123", settlementWallet: "0X1234567890abcdef1234567890abcdef12348989", status: "Active" },
  { id: "2", accountName: "Amara Nwosu", ownedBy: "Amara Nwosu", dateCreated: "2023-05-18 14:22:00", email: "amara.nwosu@example.com", phoneNumber: "+1 647 555 0456", settlementWallet: "0Xabcdef1234567890abcdef1234567890abcdef89", status: "Active" },
  { id: "3", accountName: "Tech Solutions Ltd", ownedBy: "Tech Solutions Ltd", dateCreated: "2023-05-20 11:15:00", email: "tech@techsolutions.ng", phoneNumber: "+234 801 555 0789", settlementWallet: "0X9876543210fedcba9876543210fedcba98765898", status: "Pending" },
];

export const mockSettlements = [
  { id: "1", reference: "SET-001", amount: "₦1,500,000", status: "Completed", date: "2023-05-22", beneficiary: "Chidi Okafor" },
  { id: "2", reference: "SET-002", amount: "₦850,000", status: "Pending", date: "2023-05-23", beneficiary: "Amara Nwosu" },
  { id: "3", reference: "SET-003", amount: "₦2,100,000", status: "Processing", date: "2023-05-21", beneficiary: "Tech Solutions Ltd" },
];

/** Transactions: CAD ↔ NGN (primary), multicurrency in v2 */
export const mockTransactions = [
  { id: "123456", userEmail: "chidi.okafo@example.com", type: "Deposit", sourceAmount: "1,000 CAD", destinationAmount: "₦1,250,000", status: "Completed", date: "2023-05-22" },
  { id: "123457", userEmail: "amara.nwosu@example.com", type: "Withdrawal", sourceAmount: "500 CAD", destinationAmount: "₦625,000", status: "Pending", date: "2023-05-22" },
  { id: "123458", userEmail: "seun.adeyemi@example.com", type: "Transfer", sourceAmount: "750 CAD", destinationAmount: "₦937,500", status: "Completed", date: "2023-05-21" },
  { id: "123459", userEmail: "ngozi.eze@example.com", type: "Deposit", sourceAmount: "2,000 CAD", destinationAmount: "₦2,500,000", status: "Completed", date: "2023-05-21" },
  { id: "123460", userEmail: "chidi.okafo@example.com", type: "Withdrawal", sourceAmount: "1,500 CAD", destinationAmount: "₦1,875,000", status: "Failed", date: "2023-05-20" },
  { id: "123461", userEmail: "amara.nwosu@example.com", type: "Transfer", sourceAmount: "300 CAD", destinationAmount: "₦375,000", status: "Completed", date: "2023-05-20" },
];

export const mockAgents = [
  {
    id: "1",
    email: "agent1@example.com",
    totalTransactions: 245,
    totalVolumeCAD: 125000,
    lifetimeEarnings: 9375,
    earningsThisWeek: 450,
  },
  {
    id: "2",
    email: "agent2@example.com",
    totalTransactions: 189,
    totalVolumeCAD: 95000,
    lifetimeEarnings: 7600,
    earningsThisWeek: 320,
  },
];

export const mockAgentTiers = [
  {
    id: "1",
    tierName: "Bronze Tier",
    minVolume: 1000,
    maxVolume: 5000,
    commissionPerCAD: 0.05,
    duration: "1 year",
    status: "Active",
  },
  {
    id: "2",
    tierName: "Silver Tier",
    minVolume: 5001,
    maxVolume: 15000,
    commissionPerCAD: 0.08,
    duration: "1 year",
    status: "Active",
  },
  {
    id: "3",
    tierName: "Gold Tier",
    minVolume: 15001,
    maxVolume: 50000,
    commissionPerCAD: 0.12,
    duration: "1 year",
    status: "Active",
  },
];

/** Extended business for detail view */
export interface MockBusinessDetail {
  id: string;
  name: string;
  email: string;
  phone?: string;
  country: string;
  kybStatus: string;
  accountStatus?: string;
  registrationNumber?: string;
  businessType?: string;
  owner?: {
    firstName: string;
    middleName?: string;
    lastName: string;
    email: string;
    phone?: string;
    dob?: string;
    address?: string;
  };
}

export const mockBusinessDetails: MockBusinessDetail[] = [
  {
    id: "1",
    name: "Tech Solutions Ltd",
    email: "admin@techsolutions.com",
    phone: "+234 803 456 7890",
    country: "Nigeria",
    kybStatus: "Verified",
    accountStatus: "Active",
    registrationNumber: "RC-123456",
    businessType: "Technology Services",
    owner: {
      firstName: "John",
      middleName: "Chukwu",
      lastName: "Okafor",
      email: "john.okafor@techsolutions.com",
      phone: "+234 803 456 7890",
      dob: "1985-06-15",
      address: "123 Lekki Road, Ikoyi, Lagos, Nigeria",
    },
  },
  {
    id: "2",
    name: "Global Innovations Inc",
    email: "contact@globalinnovations.com",
    phone: "+234 805 123 4567",
    country: "Nigeria",
    kybStatus: "Verified",
    accountStatus: "Active",
    registrationNumber: "RC-789012",
    businessType: "Consulting",
    owner: {
      firstName: "Sarah",
      lastName: "Williams",
      email: "sarah@globalinnovations.com",
      dob: "1990-03-22",
      address: "456 Oak Ave, Lagos, Nigeria",
    },
  },
  {
    id: "3",
    name: "African Trade Partners",
    email: "business@africantrade.com",
    phone: "+254 712 345 6789",
    country: "Kenya",
    kybStatus: "Awaiting KYB Review",
    accountStatus: "Active",
    registrationNumber: "RC-KEN-456",
    businessType: "Trading",
    owner: {
      firstName: "Michael",
      lastName: "Ochieng",
      email: "michael@africantrade.com",
      dob: "1988-11-08",
    },
  },
  {
    id: "4",
    name: "West Africa Commerce",
    email: "info@westafricacomm.com",
    country: "Ghana",
    kybStatus: "Unverified",
    accountStatus: "Active",
  },
];

/** Extended virtual account for detail view */
export interface MockVirtualAccountDetail {
  id: string;
  accountName: string;
  accountNumber: string;
  bankName: string;
  currency: string;
  status: string;
  ownedBy?: string;
  dateCreated?: string;
  email?: string;
  phoneNumber?: string;
  settlementWallet?: string;
}

export const mockVirtualAccountDetails: MockVirtualAccountDetail[] = [
  {
    id: "1",
    accountName: "Chidi Okafor",
    accountNumber: "1234567890",
    bankName: "GTBank",
    currency: "NGN",
    status: "Active",
    ownedBy: "chidi.okafo@example.com",
    dateCreated: "2023-12-01 14:30:00",
    email: "chidi.okafo@example.com",
    phoneNumber: "+1 234 567 8901",
    settlementWallet: "0x1234567890abcdef1234567890abcdef12345678",
  },
  {
    id: "2",
    accountName: "Amara Nwosu",
    accountNumber: "0987654321",
    bankName: "Access Bank",
    currency: "NGN",
    status: "Active",
    ownedBy: "amara.nwosu@example.com",
    dateCreated: "2023-11-15 10:00:00",
  },
  {
    id: "3",
    accountName: "Tech Solutions Ltd",
    accountNumber: "1122334455",
    bankName: "Zenith Bank",
    currency: "NGN",
    status: "Pending",
    ownedBy: "admin@techsolutions.com",
    dateCreated: "2023-12-10 09:00:00",
  },
];

/** Extended agent for detail view */
export interface MockAgentDetail {
  id: string;
  email: string;
  totalTransactions: number;
  totalVolumeCAD: number;
  lifetimeEarnings: number;
  earningsThisWeek: number;
  totalReferredUsers?: number;
  verifiedUsers?: number;
  earningsThisMonth?: number;
  customerDetails?: Array<{
    id: string;
    customerName: string;
    transactionVolume: number;
    commissionEarned: number;
    date: string;
  }>;
}

export const mockAgentDetails: MockAgentDetail[] = [
  {
    id: "1",
    email: "agent1@example.com",
    totalTransactions: 245,
    totalVolumeCAD: 125000,
    lifetimeEarnings: 9375,
    earningsThisWeek: 450,
    totalReferredUsers: 28,
    verifiedUsers: 24,
    earningsThisMonth: 1250,
    customerDetails: [
      { id: "c1", customerName: "Chidi Okafor", transactionVolume: 5000, commissionEarned: 250, date: "2024-01-15" },
      { id: "c2", customerName: "Amara Nwosu", transactionVolume: 8000, commissionEarned: 640, date: "2024-01-14" },
      { id: "c3", customerName: "Oluwaseun Adeyemi", transactionVolume: 3000, commissionEarned: 240, date: "2024-01-12" },
    ],
  },
  {
    id: "2",
    email: "agent2@example.com",
    totalTransactions: 189,
    totalVolumeCAD: 95000,
    lifetimeEarnings: 7600,
    earningsThisWeek: 320,
    totalReferredUsers: 19,
    verifiedUsers: 16,
    earningsThisMonth: 950,
    customerDetails: [
      { id: "c4", customerName: "Ngozi Eze", transactionVolume: 6000, commissionEarned: 480, date: "2024-01-14" },
      { id: "c5", customerName: "Emeka Okoli", transactionVolume: 4500, commissionEarned: 360, date: "2024-01-13" },
    ],
  },
];

/** Super admin mock data */
export const mockAdmins = [
  { id: "1", name: "John Admin", email: "john.admin@9jasettlement.com", permissionLevel: 8, status: "Active", lastLogin: "2023-12-15 14:30:00", createdAt: "2023-01-15", actionsCount: 245 },
  { id: "2", name: "Sarah Manager", email: "sarah.manager@9jasettlement.com", permissionLevel: 6, status: "Active", lastLogin: "2023-12-15 09:15:00", createdAt: "2023-03-20", actionsCount: 189 },
  { id: "3", name: "Mike Support", email: "mike.support@9jasettlement.com", permissionLevel: 3, status: "Inactive", lastLogin: "2023-12-10 16:45:00", createdAt: "2023-06-10", actionsCount: 67 },
  { id: "4", name: "Lisa Reviewer", email: "lisa.reviewer@9jasettlement.com", permissionLevel: 5, status: "Active", lastLogin: "2023-12-15 11:20:00", createdAt: "2023-08-05", actionsCount: 134 },
];

export const mockAdminActions = [
  { id: "1", adminName: "John Admin", adminEmail: "john.admin@9jasettlement.com", action: "Approved KYC for user", target: "amara.nwosu@example.com", timestamp: "2023-12-15 14:25:00", ipAddress: "192.168.1.100", result: "Success" },
  { id: "2", adminName: "Sarah Manager", adminEmail: "sarah.manager@9jasettlement.com", action: "Blocked user account", target: "suspicious.user@example.com", timestamp: "2023-12-15 13:45:00", ipAddress: "192.168.1.101", result: "Success" },
  { id: "3", adminName: "Lisa Reviewer", adminEmail: "lisa.reviewer@9jasettlement.com", action: "Reviewed transaction", target: "TX123456", timestamp: "2023-12-15 12:30:00", ipAddress: "192.168.1.102", result: "Success" },
  { id: "4", adminName: "Mike Support", adminEmail: "mike.support@9jasettlement.com", action: "Attempted to access restricted area", target: "Admin Settings", timestamp: "2023-12-15 10:00:00", ipAddress: "192.168.1.103", result: "Failed" },
];

export const mockLoginSessions = [
  { id: "1", adminName: "John Admin", adminEmail: "john.admin@9jasettlement.com", loginTime: "2023-12-15 14:30:00", logoutTime: "Active", ipAddress: "192.168.1.100", userAgent: "Chrome 120.0.0.0", location: "New York, US" },
  { id: "2", adminName: "Sarah Manager", adminEmail: "sarah.manager@9jasettlement.com", loginTime: "2023-12-15 09:15:00", logoutTime: "2023-12-15 17:30:00", ipAddress: "192.168.1.101", userAgent: "Firefox 121.0.0.0", location: "London, UK" },
  { id: "3", adminName: "Lisa Reviewer", adminEmail: "lisa.reviewer@9jasettlement.com", loginTime: "2023-12-15 11:20:00", logoutTime: "Active", ipAddress: "192.168.1.102", userAgent: "Safari 17.1.2", location: "Toronto, CA" },
];

/** Routes: CAD/NGN primary (v1), multicurrency (v2) */
export const mockRoutes = [
  { id: "1", sourceCurrency: "CAD", destinationCurrency: "NGN", status: "Published", sendEnabled: true, swapEnabled: true, payinPartner: "IFX", payoutPartner: "Flutterwave" },
  { id: "2", sourceCurrency: "NGN", destinationCurrency: "CAD", status: "Published", sendEnabled: true, swapEnabled: true, payinPartner: "Flutterwave", payoutPartner: "IFX" },
  { id: "3", sourceCurrency: "USD", destinationCurrency: "NGN", status: "Published", sendEnabled: true, swapEnabled: true, payinPartner: "Stripe", payoutPartner: "Flutterwave" },
  { id: "4", sourceCurrency: "GBP", destinationCurrency: "NGN", status: "Draft", sendEnabled: true, swapEnabled: false, payinPartner: "Wise", payoutPartner: "Bank Transfer" },
];

/** Country-currency: Canada/NGN primary for Nigerian diaspora */
export const mockCountryCurrencies = [
  { id: "1", country: "Canada", currency: "CAD", payinPartner: "IFX", payoutPartner: "Flutterwave", status: "Active" },
  { id: "2", country: "Nigeria", currency: "NGN", payinPartner: "Flutterwave", payoutPartner: "IFX", status: "Active" },
  { id: "3", country: "Kenya", currency: "KES", payinPartner: "Clear Junction", payoutPartner: "Paystack", status: "Active" },
  { id: "4", country: "Ghana", currency: "GHS", payinPartner: "Flutterwave", payoutPartner: "Bridge", status: "Inactive" },
];
