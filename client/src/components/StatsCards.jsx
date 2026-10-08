const STATS = [
  { label: 'Total',      key: 'total' },
  { label: 'Applied',    key: 'applied' },
  { label: 'Interviews', key: 'interview' },
  { label: 'Offers',     key: 'offer' },
];

function StatsCards({ stats }) {
  return (
    <section className="stats" aria-label="Application statistics">
      {STATS.map(({ label, key }) => (
        <div className="stats__card" key={key}>
          <span className="stats__value">
            {stats?.[key] ?? '--'}
          </span>
          <span className="stats__label">{label}</span>
        </div>
      ))}
    </section>
  );
}

export default StatsCards;
