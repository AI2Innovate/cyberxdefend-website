import { Link } from 'react-router-dom';
import LegalLayout from '../components/LegalLayout';

export default function TermsPage() {
  return (
    <LegalLayout title="Terms & Conditions">
      <p className="legal-meta">Last updated: 17 April 2026</p>

      <p>
        These Terms &amp; Conditions (&quot;Terms&quot;) govern your access to and use of the website{' '}
        <a href="https://cyberxdefend.com">cyberxdefend.com</a> and any related materials or services (together, the &quot;Site&quot;)
        operated by <strong>AI2Innovate</strong> (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;). By accessing the Site you agree to
        these Terms.
      </p>

      <h2>1. Use of the Site</h2>
      <p>
        The Site is provided for informational purposes about the CyberXDefend platform and related services. You agree to use the Site
        lawfully and not to attempt to compromise its integrity, availability, or security.
      </p>

      <h2>2. Intellectual property</h2>
      <p>
        All content on the Site — including text, graphics, logos, and software — is owned by AI2Innovate or its licensors and is
        protected by copyright and other intellectual-property laws. You may not reproduce, redistribute, or create derivative works
        from the Site without prior written permission, except for private, non-commercial viewing.
      </p>

      <h2>3. Trademarks</h2>
      <p>
        &quot;CyberXDefend&quot; and &quot;AI2Innovate&quot; are trademarks of AI2Innovate. All other trademarks are the property of
        their respective owners.
      </p>

      <h2>4. Demo requests and communications</h2>
      <p>
        When you submit a demo-request form, you confirm that the information you provide is accurate and that you are authorised to
        share it on behalf of your organisation. We process the information in accordance with our{' '}
        <Link to="/privacy-policy">Privacy Policy</Link>.
      </p>

      <h2>5. No professional advice</h2>
      <p>
        Information on the Site — including blog posts and guides on NIS2, ransomware, or incident response — is provided for general
        informational purposes only and does not constitute legal, regulatory, or professional cybersecurity advice. Always consult
        qualified counsel and practitioners before acting on any information contained on the Site.
      </p>

      <h2>6. Warranties and liability</h2>
      <p>
        The Site is provided &quot;as is&quot; and &quot;as available&quot;. To the maximum extent permitted by applicable law, we disclaim
        all warranties, express or implied, including merchantability, fitness for a particular purpose, and non-infringement. We are not
        liable for any indirect, incidental, consequential, or special damages arising from your use of the Site.
      </p>

      <h2>7. Third-party links</h2>
      <p>
        The Site may link to third-party websites and services. We do not control those resources and are not responsible for their
        content, privacy practices, or availability.
      </p>

      <h2>8. Changes</h2>
      <p>
        We may update these Terms from time to time. Changes take effect when posted on this page, marked with a new &quot;last
        updated&quot; date. Continued use of the Site after changes means you accept the updated Terms.
      </p>

      <h2>9. Governing law and jurisdiction</h2>
      <p>
        These Terms are governed by Belgian law. Any disputes arising from or in connection with the Terms or the Site shall be subject
        to the exclusive jurisdiction of the competent courts of Belgium, without prejudice to any mandatory consumer-protection
        provisions that may apply in your place of residence within the EU.
      </p>

      <h2>10. Contact</h2>
      <p>
        Questions about these Terms? Email <a href="mailto:info@ai2innovate.io">info@ai2innovate.io</a>.
      </p>

      <p className="legal-back">
        <Link to="/">← Back to CyberXDefend</Link>
      </p>
    </LegalLayout>
  );
}
