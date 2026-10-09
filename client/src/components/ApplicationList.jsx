/** Maps each status to a BEM modifier used for badge colour in App.css */
const STATUS_MODIFIER = {
  Wishlist: "wishlist",
  Applied: "applied",
  Assessment: "assessment",
  Interview: "interview",
  Offer: "offer",
  Rejected: "rejected",
  Withdrawn: "withdrawn",
};

/** Format an ISO date string to a readable short date, e.g. "Mar 15, 2024" */
function formatDate(iso) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function ApplicationList({
  applications,
  onEdit,
  onDelete,
  deletingId,
  filtersActive,
}) {
  const isEmpty = !applications || applications.length === 0;

  return (
    <section className="app-list">
      <h2 className="app-list__heading">
        Applications
        {!isEmpty && (
          <span className="app-list__count">{applications.length}</span>
        )}
      </h2>

      {isEmpty ? (
        <div className="empty-state">
          <div className="empty-state__icon" aria-hidden="true">
            📋
          </div>
          {filtersActive ? (
            <>
              <p className="empty-state__title">
                No applications match your filters
              </p>
              <p className="empty-state__body">
                Try adjusting your search or status filter.
              </p>
            </>
          ) : (
            <>
              <p className="empty-state__title">No applications yet</p>
              <p className="empty-state__body">
                Click &ldquo;Add Application&rdquo; to start tracking your
                internship applications.
              </p>
            </>
          )}
        </div>
      ) : (
        <ul className="app-list__items">
          {applications.map((app) => {
            const isDeleting = deletingId === app._id;
            const modifier = STATUS_MODIFIER[app.status] ?? "wishlist";
            const appliedDate = formatDate(app.appliedDate);

            return (
              <li
                key={app._id}
                className={`app-list__item${isDeleting ? " app-list__item--deleting" : ""}`}
              >
                <div className="app-avatar" aria-hidden="true">
                  {app.company.trim().charAt(0).toUpperCase()}
                </div>
                <div className="app-list__item-main">
                  <div className="app-list__item-header">
                    <span className="app-list__company">{app.company}</span>
                    <span className={`status-badge status-badge--${modifier}`}>
                      {app.status}
                    </span>
                  </div>
                  <div className="app-list__item-meta">
                    <span className="app-list__role">{app.role}</span>
                    {app.location && (
                      <span className="app-list__meta-item">
                        📍 {app.location}
                      </span>
                    )}
                    {appliedDate && (
                      <span className="app-list__meta-item">
                        Applied {appliedDate}
                      </span>
                    )}
                  </div>
                </div>

                <div className="app-list__item-actions">
                  <button
                    className="btn btn--ghost app-list__item-action"
                    onClick={() => onEdit(app)}
                    disabled={isDeleting}
                    aria-label={`Edit ${app.company} – ${app.role}`}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn--danger app-list__item-action"
                    onClick={() => {
                      const confirmed = window.confirm(
                        `Delete "${app.company} – ${app.role}"?\n\nThis cannot be undone.`,
                      );
                      if (confirmed) onDelete(app._id);
                    }}
                    disabled={isDeleting}
                    aria-label={`Delete ${app.company} – ${app.role}`}
                  >
                    {isDeleting ? "Deleting…" : "Delete"}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

export default ApplicationList;
