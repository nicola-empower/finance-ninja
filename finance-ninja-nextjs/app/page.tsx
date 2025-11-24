'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import Dashboard from '@/components/Dashboard';
import TransactionsPage from '@/components/TransactionsPage';
import GoalsPage from '@/components/GoalsPage';
import CalculatorPage from '@/components/CalculatorPage';
import { PageType, Transaction, Goal } from '@/types';
import { initialTransactions, initialGoals } from '@/lib/data';

export default function Home() {
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedTransactions = localStorage.getItem('finance-ninja-transactions');
    const savedGoals = localStorage.getItem('finance-ninja-goals');

    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    } else {
      setTransactions(initialTransactions);
    }

    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    } else {
      setGoals(initialGoals);
    }
    setIsLoaded(true);
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('finance-ninja-transactions', JSON.stringify(transactions));
      localStorage.setItem('finance-ninja-goals', JSON.stringify(goals));
    }
  }, [transactions, goals, isLoaded]);

  const handleAddTransaction = (newTransaction: Omit<Transaction, 'id'>) => {
    const transaction: Transaction = {
      ...newTransaction,
      id: Date.now(),
    };
    setTransactions([...transactions, transaction]);
  };

  const handleAddGoal = (newGoal: Omit<Goal, 'id'>) => {
    const goal: Goal = {
      ...newGoal,
      id: Date.now(),
    } as Goal; // Type assertion to handle the color string type
    setGoals([...goals, goal]);
  };

  if (!isLoaded) {
    return null; // or a loading spinner
  }

  return (
    <div className="flex h-screen w-full">
      {/* Sidebar */}
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-y-auto p-8 md:p-12">
        {/* Dev Note for portfolio */}
        <div className="glass-card mb-8 p-4 border-l-4 border-[--color-brand-blue]">
          <h4 className="font-bold text-[--color-brand-blue]">Portfolio Dev Note:</h4>
          <p className="text-gray-700">
            This is an interactive demo of &quot;FinanceNinja.&quot; It showcases the UI and full-stack logic. Features like{' '}
            <strong>Add Transaction</strong>, <strong>Add Goal</strong>, and the <strong>Self-Employment Calculator</strong> are live and interactive.
            Data is saved to your browser&apos;s local storage.
          </p>
        </div>

        {/* Render current page */}
        {currentPage === 'dashboard' && <Dashboard transactions={transactions} />}
        {currentPage === 'transactions' && (
          <TransactionsPage transactions={transactions} onAddTransaction={handleAddTransaction} />
        )}
        {currentPage === 'goals' && <GoalsPage goals={goals} onAddGoal={handleAddGoal} />}
        {currentPage === 'calculator' && <CalculatorPage />}
      </main>
    </div>
  );
}
