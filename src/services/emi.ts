import { EmiPlan } from '@/data/types';

/**
 * Central EMI math. Kept in one place so every screen and mock shows
 * consistent numbers.
 *
 * For no-cost EMI the monthly amount is simply principal / tenure.
 * For interest-bearing plans we use the standard reducing-balance EMI formula:
 *   EMI = P * r * (1 + r)^n / ((1 + r)^n - 1)
 * where r is the monthly rate and n the number of months.
 */
export function computeMonthlyEmi(
  principal: number,
  tenureMonths: number,
  annualRatePct: number,
): number {
  if (tenureMonths <= 0) return principal;
  if (annualRatePct <= 0) {
    return principal / tenureMonths;
  }
  const r = annualRatePct / 12 / 100;
  const pow = Math.pow(1 + r, tenureMonths);
  return (principal * r * pow) / (pow - 1);
}

/**
 * Build the list of EMI plans available for a given price.
 * Tenures up to `maxNoCostTenure` are offered at 0% (no-cost); longer tenures
 * carry a nominal interest rate. The mid tenure is flagged as recommended.
 */
export function buildEmiPlans(price: number, maxNoCostTenure: number): EmiPlan[] {
  const allTenures = [3, 6, 9, 12, 18, 24];
  const tenures = allTenures.filter((t) => t <= Math.max(maxNoCostTenure, 12));

  const recommendedTenure = maxNoCostTenure >= 6 ? 6 : tenures[0];

  return tenures.map((tenure) => {
    const noCost = tenure <= maxNoCostTenure;
    const interestRate = noCost ? 0 : 16;
    const monthly = computeMonthlyEmi(price, tenure, interestRate);
    const monthlyRounded = Math.round(monthly);
    return {
      id: `emi-${tenure}`,
      tenureMonths: tenure,
      monthlyAmount: monthlyRounded,
      // For no-cost EMI the customer never pays more than the item price — the
      // rounding difference on the displayed monthly figure is absorbed in the
      // final instalment, so the total must stay exactly equal to the price.
      totalPayable: noCost ? price : monthlyRounded * tenure,
      interestRate,
      noCost,
      recommended: tenure === recommendedTenure,
    };
  });
}

/** ₹1,23,456 style Indian-grouping currency formatting. */
export function formatINR(amount: number): string {
  return `₹${Math.round(amount).toLocaleString('en-IN')}`;
}
