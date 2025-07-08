import type { Transaction } from '../types/Transaction';

export function extractTransactions(ofxText: string): Transaction[] {
  const regex = /<STMTTRN>([\s\S]*?)<\/STMTTRN>/g;
  const matches = [...ofxText.matchAll(regex)];

  return matches.map(match => {
    const transactionText = match[1];
    const type = transactionText.match(/<TRNTYPE>(.*?)<\/TRNTYPE>/)?.[1] || '';
    const date = transactionText.match(/<DTPOSTED>(.*?)<\/DTPOSTED>/)?.[1] || '';
    const amount = transactionText.match(/<TRNAMT>(.*?)<\/TRNAMT>/)?.[1] || '';
    const memo = transactionText.match(/<MEMO>(.*?)<\/MEMO>/)?.[1] || '';
    return { type, date, amount, memo };
  });
}

export async function parseOFXFile(file: File): Promise<Transaction[]> {
  const text = await file.text();
  return extractTransactions(text);
}
