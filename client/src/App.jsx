import { useState, useEffect, useCallback } from 'react';
import Header from './components/Header.jsx';
import StatsCards from './components/StatsCards.jsx';
import ApplicationFilters from './components/ApplicationFilters.jsx';
import ApplicationList from './components/ApplicationList.jsx';
import ApplicationForm from './components/ApplicationForm.jsx';
import {
  getApplications,
  getStats,
  createApplication,
  updateApplication,
} from './services/applicationService.js';
import './App.css';

function App() {
  // ── Filter state ──────────────────────────────────────────────
  const [search, setSearch]             = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // ── Data state ────────────────────────────────────────────────
  const [applications, setApplications] = useState([]);
  const [stats, setStats]               = useState(null);

  // ── UI state ──────────────────────────────────────────────────
  const [loadingApps, setLoadingApps]   = useState(true);
  const [loadingStats, setLoadingStats] = useState(true);
  const [error, setError]               = useState(null);

  // ── Form state ────────────────────────────────────────────────
  const [showForm, setShowForm]               = useState(false);
  const [editingApplication, setEditingApplication] = useState(null);
  const [isSubmitting, setIsSubmitting]       = useState(false);
  const [formError, setFormError]             = useState(null);

  // ── Data fetchers ─────────────────────────────────────────────
  const fetchStats = useCallback(() => {
    setLoadingStats(true);
    return getStats()
      .then((data) => {
        setStats({
          total:     data.total,
          applied:   data.byStatus.Applied   ?? 0,
          interview: data.byStatus.Interview ?? 0,
          offer:     data.byStatus.Offer     ?? 0,
        });
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoadingStats(false));
  }, []);

  const fetchApplications = useCallback((q, s) => {
    setLoadingApps(true);
    setError(null);
    return getApplications(q, s)
      .then((data) => setApplications(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoadingApps(false));
  }, []);

  // ── Fetch on mount and filter changes ─────────────────────────
  useEffect(() => {
    let cancelled = false;
    fetchStats().then(() => { if (cancelled) return; });
    return () => { cancelled = true; };
  }, [fetchStats]);

  useEffect(() => {
    let cancelled = false;
    fetchApplications(search, statusFilter).then(() => { if (cancelled) return; });
    return () => { cancelled = true; };
  }, [search, statusFilter, fetchApplications]);

  // ── Shared close helper ───────────────────────────────────────
  const closeForm = () => {
    setShowForm(false);
    setEditingApplication(null);
    setFormError(null);
  };

  // ── Add handler ───────────────────────────────────────────────
  const handleAddClick = () => {
    setFormError(null);
    setEditingApplication(null);
    setShowForm(true);
  };

  // ── Edit handler ──────────────────────────────────────────────
  const handleEdit = (application) => {
    setFormError(null);
    setEditingApplication(application);
    setShowForm(true);
  };

  // ── Submit handler (create or update) ────────────────────────
  const handleSubmit = async (payload) => {
    setIsSubmitting(true);
    setFormError(null);
    try {
      if (editingApplication) {
        await updateApplication(editingApplication._id, payload);
      } else {
        await createApplication(payload);
      }
      closeForm();
      fetchApplications(search, statusFilter);
      fetchStats();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Render ────────────────────────────────────────────────────
  return (
    <div className="layout">
      <Header onAddClick={handleAddClick} />

      <main className="main">
        {error && (
          <div className="error-banner" role="alert">
            <strong>Error:</strong> {error}
          </div>
        )}

        <StatsCards stats={loadingStats ? null : stats} />

        <div className="applications-panel">
          <ApplicationFilters
            search={search}
            status={statusFilter}
            onSearchChange={setSearch}
            onStatusChange={setStatusFilter}
          />

          {loadingApps ? (
            <div className="loading-state" aria-live="polite">
              Loading applications…
            </div>
          ) : (
            <ApplicationList
              applications={applications}
              onEdit={handleEdit}
            />
          )}
        </div>
      </main>

      {showForm && (
        <ApplicationForm
          initialData={editingApplication}
          onSubmit={handleSubmit}
          onCancel={closeForm}
          isSubmitting={isSubmitting}
          apiError={formError}
        />
      )}
    </div>
  );
}

export default App;
