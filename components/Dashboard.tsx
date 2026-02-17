import React from 'react';
import { WorkLog } from '../types';
import { getAggregatedStats, formatCurrency } from '../utils/calculations';
import { StatCard } from './ui/StatCard';
import { DollarSign, Clock, Navigation, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface DashboardProps {
  logs: WorkLog[];
}

export const Dashboard: React.FC<DashboardProps> = ({ logs }) => {
  const stats = getAggregatedStats(logs);

  // Prepare chart data (Last 7 entries)
  const chartData = logs.slice(-7).map(log => {
    const dayStats = calculateLogStats(log);
    return {
      name: log.date.split('-').slice(1).reverse().join('/'), // DD/MM
      net: dayStats.netEarnings,
      gross: dayStats.grossEarnings
    };
  });

  return (
    <div className="space-y-6 pb-24 animate-fade-in">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-white">Visão Geral</h1>
        <p className="text-slate-400 text-sm">Resumo do seu desempenho</p>
      </header>

      <div className="grid grid-cols-2 gap-4">
        <StatCard 
          label="Lucro Líquido" 
          value={formatCurrency(stats.totalNet)}
          subValue="Total acumulado"
          icon={<DollarSign size={20} />}
          color="emerald"
        />
         <StatCard 
          label="Ganhos/Hora" 
          value={formatCurrency(stats.avgHourlyNet)}
          subValue="Média real"
          icon={<TrendingUp size={20} />}
          color="blue"
        />
        <StatCard 
          label="KM Rodados" 
          value={`${stats.totalKM.toFixed(0)} km`}
          subValue={`Custo: ${formatCurrency(stats.costPerKm)}/km`}
          icon={<Navigation size={20} />}
          color="slate"
        />
        <StatCard 
          label="Horas" 
          value={`${stats.totalHours.toFixed(1)}h`}
          subValue="Trabalhadas"
          icon={<Clock size={20} />}
          color="slate"
        />
      </div>

      <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
        <h3 className="text-white font-semibold mb-4 text-sm">Faturamento vs Lucro (Últimos 7 dias)</h3>
        <div className="h-64 w-full">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `R$${value}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                  cursor={{fill: 'transparent'}}
                />
                <Bar dataKey="gross" fill="#334155" radius={[4, 4, 0, 0]} name="Bruto" />
                <Bar dataKey="net" fill="#10b981" radius={[4, 4, 0, 0]} name="Líquido" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
             <div className="h-full flex items-center justify-center text-slate-500 text-sm">
               Sem dados suficientes
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper for local calculation
import { calculateLogStats } from '../utils/calculations';