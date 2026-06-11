import { useEffect } from 'react';
import PageBackLink from './PageBackLink';
import SiteFooter from './SiteFooter';
import SiteHeader from './SiteHeader';
import '../styles/attack-sim.css';
import '../styles/sub-page.css';

export default function SubPageLayout({ children, backTo = '/', backLabel, contentClassName = '' }) {
  useEffect(() => {
    document.documentElement.dataset.theme = 'defend';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="attack-sim attack-sim--sub">
      <div className="attack-sim__vignette" aria-hidden="true" />
      <div className="attack-sim__scanlines" aria-hidden="true" />
      <div className="attack-sim__grid" aria-hidden="true" />

      <SiteHeader />

      <main className="sub-page">
        <div className="wrap">
          <PageBackLink to={backTo}>{backLabel}</PageBackLink>
          <div className={`sub-page__content ${contentClassName}`.trim()}>{children}</div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
