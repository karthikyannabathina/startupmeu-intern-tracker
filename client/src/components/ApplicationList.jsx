function ApplicationList({ applications, onEdit, onDelete, deletingId }) {
  const isEmpty = !applications || applications.length === 0;

  const handleDelete = (app) => {
    const confirmed = window.confirm(
      `Delete "${app.company} – ${app.role}"?\n\nThis cannot be undone.`
    );
    if (confirmed) onDelete(app._id);
  };

  return (
    <section className="app-list">
      <h2 className="app-list__heading">Applications</h2>

      {isEmpty ? (
        <div className="empty-state">
          <div className="empty-state__icon" aria-hidden="true">📋</div>
          <p className="empty-state__title">No applications yet</p>
          <p className="empty-state__body">
            Click &ldquo;Add Application&rdquo; to start tracking your internship applications.
          </p>
        </div>
      ) : (
        <ul className="app-list__items">
          {applications.map((app) => {
            const isDeleting = deletingId === app._id;
            return (
              <li key={app._id} className="app-list__item">
                <span className="app-list__item-text">
                  {app.company} — {app.role}
                </span>
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
                    onClick={() => handleDelete(app)}
                    disabled={isDeleting}
                    aria-label={`Delete ${app.company} – ${app.role}`}
                  >
                    {isDeleting ? 'Deleting…' : 'Delete'}
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
