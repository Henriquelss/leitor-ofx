import { useState, useEffect } from 'react';
import type { Transaction } from '../features/transactions/types/Transaction';

export interface HistorySession {
  id: string;
  timestamp: number;
  fileName: string;
  transactions: Transaction[];
  totalCredits: number;
  totalDebits: number;
  balance: number;
}

const STORAGE_KEY = '@ofx-ledger:history';

export function useHistory() {
  const [sessions, setSessions] = useState<HistorySession[]>([]);

  useEffect(() => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      try {
        const parsed = JSON.parse(data);
        // Fix stringified dates back to Date objects
        parsed.forEach((session: HistorySession) => {
          session.transactions.forEach(t => t.date = new Date(t.date));
        });
        setSessions(parsed);
      } catch (e) {
        console.error('Failed to parse history from localStorage', e);
      }
    }
  }, []);

  const saveSession = (fileName: string, transactions: Transaction[]) => {
    let credits = 0;
    let debits = 0;
    transactions.forEach(t => {
      if (t.amount > 0) credits += t.amount;
      else debits += t.amount;
    });

    const newSession: HistorySession = {
      id: `sess-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      timestamp: Date.now(),
      fileName,
      transactions,
      totalCredits: credits,
      totalDebits: debits,
      balance: credits + debits,
    };

    const updated = [newSession, ...sessions].slice(0, 50); // Keep last 50
    setSessions(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newSession;
  };

  const deleteSession = (id: string) => {
    const updated = sessions.filter(s => s.id !== id);
    setSessions(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const clearHistory = () => {
    setSessions([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return { sessions, saveSession, deleteSession, clearHistory };
}
