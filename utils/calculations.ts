import { WorkLog } from '../types';

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export const formatNumber = (value: number, decimals = 1) => {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
};

export const calculateLogStats = (log: WorkLog) => {
  const kmDriven = log.odometerEnd - log.odometerStart;
  const grossEarnings = log.earningsUber + log.earnings99;
  
  // Fuel Cost = (KM / Efficiency) * Price
  const fuelCost = (kmDriven / log.fuelConsumption) * log.fuelPrice;
  const totalExpenses = fuelCost + log.extraExpenses;
  const netEarnings = grossEarnings - totalExpenses;

  // Time calculation
  const start = new Date(`2000-01-01T${log.startTime}`);
  let end = new Date(`2000-01-01T${log.endTime}`);
  
  if (end < start) {
    // Handle overnight shifts
    end = new Date(`2000-01-02T${log.endTime}`);
  }
  
  const diffMs = end.getTime() - start.getTime();
  const hoursWorked = diffMs / (1000 * 60 * 60);

  const hourlyRate = hoursWorked > 0 ? netEarnings / hoursWorked : 0;
  const costPerKm = kmDriven > 0 ? totalExpenses / kmDriven : 0;

  return {
    kmDriven,
    grossEarnings,
    fuelCost,
    totalExpenses,
    netEarnings,
    hoursWorked,
    hourlyRate,
    costPerKm
  };
};

export const getAggregatedStats = (logs: WorkLog[]) => {
  let totalGross = 0;
  let totalNet = 0;
  let totalKM = 0;
  let totalHours = 0;
  let totalExpenses = 0;

  logs.forEach(log => {
    const stats = calculateLogStats(log);
    totalGross += stats.grossEarnings;
    totalNet += stats.netEarnings;
    totalKM += stats.kmDriven;
    totalHours += stats.hoursWorked;
    totalExpenses += stats.totalExpenses;
  });

  const avgHourlyNet = totalHours > 0 ? totalNet / totalHours : 0;
  const costPerKm = totalKM > 0 ? totalExpenses / totalKM : 0;

  return {
    totalGross,
    totalNet,
    totalKM,
    totalHours,
    totalExpenses,
    avgHourlyNet,
    costPerKm
  };
};