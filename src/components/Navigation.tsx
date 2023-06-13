"use client";

import { ThemeButton } from "@/components/ThemeButton";
import { LoginButton } from "@/components/auth";
import Link from "next/link";

const Navigation = () => {
  return (
    <nav className="flex flex-row justify-between items-center h-16 container">
      <Link href="/">Logo</Link>
      <div className="flex flex-row">
        <LoginButton />
        <ThemeButton />
      </div>
    </nav>
  );
};

export { Navigation };
