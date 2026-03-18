import type { HistorySession } from '../hooks/useHistory';

interface HistoryProps {
  sessions: HistorySession[];
  onDeleteSession: (id: string) => void;
  onClearAll: () => void;
  onViewSession: (session: HistorySession) => void;
}

export default function History({ sessions = [], onDeleteSession, onClearAll, onViewSession }: HistoryProps) {
  if (!sessions || sessions.length === 0) {
    return (
      <div className="text-center py-20 animate-[fadeIn_0.4s_ease-out]">
        <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        </div>
        <h2 className="text-xl font-bold text-slate-800 mb-2">Nenhum histórico encontrado</h2>
        <p className="text-slate-500">Seus arquivos processados anteriormente aparecerão aqui.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto animate-[fadeIn_0.4s_ease-out]">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Histórico de Arquivos</h2>
        <button 
          onClick={onClearAll}
          className="text-sm font-medium text-red-500 hover:text-red-700 transition"
        >
          Limpar histórico
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {sessions.map(session => {
          if (!session) return null;
          
          const timestamp = session.timestamp || Date.now();
          const fileName = session.fileName || 'Arquivo OFX';
          const totalTransactions = session.transactions ? session.transactions.length : 0;
          const balance = session.balance || 0;

          return (
            <div key={session.id || `session-${timestamp}-${Math.random()}`} className="bg-white border text-left border-slate-200 rounded-2xl p-5 md:p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-5 md:gap-4 hover:border-slate-300 transition-colors shadow-sm">
              <div className="w-full">
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3 mb-2 w-full">
                  <h3 className="font-bold text-slate-900 truncate">{fileName}</h3>
                  <span className="text-xs font-semibold bg-slate-100 text-slate-500 px-2 py-1 rounded w-fit">
                    {totalTransactions} transações
                  </span>
                </div>
                <p className="text-sm text-slate-500">
                  Data: {new Date(timestamp).toLocaleString('pt-BR', { dateStyle: 'long', timeStyle: 'short' })}
                </p>
              </div>

              <div className="flex flex-row justify-between md:justify-end items-center gap-6 w-full md:w-auto pt-4 md:pt-0 border-t border-slate-100 md:border-none">
                <div className="text-left md:text-right flex-1 md:flex-none">
                  <p className="text-[11px] font-bold text-slate-400 mb-0.5 uppercase tracking-wider">Saldo Final</p>
                  <div className={`font-bold text-lg leading-tight ${balance < 0 ? 'text-red-500' : 'text-slate-900'}`}>
                    {balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => onViewSession(session)}
                    className="p-2 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
                    title="Ver transações"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                  </button>
                  <button 
                    onClick={() => onDeleteSession(session.id)}
                    className="p-2 text-red-500 bg-red-50 hover:bg-red-100 rounded-lg transition"
                    title="Apagar do histórico"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
