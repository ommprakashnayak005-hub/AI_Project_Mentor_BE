// Top header: page title, search, notifications, profile, mobile menu button.
export default function Header({ title, onMenuClick, onSearch, searchValue }) {
  return (
    <header className="header">
      <button
        className="mobile-menu-button"
        onClick={onMenuClick}
        aria-label="Open navigation menu"
      >
        ☰
      </button>
      <h1 className="header-title">{title}</h1>
      <div className="header-search">
        <span className="header-search-icon" aria-hidden="true">🔍</span>
        <input
          type="search"
          placeholder="Search…"
          value={searchValue || ''}
          onChange={(e) => onSearch && onSearch(e.target.value)}
          aria-label="Search"
        />
      </div>
      <button className="header-icon-button" aria-label="Notifications">🔔</button>
      <div className="header-profile">
        <div className="header-avatar" aria-hidden="true">PM</div>
        <span className="header-profile-name">Project Admin</span>
      </div>
    </header>
  )
}
