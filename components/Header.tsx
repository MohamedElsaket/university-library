"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { cn, getInitials } from "@/lib/utils";
import { Session } from "next-auth";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Header({ session }: { session: Session }) {
  const pathname = usePathname();

  return (
    <header className="my-10 flex justify-between gap-5">
      <Link href="/">
        <Image src={"/icons/logo.svg"} alt="Logo" width={40} height={40} />
      </Link>

      <ul className="flex flex-row items-center gap-8">
        <li className="">
          <Link
            href="/library"
            className={cn(
              "text-base cursor-pointer capitalize",
              pathname === "/library" ? "text-light-200" : "text-light-100"
            )}
          >
            Library
          </Link>
        </li>
        <li>
          <Link href="/my-profile" className="flex items-center gap-2">
            <Avatar>
              <AvatarFallback className="bg-amber-100">
                {getInitials(session?.user?.name || "?")}
              </AvatarFallback>
            </Avatar>

            {/* If the name needed to appear */}

            {/* <span className="text-light-100 text-sm capitalize">
              {session?.user?.name}
            </span> */}
          </Link>
        </li>
      </ul>
    </header>
  );
}
