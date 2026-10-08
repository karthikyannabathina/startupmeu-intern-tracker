function Header({ onAddClick }) {
  return (
    <header className="header">
      <div className="header__brand">
        <span className="header__logo">InternTrack</span>
        <span className="header__subtitle">Internship Application Tracker</span>
      </div>
      <button className="btn btn--primary" onClick={onAddClick}>
        + Add Application
      </button>
    </header>
  );
}

export default Header;
