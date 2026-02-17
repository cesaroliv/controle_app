export interface WorkLog {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  odometerStart: number;
  odometerEnd: number;
  earningsUber: number;
  earnings99: number;
  trips: number;
  fuelPrice: number; // Snapshot of price at entry time
  fuelConsumption: number; // Snapshot of car efficiency at entry time
  extraExpenses: number;
  notes?: string;
}

export interface Settings {
  defaultFuelPrice: number;
  carConsumption: number; // km/l
  driverName: string;
}

export interface Stats {
  totalGross: number;
  totalNet: number;
  totalKM: number;
  totalHours: number;
  totalExpenses: number;
  avgHourlyNet: number;
  costPerKm: number;
}

export enum View {
  DASHBOARD = 'DASHBOARD',
  ADD_ENTRY = 'ADD_ENTRY',
  HISTORY = 'HISTORY',
  SETTINGS = 'SETTINGS',
  AI_COACH = 'AI_COACH'
}