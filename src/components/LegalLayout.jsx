import SubPageLayout from './SubPageLayout';

export default function LegalLayout({ title, children }) {
  return (
    <SubPageLayout>
      <p className="eyebrow">Legal</p>
      <h1>{title}</h1>
      <div className="legal-prose">{children}</div>
    </SubPageLayout>
  );
}
