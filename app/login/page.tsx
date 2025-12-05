import LoginPage from "@/components/login/loginContent";
import { loginMetadata } from "@/components/meta_data/metadata";
export const metadata = loginMetadata();

export default function Page() {
  return <LoginPage />;
}