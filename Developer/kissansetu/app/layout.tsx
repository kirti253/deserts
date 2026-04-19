import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Farmer Direct Market",
  description: "Farmer Direct Market - Connecting farmers directly with buyers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&f[]=cabinet-grotesk@500,700,800&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

