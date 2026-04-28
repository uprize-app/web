import { Footer } from "@/components/layout/Footer";
import { FinalCTA } from "@/features/landing/components/FinalCTA";
import { Hero } from "@/features/landing/components/Hero";
import { HowItWorks } from "@/features/landing/components/HowItWorks";
import { MarqueeStrip } from "@/features/landing/components/MarqueeStrip";
import { StylesShowcase } from "@/features/landing/components/StylesShowcase";
import { UseCases } from "@/features/landing/components/UseCases";
import { ValueProp } from "@/features/landing/components/ValueProp";

const LandingPage = () => (
  <>
    <Hero />
    <MarqueeStrip />
    <ValueProp />
    <HowItWorks />
    <StylesShowcase />
    <UseCases />
    <FinalCTA />
    <Footer />
  </>
);

export default LandingPage;
