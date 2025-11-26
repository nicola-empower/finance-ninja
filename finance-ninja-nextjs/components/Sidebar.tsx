'use client';

import { ShieldCheck, LayoutDashboard, ArrowRightLeft, Target, Calculator, X } from 'lucide-react';
import { PageType } from '@/types';

interface SidebarProps {
    currentPage: PageType;
    onPageChange: (page: PageType) => void;
    isOpen: boolean;
    onClose: () => void;
}

export default function Sidebar({ currentPage, onPageChange, isOpen, onClose }: SidebarProps) {
    const navItems = [
        { id: 'dashboard' as PageType, label: 'Dashboard', icon: LayoutDashboard },
        { id: 'transactions' as PageType, label: 'Transactions', icon: ArrowRightLeft },
        { id: 'goals' as PageType, label: 'Savings Goals', icon: Target },
        { id: 'calculator' as PageType, label: 'SE Calculator', icon: Calculator },
    ];

    return (
        <>
            {/* Mobile Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <nav
                className={`
                    glass-sidebar fixed md:static inset-y-0 left-0 z-50
                    w-64 flex flex-col flex-shrink-0 h-full p-6 space-y-8
                    transform transition-transform duration-300 ease-in-out
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                    md:translate-x-0
                `}
            >
                {/* Logo & Close Button */}
                <div className="flex items-center justify-between px-4">
                    <a href="#" className="flex items-center gap-2">
                        <span className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                            <ShieldCheck className="text-white" size={24} />
                        </span>
                        <span className="text-2xl font-extrabold text-gray-800">FinanceNinja</span>
                    </a>
                    <button
                        onClick={onClose}
                        className="md:hidden p-2 text-gray-500 hover:text-gray-700"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Main Navigation */}
                <div className="flex flex-col space-y-3">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.id}
                                className={`sidebar-link w-full flex items-center gap-3 rounded-xl text-gray-600 font-medium p-4 ${currentPage === item.id ? 'active' : ''
                                    }`}
                                onClick={() => {
                                    onPageChange(item.id);
                                    onClose(); // Close sidebar on mobile when item clicked
                                }}
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
        </>
    );
}
