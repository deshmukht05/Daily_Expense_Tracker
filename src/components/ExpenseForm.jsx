import React, { useState } from 'react';

export default function ExpenseForm({ onSubmitExpense, onGenerateReport, isSubmitting }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [formError, setFormError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    setFormError('');

    const trimmedTitle = title.trim();
    const numericAmount = Number(amount);

    if (!trimmedTitle) {
      setFormError('Please enter an expense title.');
      return;
    }
    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      setFormError('Please enter a valid amount greater than 0.');
      return;
    }

    const ok = await onSubmitExpense({
      title: trimmedTitle,
      amount: numericAmount,
    });

    if (ok) {
      setTitle('');
      setAmount('');
    }
  }

  return (
    <section className="card form-card" aria-label="Add daily expense">
      <form className="expense-form" onSubmit={handleSubmit} noValidate>
        <div className="input-grid">
          <div className="field-group">
            <label htmlFor="expense-title">Expense Title</label>
            <input
              id="expense-title"
              type="text"
              placeholder="e.g., Groceries, Coffee, Bus ticket"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={255}
              disabled={isSubmitting}
              autoComplete="off"
            />
          </div>

          <div className="field-group">
            <label htmlFor="expense-amount">Amount</label>
            <input
              id="expense-amount"
              type="number"
              placeholder="e.g., 250.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="0.01"
              step="0.01"
              disabled={isSubmitting}
            />
          </div>
        </div>

        {formError && <p className="inline-error">{formError}</p>}

        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Submit'}
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={onGenerateReport}
          >
            Generate Report
          </button>
        </div>
      </form>
    </section>
  );
}
