import { Link } from 'react-router-dom';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__bar">
        <p className="site-footer__copy">
          © 2026{' '}
          <a href="https://ai2innovate.io" target="_blank" rel="noopener noreferrer">
            AI2Innovate
          </a>
          . All rights reserved.
        </p>
        <nav className="site-footer__nav" aria-label="Footer">
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms-and-conditions">Terms &amp; Conditions</Link>
          <Link to="/blog">Insights</Link>
          <a href="/#cta">Contact</a>
        </nav>
      </div>
    </footer>
  );
}
