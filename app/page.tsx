import { CtaSection } from "@/components/landing/CtaSection";
import { Features } from "@/components/landing/Features";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { SocialProof } from "@/components/landing/SocialProof";
import { UseCases } from "@/components/landing/UseCases";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <UseCases />
        <SocialProof />
        <CtaSection />
        <Footer />
      </main>
    </div>
  );
}
