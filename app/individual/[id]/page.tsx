import { idMetadata } from "@/components/meta_data/metadata";
import IndividualPage from "@/components/individualpage/individualContent";
import type { Metadata } from "next";

export const metadata: Metadata = idMetadata();

export default function Page() {
  return <IndividualPage />;
}