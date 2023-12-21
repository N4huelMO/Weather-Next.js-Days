"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { RiSunFill, RiMoonFill } from "react-icons/ri";
import { AiOutlineLoading } from "react-icons/ai";

const buttonClassName =
  "h-fit p-2 rounded-full hover:scale-110 active:scale-100 bg-blue-200 dark:bg-slate-600 duration-150";

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className={buttonClassName}>
        <AiOutlineLoading size={20} className="animate-spin" />
      </button>
    );
  }

  return (
    <button
      className={buttonClassName}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "light" ? <RiMoonFill size={20} /> : <RiSunFill size={20} />}
    </button>
  );
};
