import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { Button } from "./ui/button";
const ThemeButton = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <Button
      variant="ghost"
      onClick={() => (theme == "dark" ? setTheme("light") : setTheme("dark"))}
    >
      {theme == "dark" ? <Sun /> : <Moon />}
    </Button>
  );
};

export default ThemeButton;
