"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowDownCircle, AlertTriangle } from "lucide-react";
import { SITE, RETIREMENT_CONSTANTS, calculateWithdrawal, formatCurrency } from "../site-config";

export default function WithdrawalPage() {
    const { earlyWithdrawal } = RETIREMENT_CONSTANTS;

    const [withdrawalAmount, setWithdrawalAmount] = useState("50000");
    const [age, setAge] = useState("55");
    const [federalTaxRate, setFederalTaxRate] = useState("22");
    const [stateTaxRate, setStateTaxRate] = useState("5");

    const result = calculateWithdrawal(
        parseInt(withdrawalAmount.replace(/[^0-9]/g, '')) || 0,
        parseFloat(age) || 55,
        parseFloat(federalTaxRate) || 22,
        parseFloat(stateTaxRate) || 0
    );

    return (
        <div className="min-h-screen bg-slate-50">
            <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
                <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
                    <Link href="/" className="text-slate-400 hover:text-purple-600">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <div className="flex items-center gap-2">
                        <ArrowDownCircle className="w-5 h-5 text-purple-600" />
                        <span className="text-lg font-bold text-slate-800">Withdrawal Calculator</span>
                    </div>
                </div>
            </header>

            <main className="max-w-2xl mx-auto px-4 py-8">
                <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm mb-6">
                    <h1 className="text-xl font-bold text-slate-800 mb-2">
                        401k Withdrawal Calculator
                    </h1>
                    <p className="text-sm text-slate-500 mb-6">
                        See taxes and penalties on 401k distributions
                    </p>

                    <div className="space-y-4 mb-6">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Withdrawal Amount</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                                <input
                                    type="text"
                                    value={parseInt(withdrawalAmount).toLocaleString() || ''}
                                    onChange={(e) => setWithdrawalAmount(e.target.value.replace(/[^0-9]/g, ''))}
                                    className="w-full pl-7 pr-3 py-3 border-2 border-slate-300 rounded-lg text-xl font-bold"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Your Age at Withdrawal</label>
                            <input
                                type="number"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Federal Tax Rate</label>
                                <div className="relative">
                                    <input
                                        type="number" step="1"
                                        value={federalTaxRate}
                                        onChange={(e) => setFederalTaxRate(e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg"
                                    />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">%</span>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">State Tax Rate</label>
                                <div className="relative">
                                    <input
                                        type="number" step="1"
                                        value={stateTaxRate}
                                        onChange={(e) => setStateTaxRate(e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg"
                                    />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Early Withdrawal Warning */}
                {result.isEarlyWithdrawal && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <h4 className="font-semibold text-red-800">Early Withdrawal Penalty!</h4>
                            <p className="text-sm text-red-700">
                                Withdrawing before age {earlyWithdrawal.penaltyFreeAge} incurs a 10% early withdrawal penalty
                                ({formatCurrency(result.earlyPenalty)} on this amount).
                            </p>
                        </div>
                    </div>
                )}

                {/* Results */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-6">
                    <div className="bg-gradient-to-r from-slate-700 to-slate-800 text-white p-6 text-center">
                        <p className="text-sm text-slate-300 mb-1">You&apos;ll Receive</p>
                        <p className="text-5xl font-bold text-green-400">{formatCurrency(result.netAmount)}</p>
                        <p className="text-slate-300 mt-2">after taxes & penalties</p>
                    </div>

                    <div className="p-6 space-y-3 text-sm">
                        <div className="flex justify-between py-2 border-b border-slate-100">
                            <span>Withdrawal Amount</span>
                            <span className="font-medium">{formatCurrency(result.withdrawalAmount)}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-slate-100">
                            <span>Federal Tax ({federalTaxRate}%)</span>
                            <span className="font-medium text-red-600">-{formatCurrency(result.federalTax)}</span>
                        </div>
                        {result.stateTax > 0 && (
                            <div className="flex justify-between py-2 border-b border-slate-100">
                                <span>State Tax ({stateTaxRate}%)</span>
                                <span className="font-medium text-red-600">-{formatCurrency(result.stateTax)}</span>
                            </div>
                        )}
                        {result.earlyPenalty > 0 && (
                            <div className="flex justify-between py-2 border-b border-slate-100">
                                <span>Early Withdrawal Penalty (10%)</span>
                                <span className="font-medium text-red-600">-{formatCurrency(result.earlyPenalty)}</span>
                            </div>
                        )}
                        <div className="flex justify-between py-2 border-b border-slate-100">
                            <span className="font-semibold">Total Deductions</span>
                            <span className="font-bold text-red-600">-{formatCurrency(result.totalTaxes)}</span>
                        </div>
                        <div className="flex justify-between py-3 bg-green-50 rounded-lg px-3">
                            <span className="font-semibold">Net Amount</span>
                            <span className="font-bold text-green-600">{formatCurrency(result.netAmount)}</span>
                        </div>
                        <div className="text-center pt-2">
                            <span className="text-slate-500">Effective Tax Rate: </span>
                            <span className="font-bold text-slate-700">{result.effectiveTaxRate}%</span>
                        </div>
                    </div>
                </div>

                {/* Penalty-Free Exceptions */}
                <div className="bg-slate-100 rounded-xl p-6 mb-6">
                    <h3 className="font-bold text-slate-800 mb-3">Penalty-Free Withdrawal Exceptions</h3>
                    <ul className="space-y-2 text-sm text-slate-600">
                        <li className="flex items-start gap-2">
                            <span className="text-green-500">✓</span>
                            Age 59½ or older
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-500">✓</span>
                            Rule of 55 (left job at 55+)
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-500">✓</span>
                            Disability
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-500">✓</span>
                            Substantially Equal Periodic Payments (SEPP)
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-500">✓</span>
                            Medical expenses exceeding 7.5% of AGI
                        </li>
                    </ul>
                </div>

                <div className="my-8 p-6 bg-white border border-slate-200 rounded-xl text-center">
                    <p className="text-sm text-slate-400">Advertisement</p>
                </div>

                <Link href="/calculator" className="block bg-purple-600 hover:bg-purple-700 text-white rounded-lg p-4 text-center font-bold">
                    Calculate 401k Growth →
                </Link>
            </main>
        </div>
    );
}
