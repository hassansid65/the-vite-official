export function money(amount: number, symbol = "$"): string {
  const fixed = Number.isInteger(amount) ? amount.toFixed(2) : amount.toFixed(2);
  const [whole, cents] = fixed.split(".");
  const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `${symbol}${grouped}.${cents}`;
}

export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
