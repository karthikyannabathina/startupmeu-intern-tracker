import { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import StatsCards from './components/StatsCards.jsx';
import ApplicationFilters from './components/ApplicationFilters.jsx';
import ApplicationList from './components/ApplicationList.jsx';
import { getApplications, getStats } from './services/applicationService.js';
import './App.css';

function App() {
  // ── Filter state ──────────────────────────────────────────────
  const [search, setSearch]           = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // ── Data state ────────────────────────────────────────────────
  const [applications, setApplications] = useState([]);
  const [stats, setStats]               = useState(null);

  // ── UI state ──────────────────────────────────────────────────
  const [loadingApps, setLoadingApps]   = useState(true);
  const [loadingStats, setLoadingStats] = useState(true);
  const [error, setError]               = useState(null);

  // ── Fetch stats once on mount ─────────────────────────────────
  useEffect(() => {
    let cancelled = false;

    setLoadingStats(true);
    getStats()
      .then((data) => {
        if (cancelled) return;
        // Map backend shape → StatsCards shape
        setStats({
          total:     data.total,
          applied:   data.byStatus.Applied   ?? 0,
          interview: data.byStatus.Interview ?? 0,
          offer:     data.byStatus.Offer     ?? 0,
        });
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoadingStats(false);
      });

    return () => { cancelled = true; };
  }, []);

  // ── Fetch applications on mount and whenever filters change ───
  useEffect(() => {
    let cancelled = false;

    setLoadingApps(true);
    setError(null);

    getApplications(search, statusFilter)
      .then((data) => {
        if (!cancelled) setApplications(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoadingApps(false);
      });

    return () => { cancelled = true; };
  }, [search, statusFilter]);

  // ── Handlers ──────────────────────────────────────────────────
  const handleAddClick = () => {
    // Add Application modal/form wired in a later phase
  };

  // ── Render ────────────────────────────────────────────────────
  const isLoading = loadingApps || loadingStats;

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
            <ApplicationList applications={applications} />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
