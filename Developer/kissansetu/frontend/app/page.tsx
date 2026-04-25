import Link from "next/link";

function NoMiddlemenIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M7.5 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm9 0a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM2.5 19.5c.8-3 2.95-4.5 5-4.5 2.06 0 4.22 1.5 5 4.5M11.5 19.5c.61-1.85 1.9-3.03 3.4-3.74A5.5 5.5 0 0 1 17 15c2.06 0 4.22 1.5 5 4.5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 2.75 19.25 6v6.4c0 4.76-3.21 7.97-7.25 8.85-4.04-.88-7.25-4.09-7.25-8.85V6L12 2.75Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <path
        d="M8.5 12.2 11 14.7l4.6-5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function PricingIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M4 16.5 9.5 11l3.25 3.25L20 7m0 0h-4.5M20 7v4.5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function ContactIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M8.6 11.8c1.55 1.9 3.16 3.14 5.1 4.3.47.29 1.1.21 1.5-.17l1.5-1.47c.37-.37.94-.49 1.42-.31 1.01.38 2.1.59 3.23.6.63 0 1.15.5 1.15 1.13V20c0 .62-.5 1.13-1.13 1.13C10.87 21.13 2.87 13.13 2.87 2.88 2.87 2.25 3.38 1.75 4 1.75h4.13c.63 0 1.13.52 1.13 1.15.01 1.13.22 2.22.6 3.23.18.48.06 1.05-.31 1.42L8.08 9.05c-.38.4-.45 1.03-.17 1.5.2.34.42.76.69 1.25Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

const features = [
  {
    title: "No Middlemen",
    description: "Direct connection between farmers and buyers. Keep 100% of your profits.",
    accentClass: "feature-icon-green",
    icon: <NoMiddlemenIcon />
  },
  {
    title: "Fair Pricing",
    description:
      "AI-powered price comparison helps you understand market rates and set competitive prices.",
    accentClass: "feature-icon-amber",
    icon: <PricingIcon />
  },
  {
    title: "Secure & Verified",
    description: "Profiles, listings, and conversations built with trust-first UX.",
    accentClass: "feature-icon-blue",
    icon: <ShieldIcon />
  },
  {
    title: "Easy Contact",
    description: "Connect instantly via WhatsApp or phone. Simple, fast, and efficient.",
    accentClass: "feature-icon-green",
    icon: <ContactIcon />
  }
];

export default function LandingPage() {
  return (
    <section className="page page-home">
      <section className="landing-hero" aria-label="Hero">
        <div className="landing-hero-content">
          <span className="landing-kicker">Farmer Direct Market</span>
          <h1>Sell Direct. Earn Fair.</h1>
          <p>Connect directly with buyers. No middlemen. Fair prices for your hard work.</p>
          <div className="hero-actions">
            <Link href="/auth?role=farmer" className="button button-primary hero-button">
              I&apos;m a Farmer
            </Link>
            <Link
              href="/auth?role=buyer"
              className="button button-secondary hero-button hero-button-light"
            >
              I&apos;m a Buyer
            </Link>
          </div>
          <div className="hero-micro">
            <span className="micro-pill">Instant buyer reach</span>
            <span className="micro-pill">Transparent pricing</span>
            <span className="micro-pill">Mobile-first</span>
          </div>
        </div>
      </section>

      <section className="landing-features" id="features" aria-label="Features">
        <div className="landing-features-inner">
          <div className="section-heading landing-heading">
            <span className="eyebrow landing-eyebrow">Why Choose Us</span>
            <h2>Fair Trade, Direct Connection</h2>
            <p className="landing-subheading">
              A clean, modern workflow that helps farmers list faster and helps buyers source
              smarter.
            </p>
          </div>

          <div className="feature-grid landing-feature-grid">
            {features.map((feature) => (
              <article key={feature.title} className="feature-card landing-feature-card">
                <span className={`feature-icon ${feature.accentClass}`}>{feature.icon}</span>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="landing-preview" id="preview" aria-label="Product preview">
        <div className="section-block landing-preview-inner">
          <div className="landing-preview-grid">
            <div className="section-heading compact">
              <span className="eyebrow">Dashboard preview</span>
              <h2>Everything you need to trade — in one view.</h2>
              <p>
                A lightweight dashboard to manage listings, track interest, and compare prices
                without digging through spreadsheets.
              </p>
              <div className="hero-actions preview-actions">
                <Link href="/farmer" className="button button-primary">
                  Open dashboard
                </Link>
                <Link href="/marketplace" className="button button-secondary">
                  Browse marketplace
                </Link>
              </div>
            </div>

            <div className="preview-card" role="img" aria-label="Dashboard mock preview">
              <div className="preview-topbar">
                <div className="preview-dots" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="preview-pill">Live preview</div>
              </div>
              <div className="preview-content">
                <div className="preview-stats">
                  <div className="preview-stat">
                    <span className="preview-label">Active listings</span>
                    <strong>12</strong>
                  </div>
                  <div className="preview-stat">
                    <span className="preview-label">Interested buyers</span>
                    <strong>48</strong>
                  </div>
                  <div className="preview-stat">
                    <span className="preview-label">Avg. price uplift</span>
                    <strong>+14%</strong>
                  </div>
                </div>

                <div className="preview-table">
                  <div className="preview-row preview-row-head">
                    <span>Crop</span>
                    <span>Qty</span>
                    <span>Price</span>
                    <span>Status</span>
                  </div>
                  <div className="preview-row">
                    <span>Tomato</span>
                    <span>1.2T</span>
                    <span>₹18/kg</span>
                    <span className="status-chip status-green">Hot</span>
                  </div>
                  <div className="preview-row">
                    <span>Wheat</span>
                    <span>800kg</span>
                    <span>₹24/kg</span>
                    <span className="status-chip status-blue">New</span>
                  </div>
                  <div className="preview-row">
                    <span>Onion</span>
                    <span>1.9T</span>
                    <span>₹13/kg</span>
                    <span className="status-chip status-amber">Stable</span>
                  </div>
                </div>
              </div>
              <div className="preview-glow" aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>

      <section className="landing-social-proof" id="testimonials" aria-label="Testimonials">
        <div className="section-block landing-proof-inner">
          <div className="section-heading landing-heading landing-heading-left">
            <span className="eyebrow">Trusted, transparent, fast</span>
            <h2>Built for a modern trading experience.</h2>
            <p>Clean UX, clear pricing, and simple contact flows that work on any device.</p>
          </div>

          <div className="proof-grid">
            <article className="proof-card">
              <p className="quote">
                “The marketplace view is clean and quick. I can compare prices and contact sellers
                in minutes.”
              </p>
              <div className="quote-meta">
                <span className="avatar" aria-hidden="true">
                  A
                </span>
                <div>
                  <strong>Ananya</strong>
                  <span className="muted-copy">Wholesale buyer</span>
                </div>
              </div>
            </article>
            <article className="proof-card">
              <p className="quote">
                “Listing a crop is straightforward. I feel more confident about pricing with the
                comparison insights.”
              </p>
              <div className="quote-meta">
                <span className="avatar" aria-hidden="true">
                  R
                </span>
                <div>
                  <strong>Rakesh</strong>
                  <span className="muted-copy">Farmer</span>
                </div>
              </div>
            </article>
            <article className="proof-card proof-card-accent">
              <div className="stat-stack">
                <div className="stat">
                  <strong>2–3×</strong>
                  <span className="muted-copy">faster buyer outreach</span>
                </div>
                <div className="stat">
                  <strong>24/7</strong>
                  <span className="muted-copy">mobile access</span>
                </div>
                <div className="stat">
                  <strong>0</strong>
                  <span className="muted-copy">middlemen fees</span>
                </div>
              </div>
              <Link href="/auth" className="text-link">
                Start trading →
              </Link>
            </article>
          </div>
        </div>
      </section>

      <footer className="site-footer" aria-label="Footer">
        <div className="site-footer-inner">
          <div className="footer-brand">
            <div className="brand-mark">
              <span className="brand-dot" />
              <div>
                <strong>Kissan Setu</strong>
                <span>Direct crop trading</span>
              </div>
            </div>
            <p className="muted-copy">
              A modern, minimal platform for direct farmer-to-buyer trading.
            </p>
          </div>

          <div className="footer-columns">
            <div className="footer-col">
              <strong>Product</strong>
              <Link href="/#features">Features</Link>
              <Link href="/#preview">Preview</Link>
              <Link href="/marketplace">Marketplace</Link>
            </div>
            <div className="footer-col">
              <strong>Company</strong>
              <Link href="/">About</Link>
              <Link href="/">Privacy</Link>
              <Link href="/">Terms</Link>
            </div>
            <div className="footer-col">
              <strong>Social</strong>
              <a className="social-link" href="#" aria-label="Twitter">
                <span className="social-icon" aria-hidden="true">
                  𝕏
                </span>
                Twitter
              </a>
              <a className="social-link" href="#" aria-label="LinkedIn">
                <span className="social-icon" aria-hidden="true">
                  in
                </span>
                LinkedIn
              </a>
              <a className="social-link" href="#" aria-label="GitHub">
                <span className="social-icon" aria-hidden="true">
                  ⌂
                </span>
                GitHub
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Kissan Setu. All rights reserved.</span>
        </div>
      </footer>
    </section>
  );
}
