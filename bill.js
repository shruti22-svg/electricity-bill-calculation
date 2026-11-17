function calculateBill(units) {
  const consumed = Number(units);
  if (!Number.isFinite(consumed) || consumed < 0) {
    throw new Error("Units must be a non-negative number");
  }

  const slabs = [
    { limit: 100, rate: 1.5 },
    { limit: 100, rate: 2.5 },
    { limit: 100, rate: 4.0 },
    { limit: 200, rate: 6.0 },
    { limit: Infinity, rate: 8.0 }
  ];

  let remaining = consumed;
  let energyCharge = 0;
  const breakdown = [];

  for (const slab of slabs) {
    if (remaining <= 0) break;
    const used = Math.min(remaining, slab.limit);
    const amount = used * slab.rate;
    energyCharge += amount;
    breakdown.push({ units: used, rate: slab.rate, amount });
    remaining -= used;
  }

  const fixedCharge = consumed === 0 ? 0 : 50;
  const total = energyCharge + fixedCharge;

  return {
    units: consumed,
    energyCharge: round2(energyCharge),
    fixedCharge: round2(fixedCharge),
    total: round2(total),
    breakdown
  };
}

function round2(value) {
  return Math.round(value * 100) / 100;
}

module.exports = { calculateBill };
