import React, { useState } from 'react';
import { Settings as SettingsType } from '../types';
import { Save, Settings as SettingsIcon } from 'lucide-react';

interface SettingsProps {
  settings: SettingsType;
  onSave: (newSettings: SettingsType) => void;
}

export const Settings: React.FC<SettingsProps> = ({ settings, onSave }) => {
  const [formState, setFormState] = useState(settings);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formState);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="pb-24 animate-fade-in">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-white">Configurações</h1>
        <p className="text-slate-400 text-sm">Ajuste os parâmetros do seu carro</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 space-y-6">
          <div className="flex items-center gap-3 mb-4 text-emerald-400">
            <SettingsIcon size={24} />
            <h3 className="font-bold">Parâmetros Padrão</h3>
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-2">Nome do Motorista</label>
            <input 
              type="text" 
              value={formState.driverName}
              onChange={e => setFormState({...formState, driverName: e.target.value})}
              className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-2">Consumo do Carro (km/l)</label>
            <p className="text-xs text-slate-500 mb-2">Usado para calcular automaticamente o custo do combustível.</p>
            <input 
              type="number" 
              step="0.1"
              value={formState.carConsumption}
              onChange={e => setFormState({...formState, carConsumption: Number(e.target.value)})}
              className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div>
             <label className="block text-sm text-slate-300 mb-2">Preço Padrão Gasolina (R$)</label>
             <p className="text-xs text-slate-500 mb-2">Preço sugerido ao abrir um novo registro.</p>
             <input 
              type="number" 
              step="0.01"
              value={formState.defaultFuelPrice}
              onChange={e => setFormState({...formState, defaultFuelPrice: Number(e.target.value)})}
              className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:border-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        <button 
          type="submit" 
          className={`w-full font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all ${saved ? 'bg-emerald-700 text-emerald-100' : 'bg-emerald-600 hover:bg-emerald-500 text-white'}`}
        >
          {saved ? 'Salvo com Sucesso!' : <><Save size={20} /> Salvar Configurações</>}
        </button>
      </form>
    </div>
  );
};