"use client";
import { useAppContext } from "@/context/AppProvider";
import Searchbar from "./Searchbar";
import SidebarContent from "./SidebarContent";

const Sidebar = () => {
  const { todayData } = useAppContext();

  return (
    <div
      className={`md:border-r-2 md:sticky md:top-0 md:border-r-blue-300/50 dark:border-slate-700 px-6 ${
        !todayData && "h-screen"
      } md:h-screen py-7 md:py-10 bg-blue-200/30 dark:bg-slate-800`}
    >
      <Searchbar />
      <SidebarContent />
    </div>
  );
};

export default Sidebar;
