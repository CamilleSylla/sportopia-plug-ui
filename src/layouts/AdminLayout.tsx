import lang from "../../lang/fr.json";
import { HomeIcon, HomeModernIcon, UserGroupIcon, UsersIcon } from "@heroicons/react/24/solid";
import AdminNavLink from "../components/AdminNavLink";
export default function AdminLayout({ children }: {children: React.ReactNode}) {
  return (
    <div className="flex">
      <nav className="w-fit h-screen bg-violet-950">
        <span className="text-2xl uppercase p-14 block font-bold text-white border-b border-b-violet-900">
          Sportopia<span className=" font-extralight">plug</span>
        </span>
        <NavList />
      </nav>
      <div className=" flex-grow p-10 pt-14">{children}</div>
    </div>
  );
}

const NavList = () => {
  const nav = [
    {
      name: lang.admin.nav.dashboard,
      href: "/admin/dashboard",
      icon: HomeIcon,
    },
    {
      name: lang.admin.nav.club,
      href: "/admin/club",
      icon: HomeModernIcon,
    },
    {
      name: lang.admin.nav.teams,
      href: "/admin/teams",
      icon: UserGroupIcon,
    },
    {
      name: lang.admin.nav.players,
      href: "#",
      icon: UsersIcon,
    },
  ];

  return (
    <ul className="px-6 pt-9 w-full space-y-1">
      {nav.map((item) => (
        <li
          className="hover:bg-violet-900 rounded-md transition duration-150"
          key={item.name}
        >
          <AdminNavLink href={item.href}>
            <span className=" font-semibold text-sm  flex gap-4 items-center">
              <item.icon className="w-5 h-5" />
              {item.name}
            </span>
          </AdminNavLink>
        </li>
      ))}
    </ul>
  );
};
