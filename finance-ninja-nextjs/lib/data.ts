import { Transaction, Goal } from '@/types';

export const initialTransactions: Transaction[] = [
    { id: 1, type: 'income', amount: 2500, description: 'Client Payment (Acme Corp)', category: 'Client Payment', date: '2025-10-20' },
    { id: 2, type: 'income', amount: 600, description: 'Freelance Project', category: 'Client Payment', date: '2025-10-18' },
    { id: 3, type: 'expense', amount: 450.00, description: 'Rent', category: 'Rent/Mortgage', date: '2025-10-01' },
    { id: 4, type: 'expense', amount: 120.50, description: 'Groceries (Tesco)', category: 'Groceries', date: '2025-10-15' },
    { id: 5, type: 'expense', amount: 80.00, description: 'Council Tax', category: 'Utilities', date: '2025-10-05' },
    { id: 6, type: 'expense', amount: 65.00, description: 'Train Fare', category: 'Transport', date: '2025-10-12' },
    { id: 7, type: 'expense', amount: 504.00, description: 'Car Insurance', category: 'Insurance', date: '2025-10-10' },
    { id: 8, type: 'expense', amount: 19.00, description: 'Netflix', category: 'Software', date: '2025-10-10' },
];

export const initialGoals: Goal[] = [
    { id: 1, name: 'Summer Holiday', icon: 'plane', saved: 750, target: 1200, color: 'blue' },
    { id: 2, name: 'New Laptop', icon: 'laptop', saved: 1100, target: 1500, color: 'green' },
    { id: 3, name: 'Emergency Fund', icon: 'home', saved: 850, target: 3000, color: 'red' },
    { id: 4, name: 'Birthday Fund', icon: 'gift', saved: 150, target: 300, color: 'pink' },
    { id: 5, name: 'Christmas Fund', icon: 'tree-pine', saved: 400, target: 1000, color: 'yellow' },
];

export const incomeCategories = [
    'Client Payment',
    'Salary',
    'Other Income',
];

export const expenseCategories = [
    'Software',
    'Office Supplies',
    'Accounting',
    'Marketing',
    'Rent/Mortgage',
    'Utilities',
    'Groceries',
    'Transport',
    'Insurance',
    'Entertainment',
    'Personal Care',
    'Tax Payment',
];
