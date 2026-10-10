import "./ApplicationFilters.css";

const STATUSES = [
  "Wishlist",
  "Applied",
  "Assessment",
  "Interview",
  "Offer",
  "Rejected",
  "Withdrawn",
];

function ApplicationFilters({
  search,
  status,
  onSearchChange,
  onStatusChange,
}) {
  return (
    <div className="filters">
      <input
        className="filters__search"
        type="search"
        placeholder="Search by company or role…"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        aria-label="Search applications"
      />
      <select
        className="filters__status"
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        aria-label="Filter by status"
      >
        <option value="">All Statuses</option>
        {STATUSES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ApplicationFilters;
