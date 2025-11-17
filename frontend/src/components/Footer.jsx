function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <div className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" role="presentation">
              <path
                d="M6 27V7.5c0-1 .8-1.8 1.8-1.8H14V27H6zm12 0V3.5c0-1 .8-1.8 1.8-1.8H26V27h-8z"
                fill="currentColor"
              />
            </svg>
          </div>
          <div>
            <p className="footer-title">Real Trust</p>
            <p className="footer-note">Consultation • Design • Marketing</p>
          </div>
        </div>

        <div className="footer-links">
          <a href="#top">Home</a>
          <a href="#projects">Projects</a>
          <a href="#clients">Testimonials</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="social-links">
          <a
            href="https://instagram.com/realtrust"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
          >
            <svg viewBox="0 0 24 24" role="presentation">
              <path
                d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5.5A4.5 4.5 0 1 0 16.5 12 4.5 4.5 0 0 0 12 7.5zm0 2A2.5 2.5 0 1 1 9.5 12 2.5 2.5 0 0 1 12 9.5zm6-2.75a1 1 0 1 0 1 1 1 1 0 0 0-1-1z"
              />
            </svg>
          </a>
          <a
            href="https://twitter.com/realtrust"
            target="_blank"
            rel="noreferrer"
            aria-label="Twitter"
          >
            <svg viewBox="0 0 24 24" role="presentation">
              <path d="M21 5.5a4.51 4.51 0 0 1-1.3.36A2.25 2.25 0 0 0 20.43 4a4.52 4.52 0 0 1-1.43.55A2.24 2.24 0 0 0 12.6 6.1a6.36 6.36 0 0 1-4.62-2.34 2.24 2.24 0 0 0 .69 3 2.2 2.2 0 0 1-1-.27v.03a2.25 2.25 0 0 0 1.79 2.2 2.27 2.27 0 0 1-1 .04 2.25 2.25 0 0 0 2.1 1.56A4.5 4.5 0 0 1 6 12.52 6.35 6.35 0 0 0 9.45 13.5 6.35 6.35 0 0 0 15.83 7.1v-.29A4.52 4.52 0 0 0 21 5.5z" />
            </svg>
          </a>
          <a
            href="https://facebook.com/realtrust"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
          >
            <svg viewBox="0 0 24 24" role="presentation">
              <path d="M14 8h3V4h-3c-2.8 0-5 2.2-5 5v2H6v4h3v7h4v-7h3.2l.8-4H13V9a1 1 0 0 1 1-1z" />
            </svg>
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Real Trust. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;

