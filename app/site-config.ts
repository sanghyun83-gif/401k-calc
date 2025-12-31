// ============================================
// 401K-CALC SITE CONFIGURATION
// 2025 401k Calculator
// Purple/Wealth Theme
// ============================================

import { Calculator, DollarSign, TrendingUp, Users, PiggyBank, ArrowDownCircle, Scale } from 'lucide-react';

// ============================================
// SITE METADATA
// ============================================
export const SITE = {
    name: "401k Calculator",
    tagline: "Free 2025 Retirement Calculator",
    description: "Calculate your 401k retirement savings for free. See contribution limits, employer matching, Roth vs Traditional comparison, and projected growth.",
    year: 2025,
    baseUrl: "https://401k.mysmartcalculators.com",
};

// ============================================
// 2025 401k CONSTANTS (IRS Official)
// ============================================
export const RETIREMENT_CONSTANTS = {
    // 2025 Contribution Limits (IRS Notice 2024-80)
    contributionLimits: {
        employee: 23500,         // Employee elective deferral limit
        catchUp: 7500,           // Standard catch-up (age 50-59, 64+)
        superCatchUp: 11250,     // NEW 2025: Super catch-up (age 60-63)
        total: 70000,            // Total annual additions limit (employee + employer)
        compensationLimit: 350000, // Maximum compensation considered
    },

    // Age thresholds
    ageThresholds: {
        catchUpAge: 50,          // When catch-up contributions begin
        superCatchUpStart: 60,   // NEW 2025: Super catch-up starts
        superCatchUpEnd: 63,     // Super catch-up ends
        requiredMinDistribution: 73, // RMD age
    },

    // Tax Brackets 2025 (for Roth vs Traditional comparison)
    taxBrackets: {
        single: [
            { min: 0, max: 11925, rate: 0.10 },
            { min: 11925, max: 48475, rate: 0.12 },
            { min: 48475, max: 103350, rate: 0.22 },
            { min: 103350, max: 197300, rate: 0.24 },
            { min: 197300, max: 250525, rate: 0.32 },
            { min: 250525, max: 626350, rate: 0.35 },
            { min: 626350, max: Infinity, rate: 0.37 },
        ],
        marriedFilingJointly: [
            { min: 0, max: 23850, rate: 0.10 },
            { min: 23850, max: 96950, rate: 0.12 },
            { min: 96950, max: 206700, rate: 0.22 },
            { min: 206700, max: 394600, rate: 0.24 },
            { min: 394600, max: 501050, rate: 0.32 },
            { min: 501050, max: 751600, rate: 0.35 },
            { min: 751600, max: Infinity, rate: 0.37 },
        ],
    },

    // Average employer match data
    employerMatch: {
        averageMatchPercent: 4.5,    // Average employer matches 4.5%
        averageMatchLimit: 6,         // Up to 6% of salary
        vestingYears: 4,              // Average vesting period
    },

    // Investment assumptions
    investmentDefaults: {
        annualReturn: 7,              // Historical average S&P 500
        inflationRate: 3,             // Average inflation
        retirementAge: 65,
        lifeExpectancy: 90,
    },

    // Early withdrawal
    earlyWithdrawal: {
        penaltyRate: 0.10,            // 10% penalty before 59.5
        penaltyFreeAge: 59.5,
        ruleOf55Age: 55,              // Rule of 55 exception
    },

    // Defaults for inputs
    defaults: {
        currentAge: 30,
        salary: 75000,
        contributionPercent: 10,
        currentBalance: 50000,
        employerMatchPercent: 4,
        employerMatchLimit: 6,
        expectedReturn: 7,
        retirementAge: 65,
    },
};

// ============================================
// CALCULATOR DEFINITIONS
// ============================================
export const CALCULATORS = [
    {
        id: "calculator",
        name: "401k Calculator",
        shortName: "Calculator",
        description: "Calculate your retirement savings",
        longDescription: "See how much your 401k will grow by retirement based on contributions and returns.",
        icon: Calculator,
        category: "retirement",
        keywords: ["401k calculator", "retirement calculator", "401k growth"],
        featured: true,
    },
    {
        id: "limits",
        name: "Contribution Limits",
        shortName: "Limits",
        description: "2025 401k contribution limits",
        longDescription: "See the official IRS 401k contribution limits for 2025.",
        icon: DollarSign,
        category: "retirement",
        keywords: ["401k limits 2025", "contribution limits", "max 401k"],
        featured: true,
    },
    {
        id: "employer-match",
        name: "Employer Match",
        shortName: "Match",
        description: "Calculate your employer matching",
        longDescription: "See how much free money you're getting from employer match.",
        icon: Users,
        category: "retirement",
        keywords: ["employer match calculator", "401k match", "company match"],
        featured: true,
    },
    {
        id: "roth-vs-traditional",
        name: "Roth vs Traditional",
        shortName: "Roth vs Trad",
        description: "Compare Roth and Traditional 401k",
        longDescription: "Should you contribute to Roth or Traditional 401k? Compare tax impacts.",
        icon: Scale,
        category: "retirement",
        keywords: ["roth vs traditional", "roth 401k", "pre-tax vs after-tax"],
        featured: true,
    },
    {
        id: "catch-up",
        name: "Catch-Up Calculator",
        shortName: "Catch-Up",
        description: "50+ catch-up contributions",
        longDescription: "Calculate extra contributions allowed for ages 50 and older.",
        icon: TrendingUp,
        category: "retirement",
        keywords: ["catch up contribution", "over 50 401k", "super catch up"],
        featured: false,
    },
    {
        id: "withdrawal",
        name: "Withdrawal Calculator",
        shortName: "Withdrawal",
        description: "Calculate 401k withdrawals",
        longDescription: "See taxes and penalties on 401k withdrawals at any age.",
        icon: ArrowDownCircle,
        category: "retirement",
        keywords: ["401k withdrawal", "early withdrawal penalty", "401k distribution"],
        featured: false,
    },
] as const;

// ============================================
// 401K GROWTH CALCULATION
// ============================================

export interface RetirementResult {
    currentAge: number;
    retirementAge: number;
    yearsToRetirement: number;
    currentBalance: number;
    annualContribution: number;
    employerMatch: number;
    totalAnnualAddition: number;
    projectedBalance: number;
    totalContributions: number;
    totalEmployerMatch: number;
    totalGrowth: number;
    yearByYearData: YearlyData[];
}

export interface YearlyData {
    age: number;
    year: number;
    contribution: number;
    employerMatch: number;
    growth: number;
    balance: number;
}

export function calculate401kGrowth(
    currentAge: number,
    salary: number,
    contributionPercent: number,
    currentBalance: number,
    employerMatchPercent: number,
    employerMatchLimit: number,
    expectedReturn: number,
    retirementAge: number
): RetirementResult {
    const yearsToRetirement = retirementAge - currentAge;
    const monthlyReturn = expectedReturn / 100 / 12;
    const { contributionLimits, ageThresholds } = RETIREMENT_CONSTANTS;

    let balance = currentBalance;
    let totalContributions = 0;
    let totalEmployerMatch = 0;
    const yearByYearData: YearlyData[] = [];
    const currentYear = new Date().getFullYear();

    for (let i = 0; i < yearsToRetirement; i++) {
        const age = currentAge + i;
        const year = currentYear + i;

        // Calculate annual contribution (capped at IRS limit)
        let maxContribution = contributionLimits.employee;

        // Add catch-up if eligible
        if (age >= ageThresholds.superCatchUpStart && age <= ageThresholds.superCatchUpEnd) {
            maxContribution += contributionLimits.superCatchUp; // 2025 super catch-up
        } else if (age >= ageThresholds.catchUpAge) {
            maxContribution += contributionLimits.catchUp;
        }

        const desiredContribution = salary * (contributionPercent / 100);
        const annualContribution = Math.min(desiredContribution, maxContribution);

        // Calculate employer match
        const matchableAmount = salary * (employerMatchLimit / 100);
        const actualMatchable = Math.min(annualContribution, matchableAmount);
        const employerMatch = actualMatchable * (employerMatchPercent / employerMatchLimit);

        // Monthly compounding for the year
        const monthlyContribution = (annualContribution + employerMatch) / 12;
        let yearStartBalance = balance;

        for (let month = 0; month < 12; month++) {
            balance = balance * (1 + monthlyReturn) + monthlyContribution;
        }

        const yearGrowth = balance - yearStartBalance - annualContribution - employerMatch;

        totalContributions += annualContribution;
        totalEmployerMatch += employerMatch;

        yearByYearData.push({
            age,
            year,
            contribution: Math.round(annualContribution),
            employerMatch: Math.round(employerMatch),
            growth: Math.round(yearGrowth),
            balance: Math.round(balance),
        });
    }

    const totalGrowth = balance - currentBalance - totalContributions - totalEmployerMatch;

    return {
        currentAge,
        retirementAge,
        yearsToRetirement,
        currentBalance,
        annualContribution: Math.round(salary * (contributionPercent / 100)),
        employerMatch: Math.round((salary * (employerMatchLimit / 100)) * (employerMatchPercent / employerMatchLimit)),
        totalAnnualAddition: Math.round(salary * (contributionPercent / 100) + (salary * (employerMatchLimit / 100)) * (employerMatchPercent / employerMatchLimit)),
        projectedBalance: Math.round(balance),
        totalContributions: Math.round(totalContributions),
        totalEmployerMatch: Math.round(totalEmployerMatch),
        totalGrowth: Math.round(totalGrowth),
        yearByYearData,
    };
}

// ============================================
// EMPLOYER MATCH CALCULATION
// ============================================

export interface EmployerMatchResult {
    salary: number;
    contributionPercent: number;
    employerMatchPercent: number;
    employerMatchLimit: number;
    yourContribution: number;
    employerMatch: number;
    totalAnnual: number;
    freeMoneyPercent: number;
    isMaxingMatch: boolean;
}

export function calculateEmployerMatch(
    salary: number,
    contributionPercent: number,
    employerMatchPercent: number,
    employerMatchLimit: number
): EmployerMatchResult {
    const yourContribution = salary * (contributionPercent / 100);

    // Employer matches up to employerMatchLimit% of salary
    const matchableAmount = salary * (employerMatchLimit / 100);
    const actualMatchable = Math.min(yourContribution, matchableAmount);
    const employerMatch = actualMatchable * (employerMatchPercent / employerMatchLimit);

    const freeMoneyPercent = salary > 0 ? (employerMatch / salary) * 100 : 0;
    const isMaxingMatch = contributionPercent >= employerMatchLimit;

    return {
        salary,
        contributionPercent,
        employerMatchPercent,
        employerMatchLimit,
        yourContribution: Math.round(yourContribution),
        employerMatch: Math.round(employerMatch),
        totalAnnual: Math.round(yourContribution + employerMatch),
        freeMoneyPercent: Math.round(freeMoneyPercent * 10) / 10,
        isMaxingMatch,
    };
}

// ============================================
// ROTH VS TRADITIONAL COMPARISON
// ============================================

export interface RothVsTraditionalResult {
    traditionalBalance: number;
    rothBalance: number;
    traditionalAfterTax: number;
    rothAfterTax: number; // Same as rothBalance (already taxed)
    taxSavingsNow: number;
    taxInRetirement: number;
    betterOption: 'roth' | 'traditional' | 'same';
    difference: number;
}

export function compareRothVsTraditional(
    annualContribution: number,
    yearsToRetirement: number,
    expectedReturn: number,
    currentTaxRate: number,
    retirementTaxRate: number
): RothVsTraditionalResult {
    // Traditional: Contribute pre-tax, pay tax on withdrawal
    // Roth: Contribute after-tax, withdraw tax-free

    const monthlyReturn = expectedReturn / 100 / 12;
    const monthlyContribution = annualContribution / 12;

    // Calculate future value
    let balance = 0;
    for (let month = 0; month < yearsToRetirement * 12; month++) {
        balance = balance * (1 + monthlyReturn) + monthlyContribution;
    }

    const traditionalBalance = balance;
    const traditionalAfterTax = balance * (1 - retirementTaxRate / 100);

    // Roth: Less contribution (after-tax), but grows tax-free
    const rothContribution = annualContribution * (1 - currentTaxRate / 100);
    const monthlyRothContribution = rothContribution / 12;

    let rothBalance = 0;
    for (let month = 0; month < yearsToRetirement * 12; month++) {
        rothBalance = rothBalance * (1 + monthlyReturn) + monthlyRothContribution;
    }

    const taxSavingsNow = annualContribution * (currentTaxRate / 100) * yearsToRetirement;
    const taxInRetirement = traditionalBalance * (retirementTaxRate / 100);

    const difference = rothBalance - traditionalAfterTax;
    let betterOption: 'roth' | 'traditional' | 'same' = 'same';
    if (difference > 1000) betterOption = 'roth';
    else if (difference < -1000) betterOption = 'traditional';

    return {
        traditionalBalance: Math.round(traditionalBalance),
        rothBalance: Math.round(rothBalance),
        traditionalAfterTax: Math.round(traditionalAfterTax),
        rothAfterTax: Math.round(rothBalance), // Already taxed
        taxSavingsNow: Math.round(taxSavingsNow),
        taxInRetirement: Math.round(taxInRetirement),
        betterOption,
        difference: Math.round(Math.abs(difference)),
    };
}

// ============================================
// WITHDRAWAL CALCULATION
// ============================================

export interface WithdrawalResult {
    withdrawalAmount: number;
    age: number;
    federalTax: number;
    stateTax: number;
    earlyPenalty: number;
    totalTaxes: number;
    netAmount: number;
    effectiveTaxRate: number;
    isEarlyWithdrawal: boolean;
}

export function calculateWithdrawal(
    withdrawalAmount: number,
    age: number,
    federalTaxRate: number,
    stateTaxRate: number = 0
): WithdrawalResult {
    const { earlyWithdrawal } = RETIREMENT_CONSTANTS;
    const isEarlyWithdrawal = age < earlyWithdrawal.penaltyFreeAge;

    const federalTax = withdrawalAmount * (federalTaxRate / 100);
    const stateTax = withdrawalAmount * (stateTaxRate / 100);
    const earlyPenalty = isEarlyWithdrawal ? withdrawalAmount * earlyWithdrawal.penaltyRate : 0;

    const totalTaxes = federalTax + stateTax + earlyPenalty;
    const netAmount = withdrawalAmount - totalTaxes;
    const effectiveTaxRate = (totalTaxes / withdrawalAmount) * 100;

    return {
        withdrawalAmount,
        age,
        federalTax: Math.round(federalTax),
        stateTax: Math.round(stateTax),
        earlyPenalty: Math.round(earlyPenalty),
        totalTaxes: Math.round(totalTaxes),
        netAmount: Math.round(netAmount),
        effectiveTaxRate: Math.round(effectiveTaxRate * 10) / 10,
        isEarlyWithdrawal,
    };
}

// ============================================
// CATCH-UP CONTRIBUTION CALCULATION
// ============================================

export interface CatchUpResult {
    age: number;
    baseLimit: number;
    catchUpAmount: number;
    totalLimit: number;
    isSuperCatchUp: boolean;
    additionalSavings: number;
    projectedGrowth: number;
}

export function calculateCatchUp(
    age: number,
    yearsToRetirement: number,
    expectedReturn: number
): CatchUpResult {
    const { contributionLimits, ageThresholds } = RETIREMENT_CONSTANTS;

    const baseLimit = contributionLimits.employee;
    let catchUpAmount = 0;
    let isSuperCatchUp = false;

    if (age >= ageThresholds.superCatchUpStart && age <= ageThresholds.superCatchUpEnd) {
        catchUpAmount = contributionLimits.superCatchUp;
        isSuperCatchUp = true;
    } else if (age >= ageThresholds.catchUpAge) {
        catchUpAmount = contributionLimits.catchUp;
    }

    const totalLimit = baseLimit + catchUpAmount;
    const additionalSavings = catchUpAmount * yearsToRetirement;

    // Calculate projected growth of catch-up contributions
    const monthlyReturn = expectedReturn / 100 / 12;
    const monthlyCatchUp = catchUpAmount / 12;
    let projectedGrowth = 0;

    for (let month = 0; month < yearsToRetirement * 12; month++) {
        projectedGrowth = projectedGrowth * (1 + monthlyReturn) + monthlyCatchUp;
    }

    return {
        age,
        baseLimit,
        catchUpAmount,
        totalLimit,
        isSuperCatchUp,
        additionalSavings,
        projectedGrowth: Math.round(projectedGrowth),
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
