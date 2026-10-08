function ApplicationList({ applications, onEdit }) {
  const isEmpty = !applications || applications.length === 0;

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
          {applications.map((app) => (
            <li key={app._id} className="app-list__item">
              <span className="app-list__item-text">
                {app.company} — {app.role}
              </span>
              <button
                className="btn btn--ghost app-list__item-action"
                onClick={() => onEdit(app)}
                aria-label={`Edit ${app.company} – ${app.role}`}
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default ApplicationList;
