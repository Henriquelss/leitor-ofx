export function formatDate(date: Date): string {
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).replace(/ de /g, ' ').replace('.', '');
}

export function formatCurrency(amount: number): string {
  const isNegative = amount < 0;
  const absolute = Math.abs(amount);

  const formatted = absolute.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return isNegative ? `- ${formatted}` : `+ ${formatted}`;
}
