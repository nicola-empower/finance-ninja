'use client';

import { useState, useEffect } from 'react';

export default function CalculatorPage() {
    const [grossIncome, setGrossIncome] = useState(50000);
    const [pensionPercent, setPensionPercent] = useState(5);
    const [holidayPercent, setHolidayPercent] = useState(10);
    const [sicknessPercent, setSicknessPercent] = useState(2);
    const [otherPercent, setOtherPercent] = useState(5);
    const [includeStudentLoan, setIncludeStudentLoan] = useState(false);

    const [results, setResults] = useState({
        netIncome: 0,
        incomeTax: 0,
        ni: 0,
        pension: 0,
        holiday: 0,
        sickness: 0,
        other: 0,
        studentLoan: 0,
    });

    useEffect(() => {
        calculateTakeHome();
    }, [grossIncome, pensionPercent, holidayPercent, sicknessPercent, otherPercent, includeStudentLoan]);

    const calculateTakeHome = () => {
        const income = grossIncome;

        // Scottish Tax Rates (Simplified 2024/25)
        const pa = 12570;
        let taxableIncome = income > pa ? income - pa : 0;
        let incomeTax = 0;

        if (taxableIncome > 0) {
            const band1 = Math.min(taxableIncome, 2324);
            incomeTax += band1 * 0.19;
            taxableIncome -= band1;
        }
        if (taxableIncome > 0) {
            const band2 = Math.min(taxableIncome, 11484);
            incomeTax += band2 * 0.2;
            taxableIncome -= band2;
        }
        if (taxableIncome > 0) {
            const band3 = Math.min(taxableIncome, 17260);
            incomeTax += band3 * 0.21;
            taxableIncome -= band3;
        }
        if (taxableIncome > 0) {
            const band4 = Math.min(taxableIncome, 34452);
            incomeTax += band4 * 0.42;
            taxableIncome -= band4;
        }
        if (taxableIncome > 0) {
            const band5 = Math.min(taxableIncome, 60000);
            incomeTax += band5 * 0.45;
            taxableIncome -= band5;
        }
        if (taxableIncome > 0) {
            incomeTax += taxableIncome * 0.48;
        }

        // NI Class 4 (2024/25)
        let ni = 0;
        const niThreshold = 12570;
        const niUpper = 50270;
        if (income > niThreshold) {
            const niBand1 = Math.min(income, niUpper) - niThreshold;
            ni += niBand1 * 0.08;
        }
        if (income > niUpper) {
            const niBand2 = income - niUpper;
            ni += niBand2 * 0.02;
        }

        // Sinking Funds
        const pension = income * (pensionPercent / 100);
        const holiday = income * (holidayPercent / 100);
        const sickness = income * (sicknessPercent / 100);
        const other = income * (otherPercent / 100);

        // Student Loan (Plan 2)
        let studentLoan = 0;
        const slThreshold = 27295;
        if (includeStudentLoan && income > slThreshold) {
            studentLoan = (income - slThreshold) * 0.09;
        }

        // Net
        const totalDeductions = incomeTax + ni + pension + holiday + sickness + other + studentLoan;
        const netIncome = income - totalDeductions;

        setResults({
            netIncome,
            incomeTax,
            ni,
            pension,
            holiday,
            sickness,
            other,
            studentLoan,
        });
    };

    const formatCurrency = (value: number, prefix = '£') => {
        if (value === 0) value = 0;
        return `${prefix}${value.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };

    return (
        <div className="page-content">
            <header className="mb-8">
                <h1 className="text-4xl font-extrabold text-gray-800">Self-Employment Calculator</h1>
                <p className="text-lg text-gray-600">Estimate your take-home pay from projected income.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Calculator Inputs */}
                <div className="glass-card rounded-2xl p-6 lg:col-span-2">
                    <h3 className="text-xl font-bold text-gray-800 mb-6">Enter Your Figures</h3>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="gross-income" className="block text-sm font-medium text-gray-700 mb-1">
                                Projected Gross Income (£)
                            </label>
                            <input
                                type="number"
                                id="gross-income"
                                value={grossIncome}
                                onChange={(e) => setGrossIncome(parseFloat(e.target.value) || 0)}
                                className="w-full p-3 border border-gray-300 rounded-lg text-lg font-medium focus:ring-[--color-brand-blue] focus:border-[--color-brand-blue]"
                                placeholder="e.g., 50000"
                            />
                        </div>
                        <h4 className="text-lg font-semibold text-gray-700 pt-4">Sinking Funds (Set Aside %)</h4>
                        <div>
                            <label htmlFor="pension" className="block text-sm font-medium text-gray-700 mb-1">
                                Pension Contribution (%)
                            </label>
                            <input
                                type="number"
                                id="pension"
                                value={pensionPercent}
                                onChange={(e) => setPensionPercent(parseFloat(e.target.value) || 0)}
                                className="w-full p-3 border border-gray-300 rounded-lg text-lg font-medium focus:ring-[--color-brand-blue] focus:border-[--color-brand-blue]"
                            />
                        </div>
                        <div>
                            <label htmlFor="holiday" className="block text-sm font-medium text-gray-700 mb-1">
                                Holiday Pay Fund (%)
                            </label>
                            <input
                                type="number"
                                id="holiday"
                                value={holidayPercent}
                                onChange={(e) => setHolidayPercent(parseFloat(e.target.value) || 0)}
                                className="w-full p-3 border border-gray-300 rounded-lg text-lg font-medium focus:ring-[--color-brand-blue] focus:border-[--color-brand-blue]"
                            />
                        </div>
                        <div>
                            <label htmlFor="sickness" className="block text-sm font-medium text-gray-700 mb-1">
                                Sickness Fund (%)
                            </label>
                            <input
                                type="number"
                                id="sickness"
                                value={sicknessPercent}
                                onChange={(e) => setSicknessPercent(parseFloat(e.target.value) || 0)}
                                className="w-full p-3 border border-gray-300 rounded-lg text-lg font-medium focus:ring-[--color-brand-blue] focus:border-[--color-brand-blue]"
                            />
                        </div>
                        <div>
                            <label htmlFor="other" className="block text-sm font-medium text-gray-700 mb-1">
                                Tax/Maternity Fund (%)
                            </label>
                            <input
                                type="number"
                                id="other"
                                value={otherPercent}
                                onChange={(e) => setOtherPercent(parseFloat(e.target.value) || 0)}
                                className="w-full p-3 border border-gray-300 rounded-lg text-lg font-medium focus:ring-[--color-brand-blue] focus:border-[--color-brand-blue]"
                            />
                        </div>
                        <h4 className="text-lg font-semibold text-gray-700 pt-4">Other Deductions</h4>
                        <div className="flex items-center gap-3 pt-2">
                            <input
                                type="checkbox"
                                id="student-loan"
                                checked={includeStudentLoan}
                                onChange={(e) => setIncludeStudentLoan(e.target.checked)}
                                className="h-5 w-5 rounded text-[--color-brand-blue] focus:ring-[--color-brand-blue]"
                            />
                            <label htmlFor="student-loan" className="text-sm font-medium text-gray-700">
                                Include Student Loan (Plan 2)?
                            </label>
                        </div>
                    </div>
                </div>

                {/* Calculator Results */}
                <div className="glass-card rounded-2xl p-6 lg:col-span-3">
                    <h3 className="text-xl font-bold text-gray-800 mb-6">Estimated Take-Home Pay</h3>

                    {/* Total */}
                    <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-[--color-brand-blue]">
                        <span className="text-sm font-medium text-[--color-brand-blue]">Estimated Net Income (Annual)</span>
                        <p className="text-5xl font-extrabold text-gray-800">{formatCurrency(results.netIncome)}</p>
                    </div>

                    {/* Deductions Breakdown */}
                    <h4 className="text-lg font-semibold text-gray-700 mb-4">Deductions Breakdown:</h4>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                            <span className="font-medium text-gray-600">Gross Annual Income</span>
                            <span className="font-bold text-lg text-gray-800">{formatCurrency(grossIncome)}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                            <span className="font-medium text-gray-600">Income Tax</span>
                            <span className="font-bold text-lg text-[--color-brand-red]">{formatCurrency(results.incomeTax, '- £')}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                            <span className="font-medium text-gray-600">National Insurance (Class 4)</span>
                            <span className="font-bold text-lg text-[--color-brand-red]">{formatCurrency(results.ni, '- £')}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                            <span className="font-medium text-gray-600">Pension Contribution ({pensionPercent}%)</span>
                            <span className="font-bold text-lg text-[--color-brand-red]">{formatCurrency(results.pension, '- £')}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                            <span className="font-medium text-gray-600">Holiday Pay Fund ({holidayPercent}%)</span>
                            <span className="font-bold text-lg text-[--color-brand-red]">{formatCurrency(results.holiday, '- £')}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                            <span className="font-medium text-gray-600">Sickness Fund ({sicknessPercent}%)</span>
                            <span className="font-bold text-lg text-[--color-brand-red]">{formatCurrency(results.sickness, '- £')}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                            <span className="font-medium text-gray-600">Tax/Maternity Fund ({otherPercent}%)</span>
                            <span className="font-bold text-lg text-[--color-brand-red]">{formatCurrency(results.other, '- £')}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                            <span className="font-medium text-gray-600">Student Loan (Plan 2)</span>
                            <span className="font-bold text-lg text-[--color-brand-red]">{formatCurrency(results.studentLoan, '- £')}</span>
                        </div>
                    </div>

                    <p className="text-xs text-gray-500 mt-6">
                        *Estimates based on 2024/2025 tax rates (Scotland). For demonstration purposes only. NI Class 2 (fixed weekly) is
                        not included in this demo calculation.
                    </p>
                </div>
            </div>
        </div>
    );
}
