import type { Transaction, TransactionType } from '../types/Transaction';

export async function parseOFXFile(file: File): Promise<Transaction[]> {
  const text = await file.text();
  
  try {
    const stmtRegex = /<STMTTRN>([\s\S]*?)(?=<\/STMTTRN>|<STMTTRN>|<\/BANKTRANLIST>)/gi;
    const matches = [...text.matchAll(stmtRegex)];

    if (matches.length === 0) {
      throw new Error('Nenhuma transação encontrada no arquivo OFX.');
    }

    const transactions: Transaction[] = matches.map((match, index) => {
      const transactionText = match[1];

      // Busca qualquer valor que venha após a tag e não seja um < ou nova linha
      const getValue = (tag: string) => {
        const regex = new RegExp(`<${tag}>([^<\\r\\n]+)`, 'i');
        const m = transactionText.match(regex);
        return m ? m[1].trim() : '';
      };

      const rawDate = getValue('DTPOSTED');
      let dateObj = new Date();
      if (rawDate.length >= 8) {
        const year = parseInt(rawDate.substring(0, 4));
        const month = parseInt(rawDate.substring(4, 6)) - 1;
        const day = parseInt(rawDate.substring(6, 8));
        dateObj = new Date(year, month, day);
      }

      const amountStr = getValue('TRNAMT') || '0';
      const typeStr = getValue('TRNTYPE').toUpperCase();
      let type: TransactionType = 'OTHER';
      
      if (typeStr === 'CREDIT' || typeStr === 'DEP') type = 'CREDIT';
      else if (typeStr === 'DEBIT' || typeStr === 'PAYMENT' || typeStr === 'SRVCHG') type = 'DEBIT';

      let memo = getValue('MEMO');
      if (!memo) memo = getValue('NAME');
      if (!memo) memo = `Transação ${index + 1}`;

      let category = 'Outros';
      const lowerMemo = memo.toLowerCase();
      
      // Receitas e Estornos
      if (
        (lowerMemo.includes('pix') && type === 'CREDIT') ||
        lowerMemo.includes('rendimento') || 
        lowerMemo.includes('dividendos') || 
        lowerMemo.includes('salario') ||
        lowerMemo.includes('pagamento recebido') ||
        lowerMemo.includes('estorno') ||
        lowerMemo.includes('reembolso')
      ) {
        category = 'Receitas';
      } 
      // Alimentação e Restaurantes
      else if (
        lowerMemo.includes('ifood') || lowerMemo.includes('rappi') || lowerMemo.includes('mcdonald') || 
        lowerMemo.includes('burger') || lowerMemo.includes('supermercado') || lowerMemo.includes('mercado') || 
        lowerMemo.includes('padaria') || lowerMemo.includes('guanabara') || lowerMemo.includes('assai') || 
        lowerMemo.includes('atacadao') || lowerMemo.includes('carrefour') || lowerMemo.includes('bar') ||
        lowerMemo.includes('restaurante') || lowerMemo.includes('lanchonete')
      ) {
        category = 'Alimentação';
      }
      // Compras e Lojas
      else if (
        lowerMemo.includes('shopee') || lowerMemo.includes('mercado livre') || lowerMemo.includes('shein') || 
        lowerMemo.includes('aliexpress') || lowerMemo.includes('magalu') || lowerMemo.includes('americanas') || 
        lowerMemo.includes('havaianas') || lowerMemo.includes('amazon') || lowerMemo.includes('loja') ||
        lowerMemo.includes('mp *') || lowerMemo.includes('pg *')
      ) {
        category = 'Compras';
      }
      // Saúde e Farmácia
      else if (
        lowerMemo.includes('farmacia') || lowerMemo.includes('drogaria') || lowerMemo.includes('drogasil') || 
        lowerMemo.includes('raia') || lowerMemo.includes('pague menos')
      ) {
        category = 'Saúde';
      }
      // Transporte
      else if (
        lowerMemo.includes('posto') || lowerMemo.includes('shell') || lowerMemo.includes('ipiranga') || 
        lowerMemo.includes('uber') || lowerMemo.includes('99app') || lowerMemo.includes('cabify') ||
        lowerMemo.includes('metro') || lowerMemo.includes('cptm')
      ) {
        category = 'Transporte';
      }
      // Assinaturas e Software
      else if (
        lowerMemo.includes('apple') || lowerMemo.includes('netflix') || lowerMemo.includes('spotify') || 
        lowerMemo.includes('google') || lowerMemo.includes('prime') || lowerMemo.includes('disney') ||
        lowerMemo.includes('microsoft') || lowerMemo.includes('adobe')
      ) {
        category = 'Assinaturas';
      }
      // Transferências
      else if (lowerMemo.includes('pix') || lowerMemo.includes('ted') || lowerMemo.includes('doc') || lowerMemo.includes('transf')) {
        category = 'Transferências';
      }

      return {
        id: getValue('FITID') || `txn-${index}`,
        type,
        date: dateObj,
        amount: parseFloat(amountStr),
        memo,
        category
      };
    });

    return transactions.sort((a, b) => b.date.getTime() - a.date.getTime());

  } catch (err: any) {
    console.error('Failed to parse OFX', err);
    throw new Error(err.message || 'Ocorreu um erro ao processar o arquivo OFX.');
  }
}
