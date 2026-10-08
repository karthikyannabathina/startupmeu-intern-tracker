function Header({ onAddClick }) {
  return (
    <header className="header">
      <div className="header__brand">
        <h1 className="header__logo">InternTrack</h1>
        <p className="header__subtitle">Internship Application Tracker</p>
      </div>
      <button className="btn btn--primary" onClick={onAddClick}>
        + Add Application
      </button>
    </header>
  );
}

export default Header;
