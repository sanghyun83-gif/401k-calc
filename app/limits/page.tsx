"use client";

import Link from "next/link";
import { ArrowLeft, DollarSign, Info } from "lucide-react";
import { SITE, RETIREMENT_CONSTANTS, formatCurrency } from "../site-config";

export default function LimitsPage() {
    const { contributionLimits, ageThresholds } = RETIREMENT_CONSTANTS;

    const limitsData = [
        {
            category: "Under 50",
            employee: contributionLimits.employee,
            catchUp: 0,
            total: contributionLimits.employee,
            color: "purple",
        },
        {
            category: "Ages 50-59",
            employee: contributionLimits.employee,
            catchUp: contributionLimits.catchUp,
            total: contributionLimits.employee + contributionLimits.catchUp,
            color: "blue",
        },
        {
            category: "Ages 60-63 🆕",
            employee: contributionLimits.employee,
            catchUp: contributionLimits.superCatchUp,
            total: contributionLimits.employee + contributionLimits.superCatchUp,
            color: "yellow",
            highlight: true,
        },
        {
            category: "Ages 64+",
            employee: contributionLimits.employee,
            catchUp: contributionLimits.catchUp,
            total: contributionLimits.employee + contributionLimits.catchUp,
            color: "green",
        },
    ];

    return (
        <div className="min-h-screen bg-slate-50">
            <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
                <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
                    <Link href="/" className="text-slate-400 hover:text-purple-600">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <div className="flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-purple-600" />
                        <span className="text-lg font-bold text-slate-800">{SITE.year} Contribution Limits</span>
                    </div>
                </div>
            </header>

            <main className="max-w-2xl mx-auto px-4 py-8">
                <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm mb-6">
                    <h1 className="text-xl font-bold text-slate-800 mb-2">
                        {SITE.year} 401k Contribution Limits
                    </h1>
                    <p className="text-sm text-slate-500 mb-6">
                        Official IRS limits for employee elective deferrals
                    </p>

                    {/* Main Limits Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-slate-100">
                                <tr>
                                    <th className="px-4 py-3 text-left font-semibold text-slate-600">Age Group</th>
                                    <th className="px-4 py-3 text-right font-semibold text-slate-600">Base</th>
                                    <th className="px-4 py-3 text-right font-semibold text-slate-600">Catch-Up</th>
                                    <th className="px-4 py-3 text-right font-semibold text-slate-600">Total</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {limitsData.map((row) => (
                                    <tr key={row.category} className={row.highlight ? 'bg-yellow-50' : ''}>
                                        <td className="px-4 py-3 font-medium">{row.category}</td>
                                        <td className="px-4 py-3 text-right">{formatCurrency(row.employee)}</td>
                                        <td className="px-4 py-3 text-right text-purple-600">
                                            {row.catchUp > 0 ? `+${formatCurrency(row.catchUp)}` : '-'}
                                        </td>
                                        <td className="px-4 py-3 text-right font-bold text-green-600">
                                            {formatCurrency(row.total)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* 2025 Super Catch-Up Highlight */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-6">
                    <div className="flex items-start gap-3">
                        <Info className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <h3 className="font-bold text-yellow-800 mb-2">NEW for {SITE.year}: Super Catch-Up</h3>
                            <p className="text-sm text-yellow-700 mb-3">
                                Under SECURE 2.0, participants aged 60-63 can contribute an additional
                                <strong> {formatCurrency(contributionLimits.superCatchUp)}</strong> (up from {formatCurrency(contributionLimits.catchUp)}).
                                This is the highest catch-up amount ever allowed!
                            </p>
                            <div className="bg-yellow-100 rounded-lg p-3">
                                <p className="text-sm font-semibold text-yellow-800">
                                    Ages 60-63 Max: {formatCurrency(contributionLimits.employee)} + {formatCurrency(contributionLimits.superCatchUp)} =
                                    <span className="text-lg ml-1">{formatCurrency(contributionLimits.employee + contributionLimits.superCatchUp)}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Other Limits */}
                <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm mb-6">
                    <h3 className="font-bold text-slate-800 mb-4">Other {SITE.year} Limits</h3>
                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between py-2 border-b border-slate-100">
                            <span>Total Annual Additions (Employee + Employer)</span>
                            <span className="font-bold">{formatCurrency(contributionLimits.total)}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-slate-100">
                            <span>Compensation Limit (for calculations)</span>
                            <span className="font-bold">{formatCurrency(contributionLimits.compensationLimit)}</span>
                        </div>
                        <div className="flex justify-between py-2">
                            <span>Required Minimum Distribution Age</span>
                            <span className="font-bold">{ageThresholds.requiredMinDistribution}</span>
                        </div>
                    </div>
                </div>

                <div className="my-8 p-6 bg-white border border-slate-200 rounded-xl text-center">
                    <p className="text-sm text-slate-400">Advertisement</p>
                </div>

                <Link href="/calculator" className="block bg-purple-600 hover:bg-purple-700 text-white rounded-lg p-4 text-center font-bold">
                    Calculate Your 401k Growth →
                </Link>
            </main>
        </div>
    );
}
