'use client';

import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface IncomeExpenseChartProps {
    income: number;
    expense: number;
}

export default function IncomeExpenseChart({ income, expense }: IncomeExpenseChartProps) {
    const data = {
        labels: ['Income', 'Expenses'],
        datasets: [
            {
                label: 'Amount (£)',
                data: [income, expense],
                backgroundColor: ['#10B981', '#EF4444'],
                borderRadius: 8,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
        },
        scales: {
            y: { beginAtZero: true, grid: { display: false } },
            x: { grid: { display: false } },
        },
    };

    return <Bar data={data} options={options} />;
}
