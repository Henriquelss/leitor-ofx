import { useMemo } from 'react';
import type { Transaction } from '../types/Transaction';
import { formatCurrency, formatDate } from '../../../utils/formatters';

interface Props {
  transactions: Transaction[];
}

function getCategoryColor(category: string): string {
  const lower = category.toLowerCase();
  if (lower.includes('assinatura') || lower.includes('software')) return 'bg-blue-50 text-blue-600';
  if (lower.includes('receita') || lower.includes('dividendo')) return 'bg-emerald-50 text-emerald-600';
  if (lower.includes('transporte')) return 'bg-purple-50 text-purple-600';
  if (lower.includes('alimentação') || lower.includes('alimentacao')) return 'bg-orange-50 text-orange-600';
  if (lower.includes('compra')) return 'bg-pink-50 text-pink-600';
  if (lower.includes('saúde') || lower.includes('saude')) return 'bg-teal-50 text-teal-600';
  if (lower.includes('transferência') || lower.includes('transferencia')) return 'bg-sky-50 text-sky-600';
  
  return 'bg-slate-100 text-slate-600';
}

export default function TransactionsTable({ transactions }: Props) {
  const summary = useMemo(() => {
    let credits = 0;
    let debits = 0;

    transactions.forEach(t => {
      if (t.amount > 0) credits += t.amount;
      else debits += t.amount;
    });

    return {
      credits,
      debits,
      balance: credits + debits
    };
  }, [transactions]);

  return (
    <div className="animate-[fadeIn_0.4s_ease-out]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-slate-50">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">TOTAL CRÉDITOS</div>
          <div className="text-3xl font-bold flex justify-between items-center text-emerald-600">
            {summary.credits.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            <span className="text-xl">↗</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-slate-50">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">TOTAL DÉBITOS</div>
          <div className="text-3xl font-bold flex justify-between items-center text-red-500">
            {Math.abs(summary.debits).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            <span className="text-xl">↘</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-slate-50">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">SALDO FINAL</div>
          <div className="text-3xl font-bold flex justify-between items-center text-slate-900">
            {summary.balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            <span className="text-slate-800">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M4 10h3v7H4zM10.5 10h3v7h-3zM2 19h20v3H2zM17 10h3v7h-3zM12 1L2 6v2h20V6z"/></svg>
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-slate-900">Transações Recentes</h2>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-sm font-medium rounded-lg transition-colors">
            Exportar CSV
          </button>
          <button 
            className="px-4 py-2 bg-slate-900 hover:bg-black text-white text-sm font-medium rounded-lg transition-colors"
            onClick={() => window.location.reload()}
          >
            Exportar arquivo
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-slate-50">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="bg-slate-100/50 text-slate-500 text-xs font-bold uppercase tracking-wider px-6 py-4">DATA</th>
              <th className="bg-slate-100/50 text-slate-500 text-xs font-bold uppercase tracking-wider px-6 py-4">DESCRIÇÃO</th>
              <th className="bg-slate-100/50 text-slate-500 text-xs font-bold uppercase tracking-wider px-6 py-4">CATEGORIA</th>
              <th className="bg-slate-100/50 text-slate-500 text-xs font-bold uppercase tracking-wider px-6 py-4 text-right">VALOR</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-5 text-sm text-slate-600 font-medium whitespace-nowrap">{formatDate(t.date)}</td>
                <td className="px-6 py-5 text-sm font-bold text-slate-900">{t.memo}</td>
                <td className="px-6 py-5">
                  <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase ${getCategoryColor(t.category || '')}`}>
                    {t.category}
                  </span>
                </td>
                <td className={`px-6 py-5 text-right font-bold text-sm whitespace-nowrap ${t.amount < 0 ? 'text-red-500' : 'text-emerald-600'}`}>
                  {formatCurrency(t.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
