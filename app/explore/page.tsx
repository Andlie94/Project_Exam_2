import ExplorePage from "@/components/expolrepage/exploreContent";
import { exportedMetadata } from "@/components/meta_data/metadata";

export const metadata = exportedMetadata();

export default function Page() {
  return <ExplorePage />;
}