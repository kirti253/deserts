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
    title: "Easy Contact",
    description: "Connect instantly via WhatsApp or phone. Simple, fast, and efficient.",
    accentClass: "feature-icon-green",
    icon: <ContactIcon />
  }
];

export default function LandingPage() {
  return (
    <section className="page page-home">
      <section className="landing-hero">
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
        </div>
      </section>

      <section className="landing-features">
        <div className="landing-features-inner">
          <div className="section-heading landing-heading">
            <span className="eyebrow landing-eyebrow">Why Choose Us</span>
            <h2>Fair Trade, Direct Connection</h2>
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
    </section>
  );
}
