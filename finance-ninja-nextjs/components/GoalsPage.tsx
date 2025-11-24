'use client';

import { useState } from 'react';
import { Plus, Plane, Laptop, Home, Gift, TreePine } from 'lucide-react';
import { Goal } from '@/types';
import AddGoalModal from './AddGoalModal';

interface GoalsPageProps {
    goals: Goal[];
    onAddGoal: (goal: Omit<Goal, 'id'>) => void;
}

const iconMap = {
    plane: Plane,
    laptop: Laptop,
    home: Home,
    gift: Gift,
    'tree-pine': TreePine,
};

const colorMap = {
    blue: { bg: 'bg-blue-100', text: 'text-blue-600', fill: 'bg-blue-600' },
    green: { bg: 'bg-green-100', text: 'text-[--color-brand-green]', fill: 'bg-[--color-brand-green]' },
    red: { bg: 'bg-red-100', text: 'text-[--color-brand-red]', fill: 'bg-[--color-brand-red]' },
    pink: { bg: 'bg-pink-100', text: 'text-[--color-brand-pink]', fill: 'bg-[--color-brand-pink]' },
    yellow: { bg: 'bg-yellow-100', text: 'text-[--color-brand-yellow]', fill: 'bg-[--color-brand-yellow]' },
};

export default function GoalsPage({ goals, onAddGoal }: GoalsPageProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const formatCurrency = (value: number) => {
        return `£${value.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };

    return (
        <div className="page-content">
            <header className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-4xl font-extrabold text-gray-800">Savings Goals</h1>
                    <p className="text-lg text-gray-600">Track your progress towards your goals.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-600 text-white font-medium py-3 px-5 rounded-xl shadow-lg hover:bg-blue-700 transition-all flex items-center gap-2"
                >
                    <Plus className="w-5 h-5" />
                    <span>Add New Goal</span>
                </button>
            </header>

            {/* Goals Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {goals.map((goal) => {
                    const Icon = iconMap[goal.icon as keyof typeof iconMap] || Gift;
                    const colors = colorMap[goal.color as keyof typeof colorMap] || colorMap.blue;
                    const percentage = Math.min((goal.saved / goal.target) * 100, 100);

                    return (
                        <div key={goal.id} className="glass-card rounded-2xl p-6">
                            <div className="flex items-center gap-4 mb-4">
                                <div className={`w-12 h-12 rounded-xl ${colors.bg} ${colors.text} flex items-center justify-center`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800">{goal.name}</h3>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                                Saved <span className="font-bold text-gray-800">{formatCurrency(goal.saved)}</span> of{' '}
                                <span className="font-bold text-gray-800">{formatCurrency(goal.target)}</span>
                            </p>
                            <div className="progress-bar-bg w-full h-3 rounded-full">
                                <div
                                    className={`progress-bar-fill h-3 rounded-full ${colors.fill}`}
                                    style={{ width: `${percentage}%` }}
                                ></div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Add Goal Modal */}
            <AddGoalModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdd={onAddGoal}
            />
        </div>
    );
}
