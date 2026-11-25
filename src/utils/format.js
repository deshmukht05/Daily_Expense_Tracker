// Change LOCALE and CURRENCY if you prefer a different currency (e.g. 'en-US' and 'USD')
const LOCALE = 'en-IN';
const CURRENCY = 'INR';

const currencyFormatter = new Intl.NumberFormat(LOCALE, {
  style: 'currency',
  currency: CURRENCY,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatCurrency(value) {
  return currencyFormatter.format(Number(value) || 0);
}

export function getTodayISO() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getCurrentMonthISO() {
  return getTodayISO().slice(0, 7);
}

export function formatDayLabel(dateStr) {
  const [year, month, day] = dateStr.split('-').map(Number);
  const dateObj = new Date(year, month - 1, day);
  const today = new Date();
  const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const diffDays = Math.round((todayOnly - dateObj) / (1000 * 60 * 60 * 24));

  const formatted = dateObj.toLocaleDateString(LOCALE, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  if (diffDays === 0) return `Today · ${formatted}`;
  if (diffDays === 1) return `Yesterday · ${formatted}`;
  return formatted;
}

export function formatMonthLabel(monthStr) {
  const [year, month] = monthStr.split('-').map(Number);
  const dateObj = new Date(year, month - 1, 1);
  return dateObj.toLocaleDateString(LOCALE, {
    month: 'long',
    year: 'numeric',
  });
}
