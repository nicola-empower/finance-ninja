'use client';

import { ShieldCheck, LayoutDashboard, ArrowRightLeft, Target, Calculator } from 'lucide-react';
import { PageType } from '@/types';

interface SidebarProps {
    currentPage: PageType;
    onPageChange: (page: PageType) => void;
}

export default function Sidebar({ currentPage, onPageChange }: SidebarProps) {
    const navItems = [
        { id: 'dashboard' as PageType, label: 'Dashboard', icon: LayoutDashboard },
        { id: 'transactions' as PageType, label: 'Transactions', icon: ArrowRightLeft },
        { id: 'goals' as PageType, label: 'Savings Goals', icon: Target },
        { id: 'calculator' as PageType, label: 'SE Calculator', icon: Calculator },
    ];

    return (
        <nav className="glass-sidebar w-64 flex flex-col flex-shrink-0 h-full p-6 space-y-8">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2 px-4">
                <span className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                    <ShieldCheck className="text-white" size={24} />
                </span>
                <span className="text-2xl font-extrabold text-gray-800">FinanceNinja</span>
            </a>

            {/* Main Navigation */}
            <div className="flex flex-col space-y-3">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <button
                            key={item.id}
                            className={`sidebar-link w-full flex items-center gap-3 rounded-xl text-gray-600 font-medium p-4 ${currentPage === item.id ? 'active' : ''
                                }`}
                            onClick={() => onPageChange(item.id)}
                            title={item.label}
                        >
                            <Icon className="w-6 h-6" />
                            <span>{item.label}</span>
                        </button>
                    );
                })}
            </div>

            {/* Profile / User (Demo) */}
            <div className="mt-auto glass-card rounded-xl p-4 flex items-center gap-3">
                <img
                    src="https://placehold.co/100x100/DBEAFE/2563EB?text=N"
                    alt="Demo User"
                    className="w-12 h-12 rounded-full border-2 border-white shadow-md"
                />
                <div>
                    <h4 className="font-bold text-gray-800">Nicola B.</h4>
                    <p className="text-sm text-gray-600">Demo User</p>
                </div>
            </div>
        </nav>
    );
}
