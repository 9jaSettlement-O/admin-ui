/**
 * Mock data for admin dashboard.
 * Used when VITE_USE_MOCK_SERVICES is true or in DEV without API.
 */

export const mockUsers = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 8901",
    country: "United States",
    kycStatus: "Tier 2 Verified",
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    phone: "+1 234 567 8902",
    country: "Canada",
    kycStatus: "Tier 1 Verified",
  },
  {
    id: "3",
    firstName: "Michael",
    lastName: "Johnson",
    email: "michael.johnson@example.com",
    phone: "+1 234 567 8903",
    country: "United Kingdom",
    kycStatus: "Awaiting KYC Review",
  },
  {
    id: "4",
    firstName: "Emily",
    lastName: "Williams",
    email: "emily.williams@example.com",
    phone: "+1 234 567 8904",
    country: "Australia",
    kycStatus: "Unverified",
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
];

export const mockTransactions = [
  {
    id: "123456",
    userEmail: "john.doe@example.com",
    type: "Deposit",
    sourceAmount: "$1,000.00",
    destinationAmount: "$1,000.00",
    status: "Completed",
    date: "2023-05-22",
  },
  {
    id: "123457",
    userEmail: "jane.smith@example.com",
    type: "Withdrawal",
    sourceAmount: "$500.00",
    destinationAmount: "$495.00",
    status: "Pending",
    date: "2023-05-22",
  },
  {
    id: "123458",
    userEmail: "michael.johnson@example.com",
    type: "Transfer",
    sourceAmount: "$750.00",
    destinationAmount: "$742.50",
    status: "Completed",
    date: "2023-05-21",
  },
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
];
