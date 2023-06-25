import {  PlusIcon, UserGroupIcon } from "@heroicons/react/24/solid";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useMemo } from "react";
import { If, Then } from "react-if";

export default function EmptyEntityBlock({
  message,
  ctaMessage,
  link,
  icon,
}: {
  message: string;
  ctaMessage: string;
  link: string;
  icon?: "team";
}) {
  const Icon = useMemo(() => {
    if (icon === undefined) return PlusCircleIcon;
    const icons = {
      team: UserGroupIcon,
    };
    return icons[icon];
  }, []);
  return (
    <div className="w-full bg-violet-950 h-full rounded-md p-5 flex justify-center items-center flex-col gap-4">
      <span className="mb-3 w-14 h-14 bg-indigo-900 rounded-full flex items-center justify-center">
        <Icon className=" p-4" />
      </span>
      <h6 className=" w-2/5 text-center text-xs">{message}</h6>
      <Link
        as="button"
        className="flex bg-violet-800 px-6 py-4 rounded-md uppercase text-xs font-semibold"
        href={link}
      >
        <PlusIcon className="w-4 h-4 mr-2"/>{ctaMessage}
      </Link>
    </div>
  );
}
