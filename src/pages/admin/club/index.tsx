import AdminInfoBadge from "@/components/AdminInfoBadge";
import AdminLayout from "../../../layouts/AdminLayout";
import lang from "../../../../lang/fr.json";
import Link from "next/link";
import { ADMIN_USER_CLUB } from "../../../queries/admin/club";
import { useQuery } from "@apollo/client";
import { If, Else } from "react-if";
import Pending from "@/components/Pending";
import Image from "next/image";
import { useDate } from "@/components/useDate";
import { useMemo } from "react";

export default function ClubDashboardPage() {
  const { data, loading } = useQuery(ADMIN_USER_CLUB);
  const club = data?.findByUserId;
  return (
    <AdminLayout>
      <If condition={loading}>
        <Pending />
      </If>
      <Else>
        <div className="space-y-4">
          <h1 className="font-bold text-4xl mb-6">{lang.admin.club.page_title}</h1>
          <div className="space-x-4">
            <AdminInfoBadge iconName="users" label="Joueurs" value="246" />
            <AdminInfoBadge iconName="team" label="Equipes" value="25" />
          </div>
          <If condition={!club}>
            <Link href="/admin/club/create">{lang.admin.root.create_btn}</Link>
          </If>
          <div className="grid grid-cols-6 w-full gap-2">
            <ClubCard {...club} />
          </div>
        </div>
      </Else>
    </AdminLayout>
  );
}

const ClubCard = ({
  logo,
  cover,
  name,
  createdAt,
}: {
  logo: string;
  cover: string;
  name: string;
  createdAt: string;
}) => {
  const { litteralDate } = useDate();
  const clubCreation = useMemo(
    () => litteralDate(new Date(createdAt)),
    [createdAt]
  );
  return (
    <article className="col-span-2 flex flex-col bg-violet-950 p-4 rounded-md">
      <div
        style={{ backgroundImage: `url(${cover})` }}
        className="w-full h-32 position relative flex justify-center"
      >
        <Image
          className="rounded-md"
          src={
            "https://img.freepik.com/free-photo/liquid-purple-art-painting-abstract-colorful-background-with-color-splash-paints-modern-art_1258-102943.jpg?w=2000"
          }
          alt={name}
          fill
        />
        <If condition={!logo}>
          <img
            className="rounded-full absolute mx-auto z-10 -bottom-1/4 ring-4 ring-violet-950"
            src={`https://ui-avatars.com/api/?background=8b5cf6&color=2e1065&bold=true&length=3&name=${name?.replaceAll(
              /\s/g,
              ""
            )}`}
            alt={name}
          />
        </If>
        <Else>
          <img src={logo} alt={name} />
        </Else>
      </div>
      <div className=" mt-14 text-center">
        <h3 className=" uppercase font-semibold text-lg">{name}</h3>
        <h6 className=" text-xs capitalize">
          <span className=" normal-case first-letter:capitalize">
            {lang.admin.club.club_card.member_since + " "}
          </span>{" "}
          {clubCreation}
        </h6>
      </div>
    </article>
  );
};
