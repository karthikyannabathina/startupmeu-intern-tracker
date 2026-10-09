import './StatsCards.css';

const STATS = [
  { label: 'Total',      key: 'total',     icon: '📋' },
  { label: 'Applied',    key: 'applied',   icon: '🚀' },
  { label: 'Interviews', key: 'interview', icon: '💬' },
  { label: 'Offers',     key: 'offer',     icon: '🎉' },
];

function StatsCards({ stats }) {
  return (
    <section className="stats" aria-label="Application statistics">
      {STATS.map(({ label, key, icon }) => (
        <div className={`stats__card stats__card--${key}`} key={key}>
          <span className="stats__icon" aria-hidden="true">{icon}</span>
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