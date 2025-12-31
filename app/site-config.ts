// ============================================
// ANNUITY-CALC SITE CONFIGURATION
// 2025 Annuity Calculator
// Green/Growth Theme
// ============================================

import { Calculator, DollarSign, TrendingUp, Clock, PiggyBank, ArrowDownCircle } from 'lucide-react';

// ============================================
// SITE METADATA
// ============================================
export const SITE = {
    name: "Annuity Calculator",
    tagline: "Free 2025 Annuity Calculator",
    description: "Calculate your annuity payments, future value, and retirement income. Compare fixed, variable, and indexed annuities. Free 2025 annuity calculator.",
    year: 2025,
    baseUrl: "https://annuity.mysmartcalculators.com",
};

// ============================================
// ANNUITY CONSTANTS
// ============================================
export const ANNUITY_CONSTANTS = {
    // Annuity Types
    annuityTypes: {
        fixed: {
            name: "Fixed Annuity",
            avgRate: 5.5,
            minRate: 4.0,
            maxRate: 6.5,
        },
        variable: {
            name: "Variable Annuity",
            avgRate: 7.0,
            minRate: -10,
            maxRate: 15,
        },
        indexed: {
            name: "Indexed Annuity",
            avgRate: 6.0,
            minRate: 0,
            maxRate: 10,
            participationRate: 0.80,
            cap: 8,
        },
    },

    // Payout Options
    payoutOptions: {
        lifeOnly: {
            name: "Life Only",
            description: "Highest payments, ends at death",
            factor: 1.0,
        },
        lifePeriodCertain: {
            name: "Life with Period Certain",
            description: "Guaranteed minimum years",
            factor: 0.92,
        },
        jointSurvivor: {
            name: "Joint & Survivor",
            description: "Continues for surviving spouse",
            factor: 0.85,
        },
    },

    // IRS Rules
    irsRules: {
        earlyWithdrawalAge: 59.5,
        earlyWithdrawalPenalty: 0.10,
        requiredMinDistributionAge: 73,
        exclusionRatio: true,
    },

    // Surrender Charges (typical)
    surrenderCharges: {
        year1: 7,
        year2: 6,
        year3: 5,
        year4: 4,
        year5: 3,
        year6: 2,
        year7: 1,
        year8: 0,
    },

    // Default values
    defaults: {
        principal: 100000,
        interestRate: 5.5,
        years: 20,
        paymentFrequency: 12,
        currentAge: 60,
        retirementAge: 65,
    },
};

// ============================================
// CALCULATOR DEFINITIONS
// ============================================
export const CALCULATORS = [
    {
        id: "calculator",
        name: "Annuity Calculator",
        shortName: "Calculator",
        description: "Calculate annuity payments and value",
        longDescription: "Calculate your annuity future value, monthly payments, and total payout over time.",
        icon: Calculator,
        category: "retirement",
        keywords: ["annuity calculator", "annuity payment", "annuity value"],
        featured: true,
    },
    {
        id: "payout",
        name: "Payout Calculator",
        shortName: "Payout",
        description: "Calculate annuity income payments",
        longDescription: "See how much monthly income your annuity will provide based on your principal and payout option.",
        icon: DollarSign,
        category: "retirement",
        keywords: ["annuity payout", "annuity income", "monthly annuity payment"],
        featured: true,
    },
    {
        id: "growth",
        name: "Growth Calculator",
        shortName: "Growth",
        description: "Project annuity growth over time",
        longDescription: "See how your annuity will grow during the accumulation phase with compound interest.",
        icon: TrendingUp,
        category: "retirement",
        keywords: ["annuity growth", "deferred annuity", "annuity accumulation"],
        featured: true,
    },
    {
        id: "comparison",
        name: "Annuity Comparison",
        shortName: "Compare",
        description: "Compare fixed vs variable annuities",
        longDescription: "Compare different annuity types to find the best option for your retirement goals.",
        icon: PiggyBank,
        category: "retirement",
        keywords: ["fixed vs variable annuity", "annuity comparison", "best annuity"],
        featured: true,
    },
    {
        id: "surrender",
        name: "Surrender Calculator",
        shortName: "Surrender",
        description: "Calculate surrender charges",
        longDescription: "See the surrender charges if you withdraw early from your annuity contract.",
        icon: ArrowDownCircle,
        category: "retirement",
        keywords: ["annuity surrender charge", "early withdrawal annuity", "annuity penalty"],
        featured: false,
    },
    {
        id: "timeline",
        name: "Payment Timeline",
        shortName: "Timeline",
        description: "View payment schedule",
        longDescription: "See your complete annuity payment schedule year by year.",
        icon: Clock,
        category: "retirement",
        keywords: ["annuity schedule", "annuity timeline", "payment schedule"],
        featured: false,
    },
] as const;

// ============================================
// ANNUITY CALCULATIONS
// ============================================

export interface AnnuityResult {
    principal: number;
    interestRate: number;
    years: number;
    futureValue: number;
    totalInterest: number;
    monthlyPayment: number;
    totalPayments: number;
}

export function calculateAnnuity(
    principal: number,
    interestRate: number,
    years: number,
    isImmediate: boolean = false
): AnnuityResult {
    const rate = interestRate / 100;
    const monthlyRate = rate / 12;
    const months = years * 12;

    // Future Value (accumulation phase)
    const futureValue = principal * Math.pow(1 + rate, years);
    const totalInterest = futureValue - principal;

    // Monthly payment (payout phase)
    let monthlyPayment: number;
    if (isImmediate) {
        // Immediate annuity - start paying now
        monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) /
            (Math.pow(1 + monthlyRate, months) - 1);
    } else {
        // Deferred annuity - payout after accumulation
        monthlyPayment = futureValue * (monthlyRate * Math.pow(1 + monthlyRate, months)) /
            (Math.pow(1 + monthlyRate, months) - 1);
    }

    return {
        principal,
        interestRate,
        years,
        futureValue: Math.round(futureValue),
        totalInterest: Math.round(totalInterest),
        monthlyPayment: Math.round(monthlyPayment),
        totalPayments: Math.round(monthlyPayment * months),
    };
}

// ============================================
// PAYOUT CALCULATION
// ============================================

export interface PayoutResult {
    principal: number;
    monthlyPayment: number;
    yearlyPayment: number;
    payoutYears: number;
    totalPayout: number;
    payoutType: string;
}

export function calculatePayout(
    principal: number,
    interestRate: number,
    payoutYears: number,
    payoutType: 'lifeOnly' | 'lifePeriodCertain' | 'jointSurvivor' = 'lifeOnly'
): PayoutResult {
    const { payoutOptions } = ANNUITY_CONSTANTS;
    const factor = payoutOptions[payoutType].factor;

    const monthlyRate = interestRate / 100 / 12;
    const months = payoutYears * 12;

    const basePayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);

    const monthlyPayment = basePayment * factor;

    return {
        principal,
        monthlyPayment: Math.round(monthlyPayment),
        yearlyPayment: Math.round(monthlyPayment * 12),
        payoutYears,
        totalPayout: Math.round(monthlyPayment * months),
        payoutType: payoutOptions[payoutType].name,
    };
}

// ============================================
// GROWTH PROJECTION
// ============================================

export interface GrowthResult {
    principal: number;
    years: number;
    interestRate: number;
    yearByYearData: YearlyData[];
    finalBalance: number;
    totalGrowth: number;
}

export interface YearlyData {
    year: number;
    startBalance: number;
    interest: number;
    endBalance: number;
}

export function calculateGrowth(
    principal: number,
    interestRate: number,
    years: number
): GrowthResult {
    const rate = interestRate / 100;
    const yearByYearData: YearlyData[] = [];
    let balance = principal;

    for (let i = 1; i <= years; i++) {
        const startBalance = balance;
        const interest = balance * rate;
        balance = balance + interest;

        yearByYearData.push({
            year: i,
            startBalance: Math.round(startBalance),
            interest: Math.round(interest),
            endBalance: Math.round(balance),
        });
    }

    return {
        principal,
        years,
        interestRate,
        yearByYearData,
        finalBalance: Math.round(balance),
        totalGrowth: Math.round(balance - principal),
    };
}

// ============================================
// SURRENDER CHARGE CALCULATION
// ============================================

export interface SurrenderResult {
    principal: number;
    currentValue: number;
    yearsHeld: number;
    surrenderChargePercent: number;
    surrenderCharge: number;
    netValue: number;
    earlyWithdrawalPenalty: number;
    totalDeductions: number;
}

export function calculateSurrender(
    principal: number,
    currentValue: number,
    yearsHeld: number,
    age: number
): SurrenderResult {
    const { surrenderCharges, irsRules } = ANNUITY_CONSTANTS;

    // Get surrender charge based on years held
    const yearKey = `year${Math.min(yearsHeld, 8)}` as keyof typeof surrenderCharges;
    const surrenderChargePercent = surrenderCharges[yearKey] || 0;
    const surrenderCharge = currentValue * (surrenderChargePercent / 100);

    // Early withdrawal penalty from IRS
    const earlyWithdrawalPenalty = age < irsRules.earlyWithdrawalAge
        ? (currentValue - principal) * irsRules.earlyWithdrawalPenalty
        : 0;

    const totalDeductions = surrenderCharge + earlyWithdrawalPenalty;
    const netValue = currentValue - totalDeductions;

    return {
        principal,
        currentValue,
        yearsHeld,
        surrenderChargePercent,
        surrenderCharge: Math.round(surrenderCharge),
        netValue: Math.round(netValue),
        earlyWithdrawalPenalty: Math.round(earlyWithdrawalPenalty),
        totalDeductions: Math.round(totalDeductions),
    };
}

// ============================================
// COMPARISON CALCULATION
// ============================================

export interface ComparisonResult {
    fixed: { futureValue: number; monthlyPayout: number };
    variable: { futureValue: number; monthlyPayout: number; risk: string };
    indexed: { futureValue: number; monthlyPayout: number };
    bestForSafety: string;
    bestForGrowth: string;
}

export function compareAnnuities(
    principal: number,
    years: number,
    payoutYears: number
): ComparisonResult {
    const { annuityTypes } = ANNUITY_CONSTANTS;

    const fixedResult = calculateAnnuity(principal, annuityTypes.fixed.avgRate, years);
    const variableResult = calculateAnnuity(principal, annuityTypes.variable.avgRate, years);
    const indexedResult = calculateAnnuity(principal, annuityTypes.indexed.avgRate, years);

    const fixedPayout = calculatePayout(fixedResult.futureValue, annuityTypes.fixed.avgRate, payoutYears);
    const variablePayout = calculatePayout(variableResult.futureValue, annuityTypes.variable.avgRate, payoutYears);
    const indexedPayout = calculatePayout(indexedResult.futureValue, annuityTypes.indexed.avgRate, payoutYears);

    return {
        fixed: {
            futureValue: fixedResult.futureValue,
            monthlyPayout: fixedPayout.monthlyPayment,
        },
        variable: {
            futureValue: variableResult.futureValue,
            monthlyPayout: variablePayout.monthlyPayment,
            risk: "High - returns can vary significantly",
        },
        indexed: {
            futureValue: indexedResult.futureValue,
            monthlyPayout: indexedPayout.monthlyPayment,
        },
        bestForSafety: "Fixed Annuity",
        bestForGrowth: "Variable Annuity",
    };
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}

export function formatCurrencyWithCents(amount: number): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
}

export function formatPercent(value: number): string {
    return `${value.toFixed(1)}%`;
}

export function parseFormattedNumber(value: string): number {
    return parseInt(value.replace(/[^0-9]/g, '')) || 0;
}
