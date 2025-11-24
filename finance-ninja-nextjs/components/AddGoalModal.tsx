'use client';

import { useState } from 'react';
import { X, Plane, Laptop, Home, Gift, TreePine } from 'lucide-react';
import { Goal } from '@/types';

interface AddGoalModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (goal: Omit<Goal, 'id'>) => void;
}

const icons = [
    { id: 'plane', component: Plane, label: 'Travel' },
    { id: 'laptop', component: Laptop, label: 'Tech' },
    { id: 'home', component: Home, label: 'Home' },
    { id: 'gift', component: Gift, label: 'Gift' },
    { id: 'tree-pine', component: TreePine, label: 'Holiday' },
];

const colors = [
    { id: 'blue', class: 'bg-blue-500' },
    { id: 'green', class: 'bg-green-500' },
    { id: 'red', class: 'bg-red-500' },
    { id: 'pink', class: 'bg-pink-500' },
    { id: 'yellow', class: 'bg-yellow-500' },
];

export default function AddGoalModal({ isOpen, onClose, onAdd }: AddGoalModalProps) {
    const [name, setName] = useState('');
    const [target, setTarget] = useState('');
    const [saved, setSaved] = useState('');
    const [selectedIcon, setSelectedIcon] = useState('plane');
    const [selectedColor, setSelectedColor] = useState<'blue' | 'green' | 'red' | 'pink' | 'yellow'>('blue');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newGoal: Omit<Goal, 'id'> = {
            name,
            target: parseFloat(target),
            saved: parseFloat(saved) || 0,
            icon: selectedIcon,
            color: selectedColor,
        };

        onAdd(newGoal);

        // Reset form
        setName('');
        setTarget('');
        setSaved('');
        setSelectedIcon('plane');
        setSelectedColor('blue');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
            <div className="modal-content-inner glass-modal-content p-8 rounded-2xl shadow-xl w-full max-w-lg z-10">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Add New Goal</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                        <X className="w-6 h-6" />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Goal Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[--color-brand-blue] focus:border-[--color-brand-blue]"
                            placeholder="e.g., New Car"
                            required
                        />
                    </div>

                    {/* Target Amount */}
                    <div>
                        <label htmlFor="target" className="block text-sm font-medium text-gray-700 mb-1">
                            Target Amount (£)
                        </label>
                        <input
                            type="number"
                            id="target"
                            step="0.01"
                            value={target}
                            onChange={(e) => setTarget(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[--color-brand-blue] focus:border-[--color-brand-blue]"
                            placeholder="0.00"
                            required
                        />
                    </div>

                    {/* Saved Amount */}
                    <div>
                        <label htmlFor="saved" className="block text-sm font-medium text-gray-700 mb-1">
                            Already Saved (£) <span className="text-gray-400 font-normal">(Optional)</span>
                        </label>
                        <input
                            type="number"
                            id="saved"
                            step="0.01"
                            value={saved}
                            onChange={(e) => setSaved(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[--color-brand-blue] focus:border-[--color-brand-blue]"
                            placeholder="0.00"
                        />
                    </div>

                    {/* Icon Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Select Icon</label>
                        <div className="flex gap-3 overflow-x-auto pb-2">
                            {icons.map((item) => {
                                const Icon = item.component;
                                return (
                                    <button
                                        key={item.id}
                                        type="button"
                                        onClick={() => setSelectedIcon(item.id)}
                                        className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-1 min-w-[70px] ${selectedIcon === item.id
                                            ? 'border-[--color-brand-blue] bg-blue-50 text-[--color-brand-blue]'
                                            : 'border-gray-200 hover:border-gray-300 text-gray-500'
                                            }`}
                                    >
                                        <Icon className="w-6 h-6" />
                                        <span className="text-xs">{item.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Color Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Select Color</label>
                        <div className="flex gap-3">
                            {colors.map((color) => (
                                <button
                                    key={color.id}
                                    type="button"
                                    onClick={() => setSelectedColor(color.id as 'blue' | 'green' | 'red' | 'pink' | 'yellow')}
                                    className={`w-10 h-10 rounded-full ${color.class} transition-transform ${selectedColor === color.id ? 'ring-4 ring-offset-2 ring-gray-200 scale-110' : 'hover:scale-110'
                                        }`}
                                    aria-label={`Select ${color.id}`}
                                />
                            ))}
                        </div>
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
                            Create Goal
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
