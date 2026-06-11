import { Link } from 'react-router-dom';

export default function PageBackLink({ to = '/', children = '← Back to CyberXDefend' }) {
  return (
    <p className="page-back">
      <Link to={to}>{children}</Link>
    </p>
  );
}
