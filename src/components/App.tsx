import { useState } from 'react'; 
import { parseOFXFile } from '../utils/ofxParser'; 
import type { Transaction } from '../types/Transaction'; 
import TransactionsTable from './TransactionsTable';

export default function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [showData, setShowData] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const parsed = await parseOFXFile(file);
    setTransactions(parsed);
    setShowData(false);
  };

  const handleShowData = () => {
    setShowData(true);
  };

  return (
    <div className="container">
      <h1>📄 Leitor de Arquivo OFX</h1>

      <input type="file" accept=".ofx" onChange={handleFileChange} />

      {transactions.length > 0 && (
        <button onClick={handleShowData}>Exibir Dados</button>
      )}

      {showData && <TransactionsTable transactions={transactions} />}
    </div>
  );
}
