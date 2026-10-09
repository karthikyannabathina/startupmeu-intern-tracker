
const STATUS_MODIFIER = {
  Wishlist: "wishlist",
  Applied: "applied",
  Assessment: "assessment",
  Interview: "interview",
  Offer: "offer",
  Rejected: "rejected",
  Withdrawn: "withdrawn",
};

function formatDate(iso) {
  if (!iso) return "—";

  const date = new Date(iso);

  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleDateString("en-US", {
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
                Click "Add Application" to start tracking your internship
                applications.
              </p>
            </>
          )}
        </div>
      ) : (
        <div className="app-list__table-wrapper">
          <table className="app-list__table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Role</th>
                <th>Status</th>
                <th>Location</th>
                <th>Applied date</th>
                <th aria-label="Actions"></th>
              </tr>
            </thead>

            <tbody>
              {applications.map((app) => {
                const isDeleting = deletingId === app._id;
                const modifier =
                  STATUS_MODIFIER[app.status] ?? "wishlist";

                return (
                  <tr
                    key={app._id}
                    className={
                      isDeleting ? "app-list__row--deleting" : undefined
                    }
                  >
                    <td>
                      <div className="app-list__company-cell">
                        <div className="app-avatar" aria-hidden="true">
                          {app.company?.trim()?.charAt(0)?.toUpperCase() || "?"}
                        </div>

                        <span className="app-list__company">
                          {app.company}
                        </span>
                      </div>
                    </td>

                    <td>
                      <span className="app-list__table-role">
                        {app.role}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`status-badge status-badge--${modifier}`}
                      >
                        {app.status}
                      </span>
                    </td>

                    <td>
                      <span className="app-list__table-muted">
                        {app.location || "—"}
                      </span>
                    </td>

                    <td>
                      <span className="app-list__table-muted">
                        {formatDate(app.appliedDate)}
                      </span>
                    </td>

                    <td>
                      <div className="app-list__item-actions">
                        <button
                          type="button"
                          className="btn btn--ghost app-list__item-action"
                          onClick={() => onEdit(app)}
                          disabled={isDeleting}
                          aria-label={`Edit ${app.company} – ${app.role}`}
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          className="btn btn--danger app-list__item-action"
                          onClick={() => {
                            const confirmed = window.confirm(
                              `Delete "${app.company} – ${app.role}"?\n\nThis cannot be undone.`
                            );

                            if (confirmed) onDelete(app._id);
                          }}
                          disabled={isDeleting}
                          aria-label={`Delete ${app.company} – ${app.role}`}
                        >
                          {isDeleting ? "Deleting…" : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default ApplicationList;

