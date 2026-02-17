import React, { useState } from 'react';
import { WorkLog } from '../types';
import { analyzePerformance } from '../services/geminiService';
import { Bot, Sparkles, AlertCircle } from 'lucide-react';

interface AICoachProps {
  logs: WorkLog[];
}

export const AICoach: React.FC<AICoachProps> = ({ logs }) => {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalysis = async () => {
    if (logs.length < 3) {
      setAnalysis("Preciso de pelo menos 3 dias de registros para fazer uma análise precisa.");
      return;
    }
    setLoading(true);
    const result = await analyzePerformance(logs);
    setAnalysis(result);
    setLoading(false);
  };

  return (
    <div className="pb-24 animate-fade-in">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          Coach IA <Bot className="text-emerald-400" />
        </h1>
        <p className="text-slate-400 text-sm">Inteligência Artificial para otimizar seus ganhos</p>
      </header>

      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 text-center">
        {!analysis && !loading && (
          <div className="py-8">
            <Sparkles className="mx-auto text-emerald-400 mb-4" size={48} />
            <h3 className="text-white font-bold text-lg mb-2">Análise de Desempenho</h3>
            <p className="text-slate-400 text-sm mb-6">
              Vou analisar seus últimos dias de trabalho e identificar padrões para aumentar seu lucro por hora e reduzir custos.
            </p>
            <button 
              onClick={handleAnalysis}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all"
            >
              Gerar Análise
            </button>
          </div>
        )}

        {loading && (
          <div className="py-12 space-y-4">
             <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
             <p className="text-slate-300 animate-pulse">Consultando a IA...</p>
          </div>
        )}

        {analysis && !loading && (
          <div className="text-left animate-fade-in">
             <div className="flex items-center gap-2 mb-4 text-emerald-400 font-semibold">
               <Sparkles size={20} /> Resultado da Análise
             </div>
             <div className="prose prose-invert prose-sm max-w-none text-slate-300">
                <div dangerouslySetInnerHTML={{ __html: analysis.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
             </div>
             <button 
              onClick={() => setAnalysis(null)}
              className="mt-6 text-sm text-slate-500 underline"
            >
              Nova análise
            </button>
          </div>
        )}
      </div>

      <div className="mt-6 bg-blue-900/20 p-4 rounded-lg border border-blue-900/50 flex gap-3">
        <AlertCircle className="text-blue-400 shrink-0" size={20} />
        <p className="text-xs text-blue-200">
          A IA utiliza seus dados de odômetro, horas e ganhos para calcular a eficiência real. Nenhuma informação pessoal é compartilhada.
        </p>
      </div>
    </div>
  );
};