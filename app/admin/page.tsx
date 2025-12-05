import AdminPage from "@/components/admin/adminContent";
import { adminMetadata } from "@/components/meta_data/metadata";
export const metadata = adminMetadata();

export default function Page() {
  return <AdminPage />;
}