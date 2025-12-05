import LoginPage from "@/components/login/loginContent";
import { loginMetadata } from "@/components/meta_data/metadata";
import type { Metadata } from "next";
export const metadata = loginMetadata();

export default function Page() {
  return <LoginPage />;
}