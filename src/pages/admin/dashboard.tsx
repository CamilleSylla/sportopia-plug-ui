import AdminInfoBadge from "@/components/AdminInfoBadge";
import AdminLayout from "../../layouts/AdminLayout";

export default function AdminDashboardPage() {
  return (
    <AdminLayout>
      <div className="space-x-4">
        <AdminInfoBadge iconName="users" label="Joueurs" value="246" />
        <AdminInfoBadge iconName="team" label="Equipes" value="25" />
      </div>
    </AdminLayout>
  );
}
