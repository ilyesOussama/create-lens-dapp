"use client";

import ThemeButton from "./ThemeButton";
import { LoginButton } from "./auth";

const Navigation = () => {
  return (
    <nav className="flex flex-row justify-between items-center h-16 container">
      <div>Logo</div>
      <div className="flex flex-row">
        <LoginButton />
        <ThemeButton />
      </div>
    </nav>
  );
};

export default Navigation;
