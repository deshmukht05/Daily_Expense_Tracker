import React, { useState } from 'react';
import { formatCurrency, formatDayLabel } from '../utils/format.js';

export default function ExpenseList({
  groupedByDay,
  loading,
  busyId,
  onUpdateExpense,
  onDeleteExpense,
}) {
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editAmount, setEditAmount] = useState('');
  const [editError, setEditError] = useState('');

  function startEdit(item) {
    setEditingId(item.id);
    setEditTitle(item.title);
    setEditAmount(String(item.amount));
    setEditError('');
  }

  function cancelEdit() {
    setEditingId(null);
    setEditTitle('');
    setEditAmount('');
    setEditError('');
  }

  async function handleUpdate(id) {
    const trimmed = editTitle.trim();
    const numericAmount = Number(editAmount);

    if (!trimmed) {
      setEditError('Title cannot be empty.');
      return;
    }
    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      setEditError('Amount must be greater than 0.');
      return;
    }

    setEditError('');
    const ok = await onUpdateExpense(id, {
      title: trimmed,
      amount: numericAmount,
    });
    if (ok) {
      cancelEdit();
    }
  }

  if (loading) {
    return (
      <section className="card list-card">
        <p className="empty-state">Loading your daily expenses...</p>
      </section>
    );
  }

  if (!groupedByDay.length) {
    return (
      <section className="card list-card">
        <p className="empty-state">
          No expenses tracked yet. Add your first expense above to start organizing your daily spending.
        </p>
      </section>
    );
  }

  return (
    <section className="tracks-section" aria-label="Tracked expenses by day">
      {groupedByDay.map((dayGroup) => (
        <div key={dayGroup.date} className="card day-group">
          <div className="day-header">
            <h2 className="day-title">{formatDayLabel(dayGroup.date)}</h2>
            <span className="day-subtotal">
              {dayGroup.count} {dayGroup.count === 1 ? 'item' : 'items'} · {formatCurrency(dayGroup.total)}
            </span>
          </div>

          <ul className="track-list">
            {dayGroup.items.map((item) => {
              const isEditing = editingId === item.id;
              const isBusy = busyId === item.id;

              return (
                <li
                  key={item.id}
                  className={`track-item ${isEditing ? 'track-item-editing' : ''}`}
                >
                  <div className="track-content">
                    {isEditing ? (
                      <div className="edit-inputs">
                        <input
                          type="text"
                          aria-label="Edit expense title"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          maxLength={255}
                          disabled={isBusy}
                        />
                        <input
                          type="number"
                          aria-label="Edit expense amount"
                          value={editAmount}
                          onChange={(e) => setEditAmount(e.target.value)}
                          min="0.01"
                          step="0.01"
                          disabled={isBusy}
                        />
                      </div>
                    ) : (
                      <div className="track-info">
                        <span className="track-title">{item.title}</span>
                        <span className="track-amount">{formatCurrency(item.amount)}</span>
                      </div>
                    )}

                    {isEditing && editError && (
                      <p className="inline-error">{editError}</p>
                    )}
                  </div>

                  <div className="track-actions">
                    <button
                      type="button"
                      className="btn btn-sm btn-edit"
                      onClick={() => (isEditing ? cancelEdit() : startEdit(item))}
                      disabled={isBusy}
                    >
                      {isEditing ? 'Cancel' : 'Edit'}
                    </button>

                    <button
                      type="button"
                      className="btn btn-sm btn-update"
                      onClick={() => handleUpdate(item.id)}
                      disabled={!isEditing || isBusy}
                      title={isEditing ? 'Save changes' : 'Click Edit first to modify'}
                    >
                      {isBusy && isEditing ? 'Updating...' : 'Update'}
                    </button>

                    <button
                      type="button"
                      className="btn btn-sm btn-delete"
                      onClick={() => onDeleteExpense(item.id)}
                      disabled={isBusy}
                    >
                      {isBusy && !isEditing ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </section>
  );
}
