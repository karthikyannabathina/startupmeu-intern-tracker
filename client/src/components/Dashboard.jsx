import "./Dashboard.css";

import StatsCards from "./StatsCards.jsx";
import ApplicationFilters from "./ApplicationFilters.jsx";
import ApplicationList from "./ApplicationList.jsx";

function Dashboard({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  applications,
  stats,
  loadingApps,
  loadingStats,
  error,
  deletingId,
  handleDelete,
  handleEdit,
}) {
  const filtersActive = search.trim() !== "" || statusFilter !== "";

  return (
    <main className="main">
      {error && (
        <div className="error-banner" role="alert">
          <strong>Error:</strong> {error}
        </div>
      )}

      <section className="page-title">
        <h1 className="page-title__heading">
          <span className="page-title__greeting">👋 Good morning,</span>
          <span className="page-title__name">Karthik</span>
        </h1>

        <p className="page-title__sub">
          Track and manage your internship applications.
        </p>
      </section>

      <StatsCards stats={loadingStats ? null : stats} />

      <section
        className="applications-panel"
        aria-label="Internship applications"
      >
        <ApplicationFilters
          search={search}
          status={statusFilter}
          onSearchChange={setSearch}
          onStatusChange={setStatusFilter}
        />

        {loadingApps ? (
          <div className="loading-state" aria-live="polite">
            <span className="loading-spinner" aria-hidden="true" />
            Loading applications…
          </div>
        ) : (
          <ApplicationList
            applications={applications}
            onEdit={handleEdit}
            onDelete={handleDelete}
            deletingId={deletingId}
            filtersActive={filtersActive}
          />
        )}
      </section>
    </main>
  );
}

export default Dashboard;
