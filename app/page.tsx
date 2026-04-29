import SiteNav from "@/components/SiteNav";
import HeroSection from "@/components/HeroSection";
import TransformationLedger from "@/components/TransformationLedger";
import ExpertiseMatrix from "@/components/ExpertiseMatrix";
import ContactSection from "@/components/ContactSection";
import StickyChat from "@/components/StickyChat";

import heroData from "@/content/hero.json";
import ledgerData from "@/content/ledger.json";
import expertiseData from "@/content/expertise.json";
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
      <TransformationLedger entries={ledgerData as LedgerEntry[]} />
      <ExpertiseMatrix content={expertiseData as ExpertiseContent} />
      <ContactSection content={contactData as ContactContent} />
      <StickyChat />
    </main>
  );
}
