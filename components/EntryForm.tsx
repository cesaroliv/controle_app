import React, { useState, useEffect } from 'react';
import { Settings, WorkLog } from '../types';
import { Save, Calculator } from 'lucide-react';

interface EntryFormProps {
  onSave: (log: Omit<WorkLog, 'id'>) => void;
  settings: Settings;
  lastLog?: WorkLog;
}

export const EntryForm: React.FC<EntryFormProps> = ({ onSave, settings, lastLog }) => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  
  // Suggest next start KM based on last end KM
  const [odometerStart, setOdometerStart] = useState<string>(lastLog ? String(lastLog.odometerEnd) : '');
  const [odometerEnd, setOdometerEnd] = useState('');
  
  const [earningsUber, setEarningsUber] = useState('');
  const [earnings99, setEarnings99] = useState('');
  const [trips, setTrips] = useState('');
  const [extraExpenses, setExtraExpenses] = useState('');
  const [fuelPrice, setFuelPrice] = useState(String(settings.defaultFuelPrice));

  const getCurrentTime = () => {
    const now = new Date();
    return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      date,
      startTime,
      endTime,
      odometerStart: Number(odometerStart),
      odometerEnd: Number(odometerEnd),
      earningsUber: Number(earningsUber) || 0,
      earnings99: Number(earnings99) || 0,
      trips: Number(trips) || 0,
      extraExpenses: Number(extraExpenses) || 0,
      fuelPrice: Number(fuelPrice),
      fuelConsumption: settings.carConsumption,
    });
  };

  return (
    <div className="pb-24 animate-fade-in">
       <header className="mb-6">
        <h1 className="text-2xl font-bold text-white">Novo Registro</h1>
        <p className="text-slate-400 text-sm">Preencha os dados do dia</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Date & Time Section */}
        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 space-y-4">
          <h3 className="text-emerald-400 font-semibold text-sm flex items-center gap-2">
            <Calculator size={16} /> Tempo & Distância
          </h3>
          
          <div>
            <label className="block text-xs text-slate-400 mb-1">Data</label>
            <input 
              type="date" 
              required
              value={date} 
              onChange={e => setDate(e.target.value)}
              className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Início (Hora)</label>
              <div className="flex gap-2">
                <input 
                  type="time" 
                  required
                  value={startTime} 
                  onChange={e => setStartTime(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:border-emerald-500 focus:outline-none"
                />
                <button type="button" onClick={() => setStartTime(getCurrentTime())} className="bg-slate-700 px-3 rounded-lg text-xs text-white">Agora</button>
              </div>
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Fim (Hora)</label>
               <div className="flex gap-2">
                <input 
                  type="time" 
                  required
                  value={endTime} 
                  onChange={e => setEndTime(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:border-emerald-500 focus:outline-none"
                />
                <button type="button" onClick={() => setEndTime(getCurrentTime())} className="bg-slate-700 px-3 rounded-lg text-xs text-white">Agora</button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1">KM Inicial</label>
              <input 
                type="number" 
                inputMode="numeric"
                required
                placeholder="Ex: 50100"
                value={odometerStart} 
                onChange={e => setOdometerStart(e.target.value)}
                className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">KM Final</label>
              <input 
                type="number" 
                inputMode="numeric"
                required
                placeholder="Ex: 50350"
                value={odometerEnd} 
                onChange={e => setOdometerEnd(e.target.value)}
                className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Financials Section */}
        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 space-y-4">
           <h3 className="text-emerald-400 font-semibold text-sm flex items-center gap-2">
            <Calculator size={16} /> Financeiro
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Ganhos Uber (R$)</label>
              <input 
                type="number" 
                inputMode="decimal"
                step="0.01"
                placeholder="0,00"
                value={earningsUber} 
                onChange={e => setEarningsUber(e.target.value)}
                className="w-full bg-slate-900 border border-emerald-900/50 text-emerald-400 rounded-lg p-3 focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Ganhos 99 (R$)</label>
              <input 
                type="number" 
                inputMode="decimal"
                step="0.01"
                placeholder="0,00"
                value={earnings99} 
                onChange={e => setEarnings99(e.target.value)}
                className="w-full bg-slate-900 border border-emerald-900/50 text-emerald-400 rounded-lg p-3 focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
               <label className="block text-xs text-slate-400 mb-1">Nº Viagens</label>
              <input 
                type="number" 
                inputMode="numeric"
                placeholder="0"
                value={trips} 
                onChange={e => setTrips(e.target.value)}
                className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>
             <div>
               <label className="block text-xs text-slate-400 mb-1">Preço Gasolina (Hoje)</label>
              <input 
                type="number" 
                inputMode="decimal"
                step="0.01"
                value={fuelPrice} 
                onChange={e => setFuelPrice(e.target.value)}
                className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
             <label className="block text-xs text-slate-400 mb-1">Gastos Extras (R$)</label>
              <input 
                type="number" 
                inputMode="decimal"
                step="0.01"
                placeholder="Lanche, água, lavagem..."
                value={extraExpenses} 
                onChange={e => setExtraExpenses(e.target.value)}
                className="w-full bg-slate-900 border border-rose-900/50 text-rose-400 rounded-lg p-3 focus:border-rose-500 focus:outline-none"
              />
          </div>
        </div>

        <button 
          type="submit" 
          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95"
        >
          <Save size={20} />
          Salvar Dia
        </button>

      </form>
    </div>
  );
};