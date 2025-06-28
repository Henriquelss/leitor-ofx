import { useState } from 'react';
import { parseOFXFile } from '../utils/ofxParser';
import type { Transaction } from '../types/Transaction';
import TransactionsTable from './TransactionsTable';


export default function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [parsedTransactions, setParsedTransactions] = useState<Transaction[] | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const parsed = await parseOFXFile(file);
    console.log('Arquivo carregado e parseado:', parsed); 
    setTransactions(parsed);
    setParsedTransactions(null); 
  };

  const handleShowData = () => {
    console.log('Transações exibidas:', transactions); 
    setParsedTransactions(transactions);
  };

  return (
    <div className="container">
      <h1>Leitor de Arquivo OFX</h1>
      <input type="file" accept=".ofx" onChange={handleFileChange} />

      {}
      {transactions.length > 0 && (
        <button onClick={handleShowData}>Exibir dados</button>
      )}

      {}
      {parsedTransactions && parsedTransactions.length > 0 && (
        <TransactionsTable transactions={parsedTransactions} />
      )}
    </div>
  );
}
