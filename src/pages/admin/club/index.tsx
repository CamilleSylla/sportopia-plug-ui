import AdminInfoBadge from "@/components/AdminInfoBadge";
import AdminLayout from "../../../layouts/AdminLayout";
import lang from "../../../../lang/fr.json";
import Link from "next/link";
import { ADMIN_USER_CLUB } from "../../../queries/admin/club";
import { useQuery } from "@apollo/client";
import { If, Then, Else, When, Unless, Switch, Case, Default } from "react-if";
import Pending from "@/components/Pending";

export default function ClubDashboardPage() {
  const {
    data,
    loading,
  } = useQuery(ADMIN_USER_CLUB);
  const club = data?.findByUserId;
  return (
    <AdminLayout>
      <If condition={loading}>
        <Then>
          <Pending />
        </Then>
        <Else>
          <div className="space-x-4">
            <AdminInfoBadge iconName="users" label="Joueurs" value="246" />
            <AdminInfoBadge iconName="team" label="Equipes" value="25" />
          </div>
          <If condition={!club}>
            <Then>
              <Link href="/admin/club/create">
                {lang.admin.root.create_btn}
              </Link>
            </Then>
          </If>
        </Else>
      </If>
    </AdminLayout>
  );
}
