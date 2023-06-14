import { UserGroupIcon, UsersIcon } from "@heroicons/react/24/solid";
import { useMemo } from "react";

export default function AdminInfoBadge({
  iconName,
  label,
  value,
}: {
  iconName: "users" | "team";
  label: string;
  value: string | number;
}) {
  const Icon = useMemo(() => {
    const icons = {
      users: UsersIcon,
      team: UserGroupIcon
    };
    return icons[iconName];
  }, []);
  return (
    <div className="w-fit min-w-[250px] h-fit bg-violet-950 rounded-2xl px-4 py-2 text-white items-center gap-4 inline-flex">
      <span className=" w-14 h-14 bg-indigo-900 rounded-full flex items-center justify-center">
        <Icon className=" p-4"/>
      </span>
      <div>
        <p className="text-xs font-semibold text-violet-500">{label}</p>
        <p className=" font-semibold text-2xl text-white">{value}</p>
      </div>
    </div>
  );
}
