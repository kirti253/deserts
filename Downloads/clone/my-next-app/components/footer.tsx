type FooterLink = {
  label: string;
  href?: string;
};

const SERVICE_LINKS: FooterLink[] = [
  { label: "Solutions", href: "#" },
  { label: "Recruitment", href: "#" },
  { label: "Training", href: "#" },
  { label: "Consulting", href: "#" },
];

const COMPANY_LINKS: FooterLink[] = [
  { label: "Home", href: "#" },
  { label: "About Us", href: "#" },
  { label: "Careers", href: "#" },
  { label: "Contact", href: "#" },
];

const CONTACT_INFO: FooterLink[] = [
  { label: "📧 info@adoretechnosoft.com" },
  { label: "📱 +91 (0) XXX-XXX-XXXX" },
  { label: "📍 New Delhi, India" },
];

const LinkList = ({ links }: { links: FooterLink[] }) => (
  <ul className="text-gray-400 text-sm space-y-2">
    {links.map((link) =>
      link.href ? (
        <li key={link.label}>
          <a href={link.href} className="hover:text-white transition">
            {link.label}
          </a>
        </li>
      ) : (
        <li key={link.label}>{link.label}</li>
      )
    )}
  </ul>
);

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold mb-4 text-lg">About</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Adore Technosoft is a leading IT solutions provider committed to
              delivering excellence in recruitment, training, and business solutions.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-lg">Services</h3>
            <LinkList links={SERVICE_LINKS} />
          </div>
          <div>
            <h3 className="font-bold mb-4 text-lg">Company</h3>
            <LinkList links={COMPANY_LINKS} />
          </div>
          <div>
            <h3 className="font-bold mb-4 text-lg">Contact</h3>
            <LinkList links={CONTACT_INFO} />
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Adore Technosoft. All rights reserved. |
            Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  );
}
