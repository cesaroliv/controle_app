import React, { useState, useEffect } from 'react';
import { LayoutDashboard, PlusCircle, History as HistoryIcon, Settings as SettingsIcon, Bot } from 'lucide-react';
import { View, WorkLog, Settings as SettingsType } from './types';
import { Dashboard } from './components/Dashboard';
import { EntryForm } from './components/EntryForm';
import { History } from './components/History';
import { Settings } from './components/Settings';
import { AICoach } from './components/AICoach';

const App: React.FC = () => {
  // --- State ---
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);
  
  const [logs, setLogs] = useState<WorkLog[]>(() => {
    const saved = localStorage.getItem('driverLogs');
    return saved ? JSON.parse(saved) : [];
  });

  const [settings, setSettings] = useState<SettingsType>(() => {
    const saved = localStorage.getItem('driverSettings');
    return saved ? JSON.parse(saved) : {
      defaultFuelPrice: 5.89,
      carConsumption: 14.0,
      driverName: 'Motorista'
    };
  });

  // --- Effects ---
  useEffect(() => {
    localStorage.setItem('driverLogs', JSON.stringify(logs));
  }, [logs]);

  useEffect(() => {
    localStorage.setItem('driverSettings', JSON.stringify(settings));
  }, [settings]);

  // --- Handlers ---
  const handleSaveLog = (logData: Omit<WorkLog, 'id'>) => {
    const newLog: WorkLog = {
      ...logData,
      id: crypto.randomUUID()
    };
    setLogs(prev => [...prev, newLog]);
    setCurrentView(View.DASHBOARD);
  };

  const handleDeleteLog = (id: string) => {
    setLogs(prev => prev.filter(l => l.id !== id));
  };

  const handleUpdateSettings = (newSettings: SettingsType) => {
    setSettings(newSettings);
  };

  // --- Navigation Component ---
  const NavButton = ({ view, icon, label }: { view: View; icon: React.ReactNode; label: string }) => (
    <button 
      onClick={() => setCurrentView(view)}
      className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${currentView === view ? 'text-emerald-400' : 'text-slate-500 hover:text-slate-300'}`}
    >
      {icon}
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-emerald-500/30">
      
      {/* Main Content Area */}
      <main className="container mx-auto max-w-md px-4 pt-6 min-h-screen relative">
        {currentView === View.DASHBOARD && <Dashboard logs={logs} />}
        {currentView === View.ADD_ENTRY && (
          <EntryForm 
            onSave={handleSaveLog} 
            settings={settings} 
            lastLog={logs[logs.length - 1]} 
          />
        )}
        {currentView === View.HISTORY && <History logs={logs} onDelete={handleDeleteLog} />}
        {currentView === View.AI_COACH && <AICoach logs={logs} />}
        {currentView === View.SETTINGS && <Settings settings={settings} onSave={handleUpdateSettings} />}
      </main>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-slate-950/90 backdrop-blur-lg border-t border-slate-800 h-16 pb-safe">
        <div className="container mx-auto max-w-md h-full flex items-center justify-between px-2">
          <NavButton view={View.DASHBOARD} icon={<LayoutDashboard size={20} />} label="Início" />
          <NavButton view={View.HISTORY} icon={<HistoryIcon size={20} />} label="Histórico" />
          
          <div className="relative -top-5">
            <button 
              onClick={() => setCurrentView(View.ADD_ENTRY)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white p-4 rounded-full shadow-lg shadow-emerald-900/50 border-4 border-slate-900 transition-transform active:scale-95"
            >
              <PlusCircle size={28} />
            </button>
          </div>

          <NavButton view={View.AI_COACH} icon={<Bot size={20} />} label="Coach IA" />
          <NavButton view={View.SETTINGS} icon={<SettingsIcon size={20} />} label="Ajustes" />
        </div>
      </nav>
    </div>
  );
};

export default App;