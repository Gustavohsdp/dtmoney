import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { api } from '../services/api';

interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}

interface TransactionProviderProps {
  children: ReactNode;
}

type TransactionInputProps = Omit<Transaction, 'id' | 'createdAt'>

interface TransactionContextDataProps {
  transactions: Transaction[];
  createTransaction: (transaction: TransactionInputProps) => Promise<void>;
}

const TransactionContext = createContext<TransactionContextDataProps>({} as TransactionContextDataProps);

export function TransactionProvider({ children }: TransactionProviderProps) {
  const [ transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api.get("transactions")
      .then((response) => setTransactions(response.data.transactions));
  }, []);

  async function createTransaction(transactionInput: TransactionInputProps) {
    const response = await api.post('/transactions', {
      ...transactionInput,
      createdAt: new Date(),
    })

    const { transaction } = response.data;

    setTransactions([
      ...transactions,
      transaction,
    ]);
  }

  return (
    <TransactionContext.Provider value={{
      transactions, createTransaction
    }}>
      {children}
    </TransactionContext.Provider>
  )
}

export function useTransactions() {
  const context = useContext(TransactionContext);

  return context
}