import Header from "@/components/header";
import Hero from "@/components/hero";
import AboutSection from "@/components/about-section";
import ServicesSection from "@/components/services-section";
import WhyChooseUsSection from "@/components/why-choose-us-section";
import Footer from "@/components/footer";

export const metadata = {
  title: "Adore Technosoft - Global IT Solution Company",
  description:
    "ISO certified IT solutions provider delivering innovative services in recruitment, training, and business solutions.",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <AboutSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <Footer />
    </main>
  );
}
