'use client';

import { useState } from 'react';
import { Plus, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { Transaction } from '@/types';
import AddTransactionModal from './AddTransactionModal';

interface TransactionsPageProps {
    transactions: Transaction[];
    onAddTransaction: (transaction: Omit<Transaction, 'id'>) => void;
}

export default function TransactionsPage({ transactions, onAddTransaction }: TransactionsPageProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Sort transactions by date (newest first)
    const sortedTransactions = [...transactions].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    const formatCurrency = (value: number) => {
        return value.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
    };

    return (
        <div className="page-content">
            <header className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-4xl font-extrabold text-gray-800">Transactions</h1>
                    <p className="text-lg text-gray-600">A complete log of your income and expenses.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-600 text-white font-medium py-3 px-5 rounded-xl shadow-lg hover:bg-blue-700 transition-all flex items-center gap-2"
                >
                    <Plus className="w-5 h-5" />
                    <span>Add Transaction</span>
                </button>
            </header>

            {/* Transaction List */}
            <div className="glass-card rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h3>
                <div className="flex flex-col divide-y divide-gray-200">
                    {sortedTransactions.length === 0 ? (
                        <p className="text-gray-500 p-4 text-center">No transactions yet.</p>
                    ) : (
                        sortedTransactions.map((tx) => {
                            const isIncome = tx.type === 'income';
                            const amountClass = isIncome ? 'text-[--color-brand-green]' : 'text-[--color-brand-red]';
                            const amountPrefix = isIncome ? '+' : '-';
                            const Icon = isIncome ? ArrowUpCircle : ArrowDownCircle;
                            const bgClass = isIncome ? 'bg-green-100' : 'bg-red-100';

                            return (
                                <div key={tx.id} className="flex items-center justify-between p-4">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-full ${bgClass} ${amountClass} flex items-center justify-center flex-shrink-0`}>
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-800">{tx.description}</p>
                                            <span className="text-sm text-gray-500">
                                                {tx.category} &bull; {formatDate(tx.date)}
                                            </span>
                                        </div>
                                    </div>
                                    <span className={`font-bold text-lg ${amountClass}`}>
                                        {amountPrefix}£{formatCurrency(tx.amount)}
                                    </span>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>

            {/* Add Transaction Modal */}
            <AddTransactionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdd={onAddTransaction}
            />
        </div>
    );
}
