import { useNavigate } from "react-router-dom";
import { Hero } from "../components/Hero";
import { FeatureSection } from "../components/FeatureSection";
import { TutorialSection } from "../components/TutorialSection";
import { FAQSection } from "../components/FAQSection";

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
