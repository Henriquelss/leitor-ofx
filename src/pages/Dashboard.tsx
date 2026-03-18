import { useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Dropzone from '../features/transactions/components/Dropzone';
import TransactionsTable from '../features/transactions/components/TransactionsTable';
import History from './History';
import { parseOFXFile } from '../features/transactions/utils/ofxParser';
import type { Transaction } from '../features/transactions/types/Transaction';
import { useHistory, type HistorySession } from '../hooks/useHistory';

type Tab = 'processor' | 'history' | 'settings';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('processor');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { sessions, saveSession, deleteSession, clearHistory } = useHistory();

  const processFile = async (file: File) => {
    if (!file.name.toLowerCase().endsWith('.ofx')) {
      setError('Por favor, selecione um arquivo .ofx válido.');
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const parsed = await parseOFXFile(file);
      setTransactions(parsed);
      saveSession(file.name, parsed);
    } catch (err: any) {
      setError(err.message || 'Erro ao processar o arquivo.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewSession = (session: HistorySession) => {
    setTransactions(session.transactions);
    setActiveTab('processor');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900 bg-slate-50 selection:bg-blue-100 selection:text-blue-900">
      <Header activeTab={activeTab} onChangeTab={setActiveTab} />

      <main className="flex-1 w-full max-w-[1100px] mx-auto px-4 md:px-6 py-8 md:py-20">
        {activeTab === 'processor' && (
          <>
            <div className="text-center mb-10 md:mb-16 animate-[fadeIn_0.5s_ease-out]">
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-slate-900">Processamento Soberano</h1>
              <p className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed px-2 md:px-0">
                Transforme seus extratos OFX em dados acionáveis com a precisão de um livro contábil mestre.
              </p>
            </div>

            {transactions.length === 0 ? (
              <Dropzone onFileSelect={processFile} isLoading={isLoading} error={error} />
            ) : (
              <TransactionsTable transactions={transactions} />
            )}
          </>
        )}

        {activeTab === 'history' && (
          <History 
            sessions={sessions} 
            onDeleteSession={deleteSession} 
            onClearAll={clearHistory} 
            onViewSession={handleViewSession} 
          />
        )}
        
        {activeTab === 'settings' && (
          <div className="text-center py-20 text-slate-500">
            Página de Configurações (Em Breve)
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
