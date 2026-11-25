import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  createExpense,
  deleteExpense,
  fetchExpenses,
  fetchMonthlyReport,
  updateExpense,
} from './api/expenses.js';
import ExpenseForm from './components/ExpenseForm.jsx';
import ExpenseList from './components/ExpenseList.jsx';
import MonthlyReportModal from './components/MonthlyReportModal.jsx';
import { formatCurrency, getCurrentMonthISO, getTodayISO } from './utils/format.js';

export default function App() {
  const [groupedByDay, setGroupedByDay] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [busyId, setBusyId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const [reportOpen, setReportOpen] = useState(false);
  const [reportMonth, setReportMonth] = useState(getCurrentMonthISO());
  const [reportData, setReportData] = useState(null);
  const [reportLoading, setReportLoading] = useState(false);
  const [reportError, setReportError] = useState('');

  const showToast = useCallback((message) => {
    setStatusMessage(message);
    window.clearTimeout(window.__expenseToastTimer);
    window.__expenseToastTimer = window.setTimeout(() => {
      setStatusMessage('');
    }, 2800);
  }, []);

  const loadExpenses = useCallback(async () => {
    try {
      setErrorMessage('');
      const data = await fetchExpenses();
      setGroupedByDay(data.groupedByDay || []);
      setGrandTotal(data.grandTotal || 0);
    } catch (err) {
      setErrorMessage(
        err.message || 'Unable to connect to the backend API. Make sure the server and MySQL are running.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadExpenses();
  }, [loadExpenses]);

  const loadReport = useCallback(async (monthStr) => {
    setReportLoading(true);
    setReportError('');
    try {
      const data = await fetchMonthlyReport(monthStr);
      setReportData(data);
    } catch (err) {
      setReportError(err.message || 'Failed to generate monthly report.');
    } finally {
      setReportLoading(false);
    }
  }, []);

  async function handleAddExpense({ title, amount }) {
    setIsSubmitting(true);
    setErrorMessage('');
    try {
      await createExpense({
        title,
        amount,
        expenseDate: getTodayISO(),
      });
      await loadExpenses();
      showToast('Expense added.');
      return true;
    } catch (err) {
      setErrorMessage(err.message || 'Failed to add expense.');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleUpdateExpense(id, { title, amount }) {
    setBusyId(id);
    setErrorMessage('');
    try {
      await updateExpense(id, { title, amount });
      await loadExpenses();
      showToast('Expense updated.');
      return true;
    } catch (err) {
      setErrorMessage(err.message || 'Failed to update expense.');
      return false;
    } finally {
      setBusyId(null);
    }
  }

  async function handleDeleteExpense(id) {
    setBusyId(id);
    setErrorMessage('');
    try {
      await deleteExpense(id);
      await loadExpenses();
      showToast('Expense deleted.');
    } catch (err) {
      setErrorMessage(err.message || 'Failed to delete expense.');
    } finally {
      setBusyId(null);
    }
  }

  function handleOpenReport() {
    setReportOpen(true);
    loadReport(reportMonth);
  }

  function handleChangeReportMonth(newMonth) {
    setReportMonth(newMonth);
    loadReport(newMonth);
  }

  const todayTotal = useMemo(() => {
    const today = getTodayISO();
    const match = groupedByDay.find((g) => g.date === today);
    return match ? match.total : 0;
  }, [groupedByDay]);

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <h1>Daily Expense Tracker</h1>
          <p className="subtitle">
            Track daily spending, organize expenses by day, and review monthly reports.
          </p>
        </div>

        <div className="summary-pills">
          <div className="pill">
            <span className="pill-label">Today</span>
            <strong>{formatCurrency(todayTotal)}</strong>
          </div>
          <div className="pill">
            <span className="pill-label">All Tracked</span>
            <strong>{formatCurrency(grandTotal)}</strong>
          </div>
        </div>
      </header>

      <main className="main-content">
        {errorMessage && (
          <div className="banner banner-error" role="alert">
            {errorMessage}
          </div>
        )}

        {statusMessage && (
          <div className="banner banner-status" role="status">
            {statusMessage}
          </div>
        )}

        <ExpenseForm
          onSubmitExpense={handleAddExpense}
          onGenerateReport={handleOpenReport}
          isSubmitting={isSubmitting}
        />

        <ExpenseList
          groupedByDay={groupedByDay}
          loading={loading}
          busyId={busyId}
          onUpdateExpense={handleUpdateExpense}
          onDeleteExpense={handleDeleteExpense}
        />
      </main>

      <MonthlyReportModal
        isOpen={reportOpen}
        month={reportMonth}
        report={reportData}
        loading={reportLoading}
        error={reportError}
        onChangeMonth={handleChangeReportMonth}
        onClose={() => setReportOpen(false)}
      />
    </div>
  );
}
