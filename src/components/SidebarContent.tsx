"use client";

import { useAppContext } from "@/context/AppProvider";

import Loader from "@/components/Loader";

import CurrentWeather from "./CurrentWeather";

import CurrentDate from "./CurrentDate";

const SidebarContent = () => {
  const { todayData, error } = useAppContext();

  if (!todayData) {
    return (
      <div className="flex justify-center items-center h-1/2">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center sm:mt-20 relative">
        <div
          className={`absolute -top-1 sm:-top-10 bg-red-500 dark:bg-red-400 text-white rounded-sm w-full p-2 ${
            error?.isError
              ? "block animate-disappear"
              : "hidden md:block md:opacity-0"
          }`}
        >
          <p className="flex justify-center sm:text-xl">{error?.msg}</p>
        </div>

        <CurrentWeather />

        <CurrentDate />
      </div>
    </>
  );
};

export default SidebarContent;
