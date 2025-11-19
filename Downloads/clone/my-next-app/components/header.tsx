"use client";

import Link from "next/link";
import { useState } from "react";

type NavItem = {
  label: string;
  href: string;
};

type SocialLink = {
  label: string;
  href: string;
  display: string;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Solutions", href: "/solutions" },
  { label: "Recruitment", href: "/recruitment" },
  { label: "Training", href: "/training" },
  { label: "Career", href: "/career" },
  { label: "Clients", href: "/clients" },
  { label: "Contact Us", href: "/contact" },
];

const SOCIAL_LINKS: SocialLink[] = [
  { label: "Facebook", href: "https://facebook.com", display: "f" },
  { label: "X", href: "https://x.com", display: "𝕏" },
  { label: "LinkedIn", href: "https://linkedin.com", display: "in" },
];

const MenuIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M4 7H20M4 12H20M4 17H20"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CloseIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M6 6L18 18M6 18L18 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="bg-blue-50 border-b border-blue-100 px-6 py-3 text-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex gap-6">
            <span className="text-blue-600">🏠 Welcome to Adore Technosoft</span>
            <span className="text-gray-600">📧 info@adoretechnosoft.com</span>
          </div>
          <div className="flex gap-4">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                aria-label={link.label}
                className="text-blue-600 hover:text-blue-700"
                target="_blank"
                rel="noreferrer"
              >
                {link.display}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
              A
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-red-600">ADORE</span>
              <span className="text-xs text-gray-600">Technosoft</span>
            </div>
          </div>

          <nav className="hidden md:flex gap-8 items-center text-gray-700">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="hover:text-red-600 transition"
              >
                {item.label}
              </Link>
            ))}
            <button className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition">
              Get in Touch
            </button>
          </nav>

          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
            className="md:hidden text-gray-700"
          >
            {isOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        {isOpen && (
          <nav className="md:hidden flex flex-col gap-4 mt-4 pb-4 border-t pt-4">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="hover:text-red-600 transition"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <button className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition w-full">
              Get in Touch
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}
