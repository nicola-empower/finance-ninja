export interface Transaction {
  id: number;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  category: string;
  date: string;
}

export interface Goal {
  id: number;
  name: string;
  icon: string;
  saved: number;
  target: number;
  color: 'blue' | 'green' | 'red' | 'pink' | 'yellow';
}

export type PageType = 'dashboard' | 'transactions' | 'goals' | 'calculator';
