import Link from "next/link";
import { SITE, CALCULATORS, RETIREMENT_CONSTANTS, formatCurrency } from "./site-config";
import { ArrowRight, PiggyBank, TrendingUp, Calculator } from "lucide-react";

export default function HomePage() {
  const featuredCalculators = CALCULATORS.filter(c => c.featured);
  const otherCalculators = CALCULATORS.filter(c => !c.featured);
  const { contributionLimits, ageThresholds } = RETIREMENT_CONSTANTS;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PiggyBank className="w-6 h-6 text-purple-600" />
            <span className="text-lg font-bold text-slate-800">{SITE.name}</span>
          </div>
          <span className="text-sm text-white bg-purple-600 px-3 py-1.5 rounded-full font-bold">
            {SITE.year} Limits
          </span>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-purple-800 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-400/50 rounded-full px-4 py-2 mb-6">
            <TrendingUp className="w-4 h-4 text-purple-300" />
            <span className="text-sm text-purple-200">Free 401k Calculator</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {SITE.year} 401k
            <span className="block text-yellow-400">Calculator</span>
          </h1>

          <p className="text-lg text-purple-100 mb-8 max-w-2xl mx-auto">
            Plan your retirement with confidence.
            Calculate growth, employer matching, and contribution limits.
          </p>

          <Link
            href="/calculator"
            className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-purple-900 px-6 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 shadow-lg"
          >
            <Calculator className="w-5 h-5" />
            Calculate My 401k
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* 2025 Limits */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <h2 className="text-lg font-bold text-slate-800 mb-4 text-center">
            {SITE.year} IRS Contribution Limits
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-purple-50 rounded-xl border border-purple-100">
              <p className="text-sm text-slate-600 mb-1">Employee Limit</p>
              <p className="text-2xl font-bold text-purple-700">{formatCurrency(contributionLimits.employee)}</p>
              <p className="text-xs text-purple-600">Under age {ageThresholds.catchUpAge}</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-xl border border-purple-100">
              <p className="text-sm text-slate-600 mb-1">Catch-Up (50+)</p>
              <p className="text-2xl font-bold text-purple-700">+{formatCurrency(contributionLimits.catchUp)}</p>
              <p className="text-xs text-purple-600">Ages {ageThresholds.catchUpAge}-59, 64+</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-xl border border-yellow-200">
              <p className="text-sm text-slate-600 mb-1">Super Catch-Up 🆕</p>
              <p className="text-2xl font-bold text-yellow-700">+{formatCurrency(contributionLimits.superCatchUp)}</p>
              <p className="text-xs text-yellow-600">Ages 60-63 only</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-xl border border-green-100">
              <p className="text-sm text-slate-600 mb-1">Total Max (60-63)</p>
              <p className="text-2xl font-bold text-green-700">{formatCurrency(contributionLimits.employee + contributionLimits.superCatchUp)}</p>
              <p className="text-xs text-green-600">Employee only</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Calculators */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">
          Free {SITE.year} Retirement Tools
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {featuredCalculators.map((calc) => {
            const IconComponent = calc.icon;
            return (
              <Link
                key={calc.id}
                href={`/${calc.id}`}
                className="group bg-white border border-slate-200 rounded-xl p-5 hover:border-purple-500 hover:shadow-lg transition-all"
              >
                <div className="flex flex-col">
                  <div className="p-3 bg-purple-100 rounded-lg w-fit group-hover:bg-purple-600 transition-colors mb-3">
                    <IconComponent className="w-5 h-5 text-purple-600 group-hover:text-white" />
                  </div>
                  <h3 className="text-base font-bold text-slate-800 group-hover:text-purple-600 mb-1">
                    {calc.name}
                  </h3>
                  <p className="text-sm text-slate-500 mb-3">
                    {calc.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-purple-600 text-sm font-semibold mt-auto">
                    Open <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {otherCalculators.length > 0 && (
          <div className="grid md:grid-cols-2 gap-3">
            {otherCalculators.map((calc) => {
              const IconComponent = calc.icon;
              return (
                <Link
                  key={calc.id}
                  href={`/${calc.id}`}
                  className="group bg-white border border-slate-200 rounded-lg p-4 hover:border-purple-500 transition-all flex items-center gap-3"
                >
                  <IconComponent className="w-5 h-5 text-slate-400 group-hover:text-purple-600" />
                  <span className="text-sm text-slate-600 group-hover:text-purple-600 font-medium">
                    {calc.name}
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* Quick Example */}
      <section className="bg-slate-100 border-y border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">
            Example: 35 Years of Saving
          </h2>

          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200">
              <div className="p-6 text-center">
                <p className="text-sm text-slate-500 mb-1">Starting at Age 30</p>
                <p className="text-3xl font-bold text-purple-600">$780/mo</p>
                <p className="text-xs text-slate-400">($9,360/year = 10% of $93.6k)</p>
              </div>
              <div className="p-6 text-center">
                <p className="text-sm text-slate-500 mb-1">+ Employer Match</p>
                <p className="text-3xl font-bold text-yellow-600">+$374/mo</p>
                <p className="text-xs text-slate-400">4% match on 6%</p>
              </div>
              <div className="p-6 text-center">
                <p className="text-sm text-slate-500 mb-1">At Age 65 (7% return)</p>
                <p className="text-3xl font-bold text-green-600">$1.8M</p>
                <p className="text-xs text-slate-400">35 years of growth</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-6">
            <Link href="/calculator" className="text-purple-600 font-semibold hover:underline">
              Calculate Your Own →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-bold mb-3">
            Start Planning Your Retirement
          </h2>
          <p className="text-purple-100 mb-6">
            See how your 401k can grow with employer matching and compound interest.
          </p>
          <Link
            href="/calculator"
            className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-purple-900 px-6 py-4 rounded-xl font-bold transition-colors"
          >
            <Calculator className="w-5 h-5" />
            Start Calculating
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <PiggyBank className="w-5 h-5 text-purple-400" />
              <span className="font-semibold">{SITE.name}</span>
            </div>
            <p className="text-sm text-slate-400 text-center">
              For informational purposes only. Not financial advice.
            </p>
            <p className="text-sm text-slate-500">
              © {SITE.year} {SITE.name}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
