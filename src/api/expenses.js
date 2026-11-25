const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || `Request failed (${response.status})`);
  }
  return data;
}

export function fetchExpenses() {
  return request('/api/expenses');
}

export function createExpense({ title, amount, expenseDate }) {
  return request('/api/expenses', {
    method: 'POST',
    body: JSON.stringify({ title, amount, expenseDate }),
  });
}

export function updateExpense(id, { title, amount }) {
  return request(`/api/expenses/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ title, amount }),
  });
}

export function deleteExpense(id) {
  return request(`/api/expenses/${id}`, {
    method: 'DELETE',
  });
}

export function fetchMonthlyReport(month) {
  const query = month ? `?month=${encodeURIComponent(month)}` : '';
  return request(`/api/expenses/report${query}`);
}
