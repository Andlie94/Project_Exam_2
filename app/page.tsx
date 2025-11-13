import Image from "next/image";
import HeroSection from "@/components/ladningpage/herosection";
import { PopulareStays, FeaturedPlaces } from "@/components/ladningpage/cardinfosection";
import KvoteSection from "@/components/ladningpage/kvote";


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
      <h4> Some card info </h4>
    </div>
  </div>
  );
}
