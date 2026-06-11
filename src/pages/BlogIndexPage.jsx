import { blogPosts } from '../data/blogPosts';
import SubPageLayout from '../components/SubPageLayout';

export default function BlogIndexPage() {
  return (
    <SubPageLayout contentClassName="blog-index">
      <p className="eyebrow">Insights</p>
      <h1>Field notes on cyber forensics, NIS2, and ransomware response in Belgium</h1>
      <p className="lede">
        Practical posts for law firms, healthcare, transport, and manufacturing teams navigating EU compliance and
        incident response.
      </p>

      <ul className="blog-index__posts">
        {blogPosts.map((post) => (
          <li key={post.slug} className="blog-index__post">
            <h2>
              <a href={`/blog/${post.slug}.html`}>{post.title}</a>
            </h2>
            <p>{post.excerpt}</p>
          </li>
        ))}
      </ul>
    </SubPageLayout>
  );
}
