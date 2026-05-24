import type { Metadata } from "next";
import { AdminPanel } from "@/components/admin/AdminPanel";

export const metadata: Metadata = {
  title: "Admin Command Center",
  description: "Management, operations, content, media, events, and offers for Pride of Africa Journeys.",
  robots: {
    index: false,
    follow: false
  }
};

export default function AdminPage() {
  return <AdminPanel />;
}
