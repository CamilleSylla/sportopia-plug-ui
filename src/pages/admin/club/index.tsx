import AdminInfoBadge from "@/components/AdminInfoBadge";
import AdminLayout from "../../../layouts/AdminLayout";
import lang from '../../../../lang/fr.json'
import Link from "next/link";

export default function ClubDashboardPage() {
  return (
    <AdminLayout>
      <div className="space-x-4">
        <AdminInfoBadge iconName="users" label="Joueurs" value="246" />
        <AdminInfoBadge iconName="team" label="Equipes" value="25" />
      </div>
      <Link href="/admin/club/create">{lang.admin.root.create_btn}</Link>
    </AdminLayout>
  );
}