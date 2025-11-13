import HeroSection from "@/components/ladningpage/herosection";
import { PopulareStays, FeaturedPlaces } from "@/components/ladningpage/productcardsection";
import KvoteSection from "@/components/ladningpage/kvote";
import InfoCardSection from "@/components/ladningpage/InfocardSection";


export default function Home() {
  return (
    <div>
      <HeroSection />
    <div className="bg-[#02B2DE]">
      <PopulareStays />
    </div>
    <div className="bg-[#036B8D]">
      <KvoteSection />
    </div>
    <div className="bg-[#02B2DE]">
      <FeaturedPlaces />
    </div>
    <div className="bg-[#036B8D]">
      <InfoCardSection />
    </div>
  </div>
  );
}
