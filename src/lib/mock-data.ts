import type { CarbonCredit, IoTDevice, DashboardStats, CarbonFootprintData, PortfolioDistributionData } from './types';

export const dashboardStats: DashboardStats = {
  totalCredits: 12580,
  creditsRetired: 4520,
  activeProjects: 12,
  fraudAlerts: 3,
};

export const carbonCredits: CarbonCredit[] = [
  { id: 'CC001', projectId: 'P01', projectName: 'Amazon Rainforest Conservation', vintage: 2023, status: 'Issued', issuedDate: '2023-01-15', retiredDate: null, amount: 5000 },
  { id: 'CC002', projectId: 'P02', projectName: 'Sahara Solar Farm', vintage: 2022, status: 'Retired', issuedDate: '2022-03-20', retiredDate: '2023-11-01', amount: 2500 },
  { id: 'CC003', projectId: 'P03', projectName: 'Himalayan Wind Power', vintage: 2023, status: 'For Sale', issuedDate: '2023-05-10', retiredDate: null, amount: 3000 },
  { id: 'CC004', projectId: 'P01', projectName: 'Amazon Rainforest Conservation', vintage: 2024, status: 'Issued', issuedDate: '2024-02-28', retiredDate: null, amount: 2080 },
  { id: 'CC005', projectId: 'P04', projectName: 'Indonesian Peatland Restoration', vintage: 2022, status: 'Retired', issuedDate: '2022-06-01', retiredDate: '2024-01-20', amount: 2020 },
  { id: 'CC006', projectId: 'P02', projectName: 'Sahara Solar Farm', vintage: 2023, status: 'Issued', issuedDate: '2023-08-12', retiredDate: null, amount: 1500 },
];

export const iotDevices: IoTDevice[] = [
  { id: 'IOT-A-001', projectId: 'P01', projectName: 'Amazon Rainforest Conservation', status: 'Online', lastPing: '2024-05-20T10:00:00Z', type: 'Forestry Sensor' },
  { id: 'IOT-A-002', projectId: 'P01', projectName: 'Amazon Rainforest Conservation', status: 'Online', lastPing: '2024-05-20T10:01:00Z', type: 'Forestry Sensor' },
  { id: 'IOT-B-001', projectId: 'P02', projectName: 'Sahara Solar Farm', status: 'Offline', lastPing: '2024-05-19T08:30:00Z', type: 'Energy Meter' },
  { id: 'IOT-C-001', projectId: 'P03', projectName: 'Himalayan Wind Power', status: 'Online', lastPing: '2024-05-20T09:58:00Z', type: 'Energy Meter' },
  { id: 'IOT-D-001', projectId: 'P04', projectName: 'Indonesian Peatland Restoration', status: 'Online', lastPing: '2024-05-20T09:59:00Z', type: 'Water Flow Meter' },
];

export const carbonFootprintData: CarbonFootprintData[] = [
    { month: 'Jan', '2023': 4000, '2024': 2400 },
    { month: 'Feb', '2023': 3000, '2024': 1398 },
    { month: 'Mar', '2023': 2000, '2024': 3800 },
    { month: 'Apr', '2023': 2780, '2024': 3908 },
    { month: 'May', '2023': 1890, '2024': 4800 },
    { month: 'Jun', '2023': 2390, '2024': 3800 },
    { month: 'Jul', '2023': 3490, '2024': 4300 },
];

export const portfolioDistributionData: PortfolioDistributionData[] = [
    { projectType: 'Forestry', value: 45, fill: 'var(--color-chart-1)' },
    { projectType: 'Renewable Energy', value: 35, fill: 'var(--color-chart-2)' },
    { projectType: 'Peatland', value: 20, fill: 'var(--color-chart-3)' },
];
