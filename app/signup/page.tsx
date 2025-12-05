import SignupPage from "@/components/signUp/signUpContent";
import { signUpMetadata } from "@/components/meta_data/metadata";
export const metadata = signUpMetadata();

export default function Page() {
  return <SignupPage />;
}