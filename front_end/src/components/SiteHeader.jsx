function SiteHeader() {
  return (
    <header className="topbar">
      <a className="brand" href="/" aria-label="MediTrack home">
        <span className="brand-mark" aria-hidden="true">+</span>
        <span>Medi<span className="brand-accent">Track</span></span>
      </a>
      <nav className="top-nav" aria-label="Main navigation">
        <a className="nav-active" href="#search">Find medicine</a>
        <a href="#how-it-works">How it works</a>
      </nav>
      <a className="location-pill" href="#search">
        <span aria-hidden="true">⌖</span> Find a pharmacy
      </a>
    </header>
  );
}

export default SiteHeader;
