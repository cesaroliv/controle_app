import React from 'react';
import { WorkLog } from '../types';
import { calculateLogStats, formatCurrency } from '../utils/calculations';
import { Trash2, Car, Clock } from 'lucide-react';

interface HistoryProps {
  logs: WorkLog[];
  onDelete: (id: string) => void;
}

export const History: React.FC<HistoryProps> = ({ logs, onDelete }) => {
  const sortedLogs = [...logs].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="pb-24 animate-fade-in">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-white">Histórico</h1>
        <p className="text-slate-400 text-sm">Seus registros anteriores</p>
      </header>

      <div className="space-y-4">
        {sortedLogs.length === 0 ? (
          <div className="text-center py-10 text-slate-500">
            Nenhum registro encontrado.
          </div>
        ) : (
          sortedLogs.map(log => {
            const stats = calculateLogStats(log);
            return (
              <div key={log.id} className="bg-slate-800 rounded-xl p-4 border border-slate-700 shadow-sm relative group">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-white font-bold text-lg">{log.date.split('-').reverse().join('/')}</h3>
                    <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                      <span className="flex items-center gap-1"><Clock size={12}/> {stats.hoursWorked.toFixed(1)}h</span>
                      <span className="flex items-center gap-1"><Car size={12}/> {stats.kmDriven.toFixed(0)}km</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="block text-emerald-400 font-bold text-lg">{formatCurrency(stats.netEarnings)}</span>
                    <span className="block text-xs text-slate-500">Lucro Líquido</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs border-t border-slate-700 pt-3">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Bruto:</span>
                    <span className="text-slate-200">{formatCurrency(stats.grossEarnings)}</span>
                  </div>
                   <div className="flex justify-between">
                    <span className="text-slate-400">Combustível:</span>
                    <span className="text-rose-400">-{formatCurrency(stats.fuelCost)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Gastos Extras:</span>
                    <span className="text-rose-400">-{formatCurrency(log.extraExpenses)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">R$/Hora:</span>
                    <span className="text-blue-400">{formatCurrency(stats.hourlyRate)}</span>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    if(confirm('Tem certeza que deseja excluir este registro?')) onDelete(log.id);
                  }}
                  className="absolute top-4 right-[-10px] opacity-0 group-hover:opacity-100 transition-opacity bg-rose-600 text-white p-2 rounded-l-lg shadow-lg"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};