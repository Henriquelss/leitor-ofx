import type { Transaction } from '../types/Transaction';
import './TransactionsTable.css';


interface Props {
  transactions: Transaction[];
}

export default function TransactionsTable({ transactions }: Props) {
  if (!transactions.length) return null;

  const creditTotal = transactions
    .filter(t => t.type === 'CREDIT')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const debitTotal = transactions
    .filter(t => t.type === 'DEBIT')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const balance = creditTotal + debitTotal;

  return (
    <table>
      <thead>
        <tr>
          <th>Data</th>
          <th>Tipo</th>
          <th>Valor</th>
          <th>Descrição</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((t, i) => (
          <tr key={i}>
            <td>{formatDate(t.date)}</td>
            <td className={t.type === 'CREDIT' ? 'credit-cell' : t.type === 'DEBIT' ? 'debit-cell' : ''}>
              {t.type}
            </td>
            <td>{formatCurrency(t.amount)}</td>
            <td>{t.memo}</td>
          </tr>
        ))}
      </tbody>

      <tfoot>
        <tr>
          <td colSpan={2}></td>
          <td colSpan={2} className="credit-total">
            <strong>Total de Créditos:</strong> {formatCurrency(creditTotal.toString())}
          </td>
        </tr>
        <tr>
          <td colSpan={2}></td>
          <td colSpan={2} className="debit-total">
            <strong>Total de Débitos:</strong> {formatCurrency(debitTotal.toString())}
          </td>
        </tr>
        <tr>
          <td colSpan={2} className="balance-total"></td>
          <td colSpan={2}>
            <strong>Saldo Final:</strong> {formatCurrency(balance.toString())}
          </td>
        </tr>
      </tfoot>

    </table>
  );
}

function formatDate(date: string): string {
  const match = date.match(/^(\d{4})(\d{2})(\d{2})/);
  if (!match) return date;
  return `${match[3]}/${match[2]}/${match[1]}`;
}

function formatCurrency(amount: string): string {
  const num = Number(amount);
  if (isNaN(num)) return amount;

  const abs = Math.abs(num).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  });

  return num < 0 ? `R$ -${abs.replace('R$', '').trim()}` : abs;
}
