import UserPage from "@/components/user/userContent";
import { userMetadata } from "@/components/meta_data/metadata";
export const metadata = userMetadata();

export default function Page() {
  return <UserPage />;
}