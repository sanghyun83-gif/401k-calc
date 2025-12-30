"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, TrendingUp, Star } from "lucide-react";
import { SITE, RETIREMENT_CONSTANTS, calculateCatchUp, formatCurrency } from "../site-config";

export default function CatchUpPage() {
    const { contributionLimits, ageThresholds } = RETIREMENT_CONSTANTS;

    const [age, setAge] = useState("55");
    const [retirementAge, setRetirementAge] = useState("65");
    const [expectedReturn, setExpectedReturn] = useState("7");

    const yearsToRetirement = Math.max(0, parseInt(retirementAge) - parseInt(age));
    const result = calculateCatchUp(
        parseInt(age) || 55,
        yearsToRetirement,
        parseFloat(expectedReturn) || 7
    );

    return (
        <div className="min-h-screen bg-slate-50">
            <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
                <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
                    <Link href="/" className="text-slate-400 hover:text-purple-600">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <div className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-purple-600" />
                        <span className="text-lg font-bold text-slate-800">Catch-Up Contributions</span>
                    </div>
                    <span className="ml-auto text-xs text-white bg-purple-600 px-2 py-1 rounded-full font-bold">
                        {SITE.year}
                    </span>
                </div>
            </header>

            <main className="max-w-2xl mx-auto px-4 py-8">
                <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm mb-6">
                    <h1 className="text-xl font-bold text-slate-800 mb-2">
                        Catch-Up Contribution Calculator
                    </h1>
                    <p className="text-sm text-slate-500 mb-6">
                        Extra contributions for those 50 and older
                    </p>

                    <div className="space-y-4 mb-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Your Age</label>
                                <input
                                    type="number"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
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
                    </div>
                </div>

                {/* Results */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-6">
                    <div className={`p-6 text-center ${result.isSuperCatchUp ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' : 'bg-gradient-to-r from-purple-600 to-purple-700'} text-white`}>
                        {result.isSuperCatchUp && (
                            <div className="flex items-center justify-center gap-1 mb-2">
                                <Star className="w-4 h-4" />
                                <span className="text-sm font-semibold">Super Catch-Up Eligible!</span>
                                <Star className="w-4 h-4" />
                            </div>
                        )}
                        <p className="text-sm mb-1">{SITE.year} Maximum Contribution</p>
                        <p className="text-5xl font-bold">{formatCurrency(result.totalLimit)}</p>
                        <p className="text-sm mt-2 opacity-80">per year</p>
                    </div>

                    <div className="p-6 space-y-3 text-sm">
                        <div className="flex justify-between py-2 border-b border-slate-100">
                            <span>Base Limit</span>
                            <span className="font-medium">{formatCurrency(result.baseLimit)}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-slate-100">
                            <span>Catch-Up Amount</span>
                            <span className={`font-medium ${result.isSuperCatchUp ? 'text-yellow-600' : 'text-purple-600'}`}>
                                +{formatCurrency(result.catchUpAmount)}
                            </span>
                        </div>
                        <div className="flex justify-between py-3 bg-purple-50 rounded-lg px-3">
                            <span className="font-semibold">Total Maximum</span>
                            <span className="font-bold text-purple-600">{formatCurrency(result.totalLimit)}</span>
                        </div>
                    </div>
                </div>

                {/* Projected Growth */}
                {yearsToRetirement > 0 && result.catchUpAmount > 0 && (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
                        <h3 className="font-bold text-green-800 mb-3">Catch-Up Contribution Impact</h3>
                        <div className="grid grid-cols-2 gap-4 text-center">
                            <div>
                                <p className="text-sm text-green-600">Extra Savings ({yearsToRetirement} yrs)</p>
                                <p className="text-xl font-bold text-green-700">{formatCurrency(result.additionalSavings)}</p>
                            </div>
                            <div>
                                <p className="text-sm text-green-600">With {expectedReturn}% Growth</p>
                                <p className="text-xl font-bold text-green-700">{formatCurrency(result.projectedGrowth)}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Age Breakdown */}
                <div className="bg-white rounded-xl p-6 border border-slate-200 mb-6">
                    <h3 className="font-bold text-slate-800 mb-4">{SITE.year} Catch-Up by Age</h3>
                    <div className="space-y-3">
                        <div className={`flex justify-between items-center p-3 rounded-lg ${parseInt(age) < 50 ? 'bg-slate-100' : 'bg-slate-50'}`}>
                            <span>Under 50</span>
                            <span className="font-medium">No catch-up ({formatCurrency(contributionLimits.employee)} max)</span>
                        </div>
                        <div className={`flex justify-between items-center p-3 rounded-lg ${parseInt(age) >= 50 && parseInt(age) < 60 ? 'bg-purple-100 border border-purple-300' : 'bg-slate-50'}`}>
                            <span>Ages 50-59</span>
                            <span className="font-medium">+{formatCurrency(contributionLimits.catchUp)} ({formatCurrency(contributionLimits.employee + contributionLimits.catchUp)} max)</span>
                        </div>
                        <div className={`flex justify-between items-center p-3 rounded-lg ${parseInt(age) >= 60 && parseInt(age) <= 63 ? 'bg-yellow-100 border border-yellow-300' : 'bg-slate-50'}`}>
                            <div className="flex items-center gap-2">
                                <span>Ages 60-63</span>
                                <span className="text-xs bg-yellow-400 text-yellow-900 px-1.5 py-0.5 rounded">NEW!</span>
                            </div>
                            <span className="font-bold text-yellow-700">+{formatCurrency(contributionLimits.superCatchUp)} ({formatCurrency(contributionLimits.employee + contributionLimits.superCatchUp)} max)</span>
                        </div>
                        <div className={`flex justify-between items-center p-3 rounded-lg ${parseInt(age) >= 64 ? 'bg-green-100 border border-green-300' : 'bg-slate-50'}`}>
                            <span>Ages 64+</span>
                            <span className="font-medium">+{formatCurrency(contributionLimits.catchUp)} ({formatCurrency(contributionLimits.employee + contributionLimits.catchUp)} max)</span>
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
