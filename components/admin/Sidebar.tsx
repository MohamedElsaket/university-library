"use client";

import Image from "next/image";
import Link from "next/link";
import { Session } from "next-auth";
import { usePathname } from "next/navigation";

import { cn, getInitials } from "@/lib/utils";
import { adminSideBarLinks } from "@/constants";
import { Avatar, AvatarFallback } from "../ui/avatar";

export default function Sidebar({ session }: { session: Session }) {
  const pathname = usePathname();

  return (
    <div className="admin-sidebar">
      <div>
        <div className="logo">
          <Image
            src={"/icons/admin/logo.svg"}
            alt="Logo"
            width={37}
            height={37}
          />
          <h1>BookWise</h1>
        </div>

        <div className="flex flex-col gap-5 mt-10">
          {adminSideBarLinks.map((link) => {
            const isSelected =
              (link.route !== "/admin" &&
                link.route.length > 1 &&
                pathname.includes(link.route)) ||
              pathname === link.route;

            return (
              <Link href={link.route} key={link.route}>
                <div
                  className={cn(
                    "link",
                    isSelected && "bg-primary-admin shadow-sm"
                  )}
                >
                  <div className="relative size-5">
                    <Image
                      src={link.img}
                      alt="icon"
                      fill
                      className={`${
                        isSelected ? "brightness-0 invert" : ""
                      }  object-contain`}
                    />
                  </div>

                  <p className={cn(isSelected ? "text-white" : "text-dark")}>
                    {link.text}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="user">
        <Avatar>
          <AvatarFallback className="bg-amber-100">
            {getInitials(session?.user?.name || "?")}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col max-md:hidden">
          <p className="font-semibold capitalize">{session?.user?.name}</p>
          <p className="text-gray-500 text-xs">{session?.user?.email}</p>
        </div>
      </div>
    </div>
  );
}
