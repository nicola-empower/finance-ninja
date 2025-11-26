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

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
      {/* Mobile Header with Hamburger */}
      <div className="md:hidden fixed top-0 left-0 right-0 p-4 flex items-center justify-between bg-[#F4F7FE] z-30">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 text-gray-600 hover:text-gray-900 bg-white rounded-lg shadow-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <span className="font-bold text-gray-800">FinanceNinja</span>
        <div className="w-10"></div> {/* Spacer for centering */}
      </div>

      {/* Sidebar */}
      <Sidebar
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-y-auto p-4 md:p-12 pt-20 md:pt-12">
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
