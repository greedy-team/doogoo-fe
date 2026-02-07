import { useNavigate } from "react-router-dom";
import { Hero } from "../features/landing/components/Hero";
import { FeatureSection } from "../features/landing/components/FeatureSection";
import { TutorialSection } from "../features/landing/components/TutorialSection";
import { FAQSection } from "../features/landing/components/FAQSection";

export default function LandingPage() {
  const navigate = useNavigate();

  const handleCTAClick = () => {
    navigate("/events");
  };

  return (
    <>
      <Hero onCTAClick={handleCTAClick} />

      <FeatureSection />

      <TutorialSection />

      <FAQSection />
    </>
  );
}
