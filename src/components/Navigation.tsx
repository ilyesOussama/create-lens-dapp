"use client";

import ThemeButton from "./ThemeButton";

const Navigation = () => {
  return (
    <nav className="flex flex-row justify-between items-center h-16 container">
      <div>Logo</div>
      <ul className="flex flex-row gap-4">
        <li>1</li>
        <li>2</li>
        <li>3</li>
      </ul>
      <ThemeButton />
    </nav>
  );
};

export default Navigation;
