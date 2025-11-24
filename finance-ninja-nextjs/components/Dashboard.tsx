'use client';

import { Wallet, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { Transaction } from '@/types';
import IncomeExpenseChart from './IncomeExpenseChart';
import SpendingCategoriesChart from './SpendingCategoriesChart';

interface DashboardProps {
    transactions: Transaction[];
}

export default function Dashboard({ transactions }: DashboardProps) {
    // Calculate totals
    const calculateTotals = () => {
        let income = 0;
        let expense = 0;
        const spendingByCategory: Record<string, number> = {};

        transactions.forEach((tx) => {
            if (tx.type === 'income') {
                income += tx.amount;
            } else {
                expense += tx.amount;
                spendingByCategory[tx.category] = (spendingByCategory[tx.category] || 0) + tx.amount;
            }
        });

        const balance = income - expense;
        return { income, expense, balance, spendingByCategory };
    };

    const { income, expense, balance, spendingByCategory } = calculateTotals();

    const formatCurrency = (value: number) => {
        return `£${value.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };

    return (
        <div className="page-content">
            <header className="mb-8">
                <h1 className="text-4xl font-extrabold text-gray-800">Dashboard</h1>
                <p className="text-lg text-gray-600">Your financial overview for October 2025.</p>
            </header>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="glass-card rounded-2xl p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl bg-blue-100 text-[--color-brand-blue] flex items-center justify-center">
                            <Wallet className="w-7 h-7" />
                        </div>
                        <div>
                            <span className="text-sm font-medium text-gray-500">Total Balance</span>
                            <p className="text-3xl font-bold text-gray-800">{formatCurrency(balance)}</p>
                        </div>
                    </div>
                </div>
                <div className="glass-card rounded-2xl p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl bg-green-100 text-[--color-brand-green] flex items-center justify-center">
                            <ArrowUpCircle className="w-7 h-7" />
                        </div>
                        <div>
                            <span className="text-sm font-medium text-gray-500">Monthly Income</span>
                            <p className="text-3xl font-bold text-[--color-brand-green]">{formatCurrency(income)}</p>
                        </div>
                    </div>
                </div>
                <div className="glass-card rounded-2xl p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl bg-red-100 text-[--color-brand-red] flex items-center justify-center">
                            <ArrowDownCircle className="w-7 h-7" />
                        </div>
                        <div>
                            <span className="text-sm font-medium text-gray-500">Monthly Expenses</span>
                            <p className="text-3xl font-bold text-[--color-brand-red]">£-{formatCurrency(expense)}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Bar Chart: Income vs Expense */}
                <div className="glass-card rounded-2xl p-6 lg:col-span-2">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Income vs. Expense</h3>
                    <div className="h-80">
                        <IncomeExpenseChart income={income} expense={expense} />
                    </div>
                </div>
                {/* Doughnut Chart: Spending Categories */}
                <div className="glass-card rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Spending Categories</h3>
                    <div className="h-80">
                        <SpendingCategoriesChart spendingByCategory={spendingByCategory} />
                    </div>
                </div>
            </div>
        </div>
    );
}
