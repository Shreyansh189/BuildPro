function Navbar({ currentView, isAuthenticated, onRequestAdmin, onGoLanding, onLogout }) {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  let buttonLabel = "Admin Panel";
  let clickHandler = onRequestAdmin;

  if (currentView === "login") {
    buttonLabel = "← Back to Landing";
    clickHandler = onGoLanding;
  } else if (currentView === "admin" && isAuthenticated) {
    buttonLabel = "Logout";
    clickHandler = onLogout;
  }

  return (
    <nav className="site-nav">
      <div className="container nav-inner">
        <div className="brand">
          <div className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" role="presentation">
              <path
                d="M6 27V7.5c0-1 .8-1.8 1.8-1.8H14V27H6zm12 0V3.5c0-1 .8-1.8 1.8-1.8H26V27h-8z"
                fill="currentColor"
              />
            </svg>
          </div>
          <span className="brand-name">BuildPro</span>
        </div>

        <div className="nav-links">
          <button onClick={() => scrollToSection("projects")}>Projects</button>
          <button onClick={() => scrollToSection("clients")}>Clients</button>
          <button onClick={() => scrollToSection("contact")}>Contact</button>
        </div>

        <button className="admin-pill" onClick={clickHandler}>
          {buttonLabel}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
