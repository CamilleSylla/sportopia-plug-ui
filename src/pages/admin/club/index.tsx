import AdminInfoBadge from "@/components/AdminInfoBadge";
import AdminLayout from "../../../layouts/AdminLayout";
import lang from "../../../../lang/fr.json";
import Link from "next/link";
import { ADMIN_USER_CLUB } from "../../../queries/admin/club";
import { useQuery } from "@apollo/client";
import { If, Else, Then } from "react-if";
import Pending from "@/components/Pending";
import Image from "next/image";
import { useDate } from "@/components/useDate";
import { useMemo } from "react";
import EmptyEntityBlock from "@/components/EmptyEntityBlock";

export default function ClubDashboardPage() {
  const { data, loading } = useQuery(ADMIN_USER_CLUB);
  const club = data?.findByUserId;
  return (
    <AdminLayout>
      <If condition={loading}>
        <Then>
          <Pending />
        </Then>
        <Else>
          <If condition={!club}>
            <Then>
              <EmptyEntityBlock
                message={lang.components.empty_entity_block.club.message}
                ctaMessage={lang.components.empty_entity_block.club.cta}
                link="/admin/club/create"
                icon="team"
              />
            </Then>
            <Else>
              <div className="space-y-4">
                <h1 className="font-bold text-4xl">
                  {lang.admin.club.page_title}
                </h1>
                <div className="space-x-4 pt-6 pb-1">
                  <AdminInfoBadge
                    iconName="users"
                    label="Joueurs"
                    value="246"
                  />
                  <AdminInfoBadge iconName="team" label="Equipes" value="25" />
                </div>
                <div className="grid grid-cols-6 w-full gap-4">
                  <ClubCard {...club} />
                  <TeamsListing teams={club?.teams} />
                </div>
              </div>
            </Else>
          </If>
        </Else>
      </If>
    </AdminLayout>
  );
}

const TeamsListing = ({ teams }) => {
  return (
    <div className=" col-span-3 bg-violet-950 rounded-md overflow-hidden">
      <If condition={!teams}>
        <Then>
          <EmptyEntityBlock
            message={lang.components.empty_entity_block.teams.message}
            ctaMessage={lang.components.empty_entity_block.teams.cta}
            link="/admin/teams/create"
            icon="team"
          />
        </Then>
      </If>
    </div>
  );
};

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
  const clubCreation = useMemo(() => {
    if (createdAt) {
      return litteralDate(new Date(createdAt));
    }
  }, [createdAt]);
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
