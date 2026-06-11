import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AttackSimPage from './pages/AttackSimPage';
import BlogIndexPage from './pages/BlogIndexPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AttackSimPage />} />
        <Route path="/blog" element={<BlogIndexPage />} />
        <Route path="/blog/" element={<BlogIndexPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/privacy-policy.html" element={<PrivacyPolicyPage />} />
        <Route path="/terms-and-conditions" element={<TermsPage />} />
        <Route path="/terms-and-conditions.html" element={<TermsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
