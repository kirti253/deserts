"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function SiteHeader() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <header className={`site-header ${isHomePage ? "site-header-home" : ""}`}>
      <Link href="/" className="brand-mark">
        <span className="brand-dot" />
        <div>
          <strong>Farmer Direct Market</strong>
          <span>Direct crop trading MVP</span>
        </div>
      </Link>

      <nav className="site-nav">
        <Link href="/auth">Login</Link>
        <Link href="/farmer">Farmer Dashboard</Link>
        <Link href="/marketplace">Buyer Marketplace</Link>
      </nav>
    </header>
  );
}
