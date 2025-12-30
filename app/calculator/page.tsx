"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Calculator, TrendingUp } from "lucide-react";
import {
    SITE,
    RETIREMENT_CONSTANTS,
    calculate401kGrowth,
    formatCurrency,
    RetirementResult
} from "../site-config";

export default function CalculatorPage() {
    const { defaults } = RETIREMENT_CONSTANTS;

    const [currentAge, setCurrentAge] = useState(defaults.currentAge.toString());
    const [salary, setSalary] = useState(defaults.salary.toString());
    const [contributionPercent, setContributionPercent] = useState(defaults.contributionPercent.toString());
    const [currentBalance, setCurrentBalance] = useState(defaults.currentBalance.toString());
    const [employerMatchPercent, setEmployerMatchPercent] = useState(defaults.employerMatchPercent.toString());
    const [employerMatchLimit, setEmployerMatchLimit] = useState(defaults.employerMatchLimit.toString());
    const [expectedReturn, setExpectedReturn] = useState(defaults.expectedReturn.toString());
    const [retirementAge, setRetirementAge] = useState(defaults.retirementAge.toString());
    const [result, setResult] = useState<RetirementResult | null>(null);

    const handleCalculate = () => {
        setResult(calculate401kGrowth(
            parseInt(currentAge) || 30,
            parseInt(salary.replace(/[^0-9]/g, '')) || 0,
            parseFloat(contributionPercent) || 0,
            parseInt(currentBalance.replace(/[^0-9]/g, '')) || 0,
            parseFloat(employerMatchPercent) || 0,
            parseFloat(employerMatchLimit) || 6,
            parseFloat(expectedReturn) || 7,
            parseInt(retirementAge) || 65
        ));
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
                <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
                    <Link href="/" className="text-slate-400 hover:text-purple-600">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <div className="flex items-center gap-2">
                        <Calculator className="w-5 h-5 text-purple-600" />
                        <span className="text-lg font-bold text-slate-800">401k Calculator</span>
                    </div>
                    <span className="ml-auto text-xs text-white bg-purple-600 px-2 py-1 rounded-full font-bold">
                        {SITE.year}
                    </span>
                </div>
            </header>

            <main className="max-w-2xl mx-auto px-4 py-8">
                <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                    <h1 className="text-xl font-bold text-slate-800 mb-2">
                        Calculate Your 401k Growth
                    </h1>
                    <p className="text-sm text-slate-500 mb-6">
                        See how much your retirement savings will grow
                    </p>

                    <div className="space-y-4 mb-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Current Age</label>
                                <input
                                    type="number"
                                    value={currentAge}
                                    onChange={(e) => setCurrentAge(e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Retirement Age</label>
                                <input
                                    type="number"
                                    value={retirementAge}
                                    onChange={(e) => setRetirementAge(e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Annual Salary</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                                    <input
                                        type="text"
                                        value={parseInt(salary).toLocaleString() || ''}
                                        onChange={(e) => setSalary(e.target.value.replace(/[^0-9]/g, ''))}
                                        className="w-full pl-7 pr-3 py-3 border-2 border-slate-300 rounded-lg"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Current 401k Balance</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                                    <input
                                        type="text"
                                        value={parseInt(currentBalance).toLocaleString() || ''}
                                        onChange={(e) => setCurrentBalance(e.target.value.replace(/[^0-9]/g, ''))}
                                        className="w-full pl-7 pr-3 py-3 border-2 border-slate-300 rounded-lg"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Your Contribution: {contributionPercent}% ({formatCurrency(parseInt(salary.replace(/[^0-9]/g, '')) * parseFloat(contributionPercent) / 100)}/year)
                            </label>
                            <input
                                type="range"
                                min="1" max="25" step="1"
                                value={contributionPercent}
                                onChange={(e) => setContributionPercent(e.target.value)}
                                className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer"
                            />
                            <div className="flex justify-between text-xs text-slate-500 mt-1">
                                <span>1%</span>
                                <span>25%</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Employer Match %</label>
                                <input
                                    type="number" step="0.5"
                                    value={employerMatchPercent}
                                    onChange={(e) => setEmployerMatchPercent(e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Up to % of Salary</label>
                                <input
                                    type="number" step="0.5"
                                    value={employerMatchLimit}
                                    onChange={(e) => setEmployerMatchLimit(e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Expected Annual Return: {expectedReturn}%</label>
                            <input
                                type="range"
                                min="4" max="12" step="0.5"
                                value={expectedReturn}
                                onChange={(e) => setExpectedReturn(e.target.value)}
                                className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer"
                            />
                            <div className="flex justify-between text-xs text-slate-500 mt-1">
                                <span>4% (Conservative)</span>
                                <span>12% (Aggressive)</span>
                            </div>
                        </div>
                    </div>

                    <button onClick={handleCalculate}
                        className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-bold text-lg flex items-center justify-center gap-2">
                        <TrendingUp className="w-5 h-5" />
                        Calculate Growth
                    </button>
                </div>

                {/* Results */}
                {result && (
                    <div className="mt-6 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6 text-center">
                            <p className="text-sm text-purple-100 mb-1">Projected Balance at Age {result.retirementAge}</p>
                            <p className="text-5xl font-bold text-yellow-400">{formatCurrency(result.projectedBalance)}</p>
                            <p className="text-purple-200 mt-2">{result.yearsToRetirement} years of growth</p>
                        </div>

                        <div className="p-6 space-y-3 text-sm">
                            <h4 className="font-semibold text-slate-600 uppercase text-xs tracking-wider">Breakdown</h4>
                            <div className="flex justify-between py-2 border-b border-slate-100">
                                <span>Starting Balance</span>
                                <span className="font-medium">{formatCurrency(result.currentBalance)}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-slate-100">
                                <span>Your Total Contributions</span>
                                <span className="font-medium text-purple-600">{formatCurrency(result.totalContributions)}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-slate-100">
                                <span>Total Employer Match</span>
                                <span className="font-medium text-yellow-600">{formatCurrency(result.totalEmployerMatch)}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-slate-100">
                                <span>Investment Growth</span>
                                <span className="font-medium text-green-600">{formatCurrency(result.totalGrowth)}</span>
                            </div>
                            <div className="flex justify-between py-3 bg-purple-50 rounded-lg px-3">
                                <span className="font-semibold">Total at Retirement</span>
                                <span className="font-bold text-purple-600">{formatCurrency(result.projectedBalance)}</span>
                            </div>
                        </div>

                        {/* Visual Breakdown */}
                        <div className="border-t border-slate-200 p-6">
                            <h4 className="font-semibold text-slate-600 uppercase text-xs tracking-wider mb-3">Composition</h4>
                            <div className="h-6 bg-slate-200 rounded-full overflow-hidden flex">
                                <div
                                    className="bg-slate-400 h-full"
                                    style={{ width: `${(result.currentBalance / result.projectedBalance) * 100}%` }}
                                    title="Starting Balance"
                                />
                                <div
                                    className="bg-purple-500 h-full"
                                    style={{ width: `${(result.totalContributions / result.projectedBalance) * 100}%` }}
                                    title="Your Contributions"
                                />
                                <div
                                    className="bg-yellow-400 h-full"
                                    style={{ width: `${(result.totalEmployerMatch / result.projectedBalance) * 100}%` }}
                                    title="Employer Match"
                                />
                                <div
                                    className="bg-green-500 h-full"
                                    style={{ width: `${(result.totalGrowth / result.projectedBalance) * 100}%` }}
                                    title="Growth"
                                />
                            </div>
                            <div className="flex flex-wrap gap-3 text-xs mt-2">
                                <span className="flex items-center gap-1"><span className="w-3 h-3 bg-slate-400 rounded"></span> Starting</span>
                                <span className="flex items-center gap-1"><span className="w-3 h-3 bg-purple-500 rounded"></span> Contributions</span>
                                <span className="flex items-center gap-1"><span className="w-3 h-3 bg-yellow-400 rounded"></span> Employer Match</span>
                                <span className="flex items-center gap-1"><span className="w-3 h-3 bg-green-500 rounded"></span> Growth</span>
                            </div>
                        </div>
                    </div>
                )}

                <div className="my-8 p-6 bg-white border border-slate-200 rounded-xl text-center">
                    <p className="text-sm text-slate-400">Advertisement</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Link href="/employer-match" className="bg-white border border-slate-200 rounded-lg p-4 text-center hover:border-purple-500">
                        <p className="text-sm font-medium text-slate-600">Employer Match →</p>
                    </Link>
                    <Link href="/roth-vs-traditional" className="bg-white border border-slate-200 rounded-lg p-4 text-center hover:border-purple-500">
                        <p className="text-sm font-medium text-slate-600">Roth vs Traditional →</p>
                    </Link>
                </div>
            </main>
        </div>
    );
}
