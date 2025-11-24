'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { Transaction } from '@/types';
import { incomeCategories, expenseCategories } from '@/lib/data';

interface AddTransactionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (transaction: Omit<Transaction, 'id'>) => void;
}

export default function AddTransactionModal({ isOpen, onClose, onAdd }: AddTransactionModalProps) {
    const [type, setType] = useState<'income' | 'expense'>('income');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('Client Payment');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newTransaction: Omit<Transaction, 'id'> = {
            type,
            amount: parseFloat(amount),
            description,
            category,
            date: new Date().toISOString().split('T')[0],
        };

        onAdd(newTransaction);

        // Reset form
        setType('income');
        setAmount('');
        setDescription('');
        setCategory('Client Payment');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
            <div className="modal-content-inner glass-modal-content p-8 rounded-2xl shadow-xl w-full max-w-lg z-10">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Add Transaction</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                        <X className="w-6 h-6" />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Transaction Type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                        <div className="flex gap-4">
                            <label className="flex-1">
                                <input
                                    type="radio"
                                    name="transaction-type"
                                    value="income"
                                    checked={type === 'income'}
                                    onChange={(e) => {
                                        setType('income');
                                        setCategory('Client Payment');
                                    }}
                                    className="sr-only"
                                />
                                <div
                                    className={`w-full p-3 rounded-lg border-2 text-center font-medium cursor-pointer ${type === 'income'
                                        ? 'border-[--color-brand-green] bg-green-50 text-[--color-brand-green]'
                                        : 'border-gray-300 bg-white text-gray-500'
                                        }`}
                                >
                                    Income
                                </div>
                            </label>
                            <label className="flex-1">
                                <input
                                    type="radio"
                                    name="transaction-type"
                                    value="expense"
                                    checked={type === 'expense'}
                                    onChange={(e) => {
                                        setType('expense');
                                        setCategory('Software');
                                    }}
                                    className="sr-only"
                                />
                                <div
                                    className={`w-full p-3 rounded-lg border-2 text-center font-medium cursor-pointer ${type === 'expense'
                                        ? 'border-[--color-brand-red] bg-red-50 text-[--color-brand-red]'
                                        : 'border-gray-300 bg-white text-gray-500'
                                        }`}
                                >
                                    Expense
                                </div>
                            </label>
                        </div>
                    </div>
                    {/* Amount */}
                    <div>
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                            Amount (£)
                        </label>
                        <input
                            type="number"
                            id="amount"
                            step="0.01"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[--color-brand-blue] focus:border-[--color-brand-blue]"
                            placeholder="0.00"
                            required
                        />
                    </div>
                    {/* Description */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <input
                            type="text"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[--color-brand-blue] focus:border-[--color-brand-blue]"
                            placeholder="e.g., Client Payment, Groceries"
                            required
                        />
                    </div>
                    {/* Category */}
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                            Category
                        </label>
                        <select
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[--color-brand-blue] focus:border-[--color-brand-blue]"
                        >
                            {type === 'income' ? (
                                <optgroup label="Income">
                                    {incomeCategories.map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </optgroup>
                            ) : (
                                <>
                                    <optgroup label="Business Expenses">
                                        <option value="Software">Software & Subscriptions</option>
                                        <option value="Office Supplies">Office Supplies</option>
                                        <option value="Accounting">Accounting & Legal</option>
                                        <option value="Marketing">Marketing</option>
                                    </optgroup>
                                    <optgroup label="Personal Expenses">
                                        {expenseCategories
                                            .filter((cat) => !['Software', 'Office Supplies', 'Accounting', 'Marketing'].includes(cat))
                                            .map((cat) => (
                                                <option key={cat} value={cat}>
                                                    {cat}
                                                </option>
                                            ))}
                                    </optgroup>
                                </>
                            )}
                        </select>
                    </div>
                    {/* Buttons */}
                    <div className="flex justify-end space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-100 text-gray-700 font-medium py-2 px-5 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white font-medium py-2 px-5 rounded-lg shadow-sm hover:bg-blue-700 transition-colors"
                        >
                            Save Transaction
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
