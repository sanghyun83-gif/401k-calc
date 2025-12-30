"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Scale } from "lucide-react";
import { SITE, compareRothVsTraditional, formatCurrency } from "../site-config";

export default function RothVsTraditionalPage() {
    const [annualContribution, setAnnualContribution] = useState("10000");
    const [yearsToRetirement, setYearsToRetirement] = useState("30");
    const [expectedReturn, setExpectedReturn] = useState("7");
    const [currentTaxRate, setCurrentTaxRate] = useState("22");
    const [retirementTaxRate, setRetirementTaxRate] = useState("15");

    const result = compareRothVsTraditional(
        parseInt(annualContribution) || 0,
        parseInt(yearsToRetirement) || 0,
        parseFloat(expectedReturn) || 7,
        parseFloat(currentTaxRate) || 22,
        parseFloat(retirementTaxRate) || 15
    );

    return (
        <div className="min-h-screen bg-slate-50">
            <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
                <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
                    <Link href="/" className="text-slate-400 hover:text-purple-600">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <div className="flex items-center gap-2">
                        <Scale className="w-5 h-5 text-purple-600" />
                        <span className="text-lg font-bold text-slate-800">Roth vs Traditional</span>
                    </div>
                </div>
            </header>

            <main className="max-w-2xl mx-auto px-4 py-8">
                <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm mb-6">
                    <h1 className="text-xl font-bold text-slate-800 mb-2">
                        Roth vs Traditional 401k
                    </h1>
                    <p className="text-sm text-slate-500 mb-6">
                        Compare pre-tax (Traditional) vs after-tax (Roth) contributions
                    </p>

                    <div className="space-y-4 mb-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Annual Contribution</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                                    <input
                                        type="text"
                                        value={parseInt(annualContribution).toLocaleString() || ''}
                                        onChange={(e) => setAnnualContribution(e.target.value.replace(/[^0-9]/g, ''))}
                                        className="w-full pl-7 pr-3 py-3 border-2 border-slate-300 rounded-lg"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Years to Retirement</label>
                                <input
                                    type="number"
                                    value={yearsToRetirement}
                                    onChange={(e) => setYearsToRetirement(e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Expected Return: {expectedReturn}%</label>
                            <input
                                type="range"
                                min="4" max="12" step="0.5"
                                value={expectedReturn}
                                onChange={(e) => setExpectedReturn(e.target.value)}
                                className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Current Tax Rate</label>
                                <div className="relative">
                                    <input
                                        type="number" step="1"
                                        value={currentTaxRate}
                                        onChange={(e) => setCurrentTaxRate(e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg"
                                    />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">%</span>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Retirement Tax Rate</label>
                                <div className="relative">
                                    <input
                                        type="number" step="1"
                                        value={retirementTaxRate}
                                        onChange={(e) => setRetirementTaxRate(e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg"
                                    />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Comparison */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className={`bg-white rounded-xl border-2 p-6 text-center ${result.betterOption === 'traditional' ? 'border-green-500 bg-green-50' : 'border-slate-200'}`}>
                        <h3 className="font-bold text-slate-800 mb-2">Traditional</h3>
                        <p className="text-xs text-slate-500 mb-3">Tax Deferred</p>
                        <p className="text-2xl font-bold text-blue-600">{formatCurrency(result.traditionalBalance)}</p>
                        <p className="text-xs text-slate-500 mt-1">Pre-tax balance</p>
                        <div className="mt-4 pt-4 border-t border-slate-200">
                            <p className="text-xs text-slate-500">After {retirementTaxRate}% tax:</p>
                            <p className="text-xl font-bold text-slate-800">{formatCurrency(result.traditionalAfterTax)}</p>
                        </div>
                        {result.betterOption === 'traditional' && (
                            <span className="inline-block mt-3 text-xs bg-green-500 text-white px-2 py-1 rounded-full">Better by {formatCurrency(result.difference)}</span>
                        )}
                    </div>

                    <div className={`bg-white rounded-xl border-2 p-6 text-center ${result.betterOption === 'roth' ? 'border-green-500 bg-green-50' : 'border-slate-200'}`}>
                        <h3 className="font-bold text-slate-800 mb-2">Roth</h3>
                        <p className="text-xs text-slate-500 mb-3">Tax Free Growth</p>
                        <p className="text-2xl font-bold text-purple-600">{formatCurrency(result.rothBalance)}</p>
                        <p className="text-xs text-slate-500 mt-1">Tax-free balance</p>
                        <div className="mt-4 pt-4 border-t border-slate-200">
                            <p className="text-xs text-slate-500">After 0% tax:</p>
                            <p className="text-xl font-bold text-slate-800">{formatCurrency(result.rothAfterTax)}</p>
                        </div>
                        {result.betterOption === 'roth' && (
                            <span className="inline-block mt-3 text-xs bg-green-500 text-white px-2 py-1 rounded-full">Better by {formatCurrency(result.difference)}</span>
                        )}
                    </div>
                </div>

                {/* Explanation */}
                <div className="bg-slate-100 rounded-xl p-6 mb-6">
                    <h3 className="font-bold text-slate-800 mb-4">How It Works</h3>
                    <div className="space-y-4 text-sm">
                        <div className="flex gap-3">
                            <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">T</span>
                            <div>
                                <p className="font-medium">Traditional 401k</p>
                                <p className="text-slate-500">Save {currentTaxRate}% in taxes now, pay taxes when you withdraw</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <span className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold">R</span>
                            <div>
                                <p className="font-medium">Roth 401k</p>
                                <p className="text-slate-500">Pay taxes now, withdraw tax-free in retirement</p>
                            </div>
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
