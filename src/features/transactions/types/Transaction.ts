export type TransactionType = 'CREDIT' | 'DEBIT' | 'OTHER';

export interface Transaction {
  id: string;
  type: TransactionType;
  date: Date;
  amount: number;
  memo: string;
  category?: string;
}
