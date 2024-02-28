/* eslint-disable @next/next/no-page-custom-font */
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import Image from "next/image";

function Header() {
  return (
    <header className="flex flex-row justify-between w-full h-16 items-center">
      <Link
        href="/"
        className="flex items-center justify-between w-fit p-2 pl-3"
      >
        <Image
          src="/justinsight_logo.png"
          alt="logo"
          width={30}
          height={30}
          className="mr-2"
        />
        <span className="baloo-font text-lg text-blue-600">JustinSight</span>
      </Link>

      <div className="px-5 flex space-x-2 items-center">
        <ThemeToggle />
        <UserButton afterSignOutUrl="/" />
      </div>
    </header>
  );
}

export default Header;
