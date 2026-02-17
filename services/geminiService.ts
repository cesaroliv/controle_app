import { GoogleGenAI } from "@google/genai";
import { WorkLog } from "../types";
import { calculateLogStats } from "../utils/calculations";

export const analyzePerformance = async (logs: WorkLog[]): Promise<string> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    return "Chave da API não configurada. Por favor, verifique suas variáveis de ambiente.";
  }

  const ai = new GoogleGenAI({ apiKey });

  // Prepare a summary of the last 7 logs for the AI
  const recentLogs = logs.slice(0, 7).map(log => {
    const stats = calculateLogStats(log);
    return `
    Data: ${log.date}
    Horas: ${stats.hoursWorked.toFixed(1)}h
    KM: ${stats.kmDriven.toFixed(1)}km
    Faturamento Uber: R$${log.earningsUber.toFixed(2)}
    Faturamento 99: R$${log.earnings99.toFixed(2)}
    Gastos Totais: R$${stats.totalExpenses.toFixed(2)}
    Lucro Líquido: R$${stats.netEarnings.toFixed(2)}
    Lucro/Hora: R$${stats.hourlyRate.toFixed(2)}
    `;
  }).join('\n---\n');

  const prompt = `
  Atue como um especialista em gestão financeira para motoristas de aplicativo (Uber/99).
  Analise os seguintes dados dos últimos dias de trabalho do motorista:

  ${recentLogs}

  Forneça uma análise concisa e direta (máximo 2 parágrafos) cobrindo:
  1. Eficiência (R$/km e R$/hora).
  2. Identificação de dias ruins ou bons.
  3. Uma dica prática para melhorar o lucro baseada nestes números.
  
  Use formatação Markdown simples. Seja motivador mas realista.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "Não foi possível gerar a análise no momento.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Erro ao conectar com a Inteligência Artificial. Tente novamente mais tarde.";
  }
};