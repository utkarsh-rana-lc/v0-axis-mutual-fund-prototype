import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/home/hero-section";
import { TrustMetrics } from "@/components/home/trust-metrics";
import { FeaturesSection } from "@/components/home/features-section";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <TrustMetrics />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
}
