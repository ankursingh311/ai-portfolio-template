import SiteNav from "@/components/SiteNav";
import HeroSection from "@/components/HeroSection";
import TransformationLedger from "@/components/TransformationLedger";
import ExpertiseMatrix from "@/components/ExpertiseMatrix";
import Recommendations from "@/components/Recommendations";
import ContactSection from "@/components/ContactSection";
import StickyChat from "@/components/StickyChat";
import FadeIn from "@/components/FadeIn";

import heroData from "@/content/hero.json";
import ledgerData from "@/content/ledger.json";
import expertiseData from "@/content/expertise.json";
import recommendationsData from "@/content/recommendations.json";
import contactData from "@/content/contact.json";

import type {
  HeroContent,
  LedgerEntry,
  ExpertiseContent,
  ContactContent,
} from "@/types/content";

export default function Home() {
  return (
    <main className="bg-bg min-h-screen">
      <SiteNav />
      <HeroSection
        content={heroData as HeroContent}
        linkedinUrl={contactData.linkedin}
      />
      <FadeIn>
        <TransformationLedger entries={ledgerData as LedgerEntry[]} />
      </FadeIn>
      <FadeIn delay={50}>
        <ExpertiseMatrix content={expertiseData as ExpertiseContent} />
      </FadeIn>
      <FadeIn delay={50}>
        <Recommendations entries={recommendationsData} />
      </FadeIn>
      <FadeIn delay={50}>
        <ContactSection content={contactData as ContactContent} />
      </FadeIn>
      <StickyChat />
    </main>
  );
}
