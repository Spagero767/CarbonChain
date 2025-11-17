export type CarbonCredit = {
  id: string;
  projectId: string;
  projectName: string;
  vintage: number;
  status: 'Issued' | 'Retired' | 'For Sale';
  issuedDate: string;
  retiredDate: string | null;
  amount: number; // in tCO2e
};

export type IoTDevice = {
  id: string;
  projectId: string;
  projectName: string;
  status: 'Online' | 'Offline';
  lastPing: string;
  type: 'Forestry Sensor' | 'Energy Meter' | 'Water Flow Meter';
};

export type DashboardStats = {
  totalCredits: number;
  creditsRetired: number;
  activeProjects: number;
  fraudAlerts: number;
};

export type CarbonFootprintData = {
  month: string;
  '2023': number;
  '2024': number;
};

export type PortfolioDistributionData = {
  projectType: string;
  value: number;
  fill: string;
};
