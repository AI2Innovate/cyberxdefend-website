import { Link } from 'react-router-dom';
import BrandLogo from './BrandLogo';
import { useLiveTickers } from '../hooks/useLiveTickers';

export default function SiteHeader({ home = false }) {
  const { phish, ransom } = useLiveTickers();

  return (
    <header className="site-header">
      {home ? (
        <a className="brand" href="#hero">
          <BrandLogo />
        </a>
      ) : (
        <Link className="brand" to="/">
          <BrandLogo />
        </Link>
      )}
      <div className="ticker" aria-live="off">
        <span>
          <i className="dot" />
          PHISHING EMAILS SINCE YOU OPENED THIS PAGE: <b>{phish}</b>
        </span>
        <span>
          EST. RANSOMWARE ATTACKS: <b>{ransom}</b>
        </span>
      </div>
      <a className="nav-cta" href={home ? '#cta' : '/#cta'}>
        REQUEST NIS2 AUDIT
      </a>
    </header>
  );
}
