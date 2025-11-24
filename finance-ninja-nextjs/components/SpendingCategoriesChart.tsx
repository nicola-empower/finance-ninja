'use client';

import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface SpendingCategoriesChartProps {
    spendingByCategory: Record<string, number>;
}

export default function SpendingCategoriesChart({ spendingByCategory }: SpendingCategoriesChartProps) {
    const data = {
        labels: Object.keys(spendingByCategory),
        datasets: [
            {
                label: 'Spending (£)',
                data: Object.values(spendingByCategory),
                backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#6366F1'],
                hoverOffset: 4,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom' as const,
                labels: { boxWidth: 12, padding: 15 },
            },
        },
    };

    return <Doughnut data={data} options={options} />;
}
