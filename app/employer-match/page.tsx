"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Users, AlertCircle, CheckCircle } from "lucide-react";
import { SITE, RETIREMENT_CONSTANTS, calculateEmployerMatch, formatCurrency } from "../site-config";

export default function EmployerMatchPage() {
    const { defaults, employerMatch } = RETIREMENT_CONSTANTS;

    const [salary, setSalary] = useState(defaults.salary.toString());
    const [contributionPercent, setContributionPercent] = useState(defaults.contributionPercent.toString());
    const [employerMatchPercent, setEmployerMatchPercent] = useState(defaults.employerMatchPercent.toString());
    const [employerMatchLimit, setEmployerMatchLimit] = useState(defaults.employerMatchLimit.toString());

    const result = calculateEmployerMatch(
        parseInt(salary.replace(/[^0-9]/g, '')) || 0,
        parseFloat(contributionPercent) || 0,
        parseFloat(employerMatchPercent) || 0,
        parseFloat(employerMatchLimit) || 6
    );

    return (
        <div className="min-h-screen bg-slate-50">
            <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
                <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
                    <Link href="/" className="text-slate-400 hover:text-purple-600">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <div className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-purple-600" />
                        <span className="text-lg font-bold text-slate-800">Employer Match Calculator</span>
                    </div>
                </div>
            </header>

            <main className="max-w-2xl mx-auto px-4 py-8">
                <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm mb-6">
                    <h1 className="text-xl font-bold text-slate-800 mb-2">
                        Calculate Your Free Money
                    </h1>
                    <p className="text-sm text-slate-500 mb-6">
                        See how much your employer contributes (it&apos;s free money!)
                    </p>

                    <div className="space-y-4 mb-6">
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
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Your Contribution: {contributionPercent}%
                            </label>
                            <input
                                type="range"
                                min="1" max="20" step="1"
                                value={contributionPercent}
                                onChange={(e) => setContributionPercent(e.target.value)}
                                className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Employer Matches
                                </label>
                                <div className="relative">
                                    <input
                                        type="number" step="0.5"
                                        value={employerMatchPercent}
                                        onChange={(e) => setEmployerMatchPercent(e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg"
                                    />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">%</span>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    On first
                                </label>
                                <div className="relative">
                                    <input
                                        type="number" step="0.5"
                                        value={employerMatchLimit}
                                        onChange={(e) => setEmployerMatchLimit(e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg"
                                    />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">% of salary</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-6">
                    <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-6 text-center">
                        <p className="text-sm text-yellow-100 mb-1">Free Money from Employer</p>
                        <p className="text-5xl font-bold">{formatCurrency(result.employerMatch)}</p>
                        <p className="text-yellow-100 mt-2">per year</p>
                    </div>

                    <div className="p-6 space-y-3 text-sm">
                        <div className="flex justify-between py-2 border-b border-slate-100">
                            <span>Your Annual Contribution</span>
                            <span className="font-medium text-purple-600">{formatCurrency(result.yourContribution)}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-slate-100">
                            <span>Employer Match</span>
                            <span className="font-medium text-yellow-600">{formatCurrency(result.employerMatch)}</span>
                        </div>
                        <div className="flex justify-between py-3 bg-green-50 rounded-lg px-3">
                            <span className="font-semibold">Total Annual Savings</span>
                            <span className="font-bold text-green-600">{formatCurrency(result.totalAnnual)}</span>
                        </div>
                    </div>
                </div>

                {/* Status Alert */}
                {result.isMaxingMatch ? (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <h4 className="font-semibold text-green-800">You&apos;re maximizing your match!</h4>
                            <p className="text-sm text-green-700">
                                You&apos;re contributing at least {employerMatchLimit}% to get the full employer match.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <h4 className="font-semibold text-amber-800">You&apos;re leaving money on the table!</h4>
                            <p className="text-sm text-amber-700">
                                Increase to {employerMatchLimit}% to get the maximum employer match of
                                {" "}{formatCurrency(parseInt(salary.replace(/[^0-9]/g, '')) * parseFloat(employerMatchLimit) / 100 * parseFloat(employerMatchPercent) / parseFloat(employerMatchLimit))}/year.
                            </p>
                        </div>
                    </div>
                )}

                {/* Average Match Info */}
                <div className="bg-slate-100 rounded-xl p-6 mb-6">
                    <h3 className="font-bold text-slate-800 mb-3">Average Employer Match ({SITE.year})</h3>
                    <div className="grid grid-cols-3 gap-4 text-center text-sm">
                        <div>
                            <p className="text-slate-500">Avg Match</p>
                            <p className="text-xl font-bold text-purple-600">{employerMatch.averageMatchPercent}%</p>
                        </div>
                        <div>
                            <p className="text-slate-500">Up to</p>
                            <p className="text-xl font-bold text-purple-600">{employerMatch.averageMatchLimit}%</p>
                        </div>
                        <div>
                            <p className="text-slate-500">Vesting</p>
                            <p className="text-xl font-bold text-purple-600">{employerMatch.vestingYears} yrs</p>
                        </div>
                    </div>
                </div>

                <div className="my-8 p-6 bg-white border border-slate-200 rounded-xl text-center">
                    <p className="text-sm text-slate-400">Advertisement</p>
                </div>

                <Link href="/calculator" className="block bg-purple-600 hover:bg-purple-700 text-white rounded-lg p-4 text-center font-bold">
                    Calculate Full 401k Growth →
                </Link>
            </main>
        </div>
    );
}
