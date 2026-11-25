import React from 'react';
import { formatCurrency, formatDayLabel, formatMonthLabel } from '../utils/format.js';

export default function MonthlyReportModal({
  isOpen,
  month,
  report,
  loading,
  error,
  onChangeMonth,
  onClose,
}) {
  if (!isOpen) return null;

  function handleExportCsv() {
    if (!report || !report.dailyBreakdown.length) return;

    const rows = [['Date', 'Expense Title', 'Amount']];
    for (const day of report.dailyBreakdown) {
      for (const item of day.items) {
        const safeTitle = `"${String(item.title).replace(/"/g, '""')}"`;
        rows.push([day.date, safeTitle, item.amount.toFixed(2)]);
      }
    }

    const csvContent = rows.map((row) => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `expense-report-${report.month}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  const maxDayTotal = report?.dailyBreakdown?.length
    ? Math.max(...report.dailyBreakdown.map((d) => d.total))
    : 0;

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Monthly expense report">
      <div className="modal-card">
        <div className="modal-header">
          <div>
            <h2>Monthly Expense Report</h2>
            <p className="modal-subtitle">{formatMonthLabel(month)}</p>
          </div>

          <div className="modal-controls">
            <input
              type="month"
              aria-label="Select report month"
              value={month}
              onChange={(e) => onChangeMonth(e.target.value)}
              className="month-picker"
            />
            <button type="button" className="btn btn-sm btn-edit" onClick={onClose}>
              Close
            </button>
          </div>
        </div>

        {loading && <p className="empty-state">Generating monthly report...</p>}
        {error && <p className="inline-error">{error}</p>}

        {!loading && !error && report && (
          <>
            <div className="report-stats">
              <div className="stat-box">
                <span className="stat-label">Total Spent</span>
                <strong className="stat-value">{formatCurrency(report.totalAmount)}</strong>
              </div>
              <div className="stat-box">
                <span className="stat-label">Entries</span>
                <strong className="stat-value">{report.totalTransactions}</strong>
              </div>
              <div className="stat-box">
                <span className="stat-label">Daily Average</span>
                <strong className="stat-value">{formatCurrency(report.averagePerActiveDay)}</strong>
              </div>
              <div className="stat-box">
                <span className="stat-label">Highest Day</span>
                <strong className="stat-value">
                  {report.highestSpendingDay
                    ? formatCurrency(report.highestSpendingDay.total)
                    : '—'}
                </strong>
              </div>
            </div>

            {report.dailyBreakdown.length === 0 ? (
              <p className="empty-state">No expenses recorded for {formatMonthLabel(month)}.</p>
            ) : (
              <div className="report-breakdown">
                <div className="breakdown-header">
                  <h3>Day-by-Day Breakdown</h3>
                  <button
                    type="button"
                    className="btn btn-sm btn-primary"
                    onClick={handleExportCsv}
                  >
                    Export CSV
                  </button>
                </div>

                <ul className="breakdown-list">
                  {report.dailyBreakdown.map((day) => {
                    const widthPct = maxDayTotal > 0 ? Math.max(6, (day.total / maxDayTotal) * 100) : 0;
                    return (
                      <li key={day.date} className="breakdown-row">
                        <div className="breakdown-meta">
                          <span>{formatDayLabel(day.date)}</span>
                          <span>
                            {day.count} {day.count === 1 ? 'item' : 'items'} ·{' '}
                            <strong>{formatCurrency(day.total)}</strong>
                          </span>
                        </div>
                        <div className="bar-track">
                          <div className="bar-fill" style={{ width: `${widthPct}%` }} />
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
