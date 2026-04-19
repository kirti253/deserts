import Link from "next/link";

import {
  HandshakeIcon,
  TrendUpIcon,
  UsersIcon,
} from "@/app/components/fair-harvest/icons";

const featureCards = [
  {
    title: "No Middlemen",
    description:
      "Direct connection between farmers and buyers. Keep 100% of your profits.",
    accent: "bg-[#2E7D32]/10 text-[#2E7D32]",
    icon: UsersIcon,
  },
  {
    title: "Fair Pricing",
    description:
      "AI-powered price comparison helps you understand market rates and set competitive prices.",
    accent: "bg-[#D35400]/10 text-[#D35400]",
    icon: TrendUpIcon,
  },
  {
    title: "Easy Contact",
    description:
      "Connect instantly via WhatsApp or phone. Simple, fast, and efficient.",
    accent: "bg-[#2E7D32]/10 text-[#2E7D32]",
    icon: HandshakeIcon,
  },
] as const;

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F9F8F6] text-[#1C2B20]">
      <section className="relative isolate flex min-h-screen overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://static.prod-images.emergentagent.com/jobs/eecb115a-3c33-4c35-b776-4a7ff4a8dd36/images/98c1a7b611ba74f1785d351ba06cb1fe369e4bb10eeb9f8ce2702763fc8ad69a.png')",
          }}
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-heading text-5xl font-bold leading-none tracking-tighter text-white md:text-6xl lg:text-7xl">
              Sell Direct.
              <br />
              Earn Fair.
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-relaxed text-white/90 md:text-2xl">
              Connect directly with buyers. No middlemen. Fair prices for your
              hard work.
            </p>
            <div className="mt-12 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/auth?role=farmer"
                className="rounded-lg bg-[#2E7D32] px-8 py-4 text-center text-lg font-medium tracking-wide text-white shadow-lg transition-all hover:bg-[#246428] hover:shadow-xl"
              >
                I&apos;m a Farmer
              </Link>
              <Link
                href="/auth?role=buyer"
                className="rounded-lg bg-white px-8 py-4 text-center text-lg font-medium tracking-wide text-[#1C2B20] shadow-lg transition-all hover:bg-[#F9F8F6] hover:shadow-xl"
              >
                I&apos;m a Buyer
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F9F8F6] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#4A5D4E]">
              Why Choose Us
            </p>
            <h2 className="font-heading text-3xl font-bold leading-tight tracking-tight text-[#1C2B20] md:text-4xl">
              Fair Trade, Direct Connection
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {featureCards.map(({ accent, description, icon: Icon, title }) => (
              <article
                key={title}
                className="rounded-lg border border-[#E5E2DC] bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-lg"
              >
                <div
                  className={`mb-6 flex h-14 w-14 items-center justify-center rounded-lg ${accent}`}
                >
                  <Icon size={32} />
                </div>
                <h3 className="font-heading mb-3 text-xl font-medium text-[#1C2B20]">
                  {title}
                </h3>
                <p className="text-base leading-relaxed text-[#4A5D4E]">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

