import { EmiPlan } from '@/data/types';

// No-cost EMI is simply principal / tenure. Interest-bearing plans use the
// standard reducing-balance formula EMI = P·r·(1+r)^n / ((1+r)^n − 1), where r
// is the monthly rate and n the number of months.
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

// Tenures within the product's no-cost window are offered at 0%; anything
// longer carries interest.
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

export function formatINR(amount: number): string {
  return `₹${Math.round(amount).toLocaleString('en-IN')}`;
}
