import type { Transaction } from '../types/Transaction';
import './TransactionsTable.css';

interface Props {
  transactions: Transaction[];
}

function formatDate(ofxDate: string): string {
  const match = ofxDate.match(/^(\d{4})(\d{2})(\d{2})/);
  if (!match) return ofxDate;
  const [, year, month, day] = match;
  return `${day}/${month}/${year}`;
}

function formatCurrency(amountStr: string): string {
  const amount = parseFloat(amountStr);
  const isNegative = amount < 0;
  const absolute = Math.abs(amount);

  const formatted = absolute.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return isNegative ? `R$ -${formatted.replace('R$', '').trim()}` : formatted;
}

export default function TransactionsTable({ transactions }: Props) {
  const creditTotal = transactions
    .filter(t => t.type.toUpperCase() === 'CREDIT')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const debitTotal = transactions
    .filter(t => t.type.toUpperCase() === 'DEBIT')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const balance = creditTotal + debitTotal; // Débitos já vêm negativos

  return (
    <div className="table-container">
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
          {transactions.map((t, index) => (
            <tr key={index} className={t.type.toUpperCase() === 'DEBIT' ? 'debit' : 'credit'}>
              <td>{formatDate(t.date)}</td>
              {/* ALTERAÇÃO APLICADA AQUI */}
              <td style={{ color: t.type.toUpperCase() === 'DEBIT' ? '#c0392b' : '#27ae60' }}>
                {t.type.toUpperCase()}
              </td>
              <td>{formatCurrency(t.amount)}</td>
              <td>{t.memo}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={2}></td>
            <td colSpan={2} className="credit-total"><strong>Total Créditos:</strong> {formatCurrency(creditTotal.toString())}</td>
          </tr>
          <tr>
            <td colSpan={2}></td>
            <td colSpan={2} className="debit-total"><strong>Total Débitos:</strong> {formatCurrency(debitTotal.toString())}</td>
          </tr>
          <tr>
            <td colSpan={2}></td>
            <td colSpan={2} className="balance-total"><strong>Saldo Final:</strong> {formatCurrency(balance.toString())}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}