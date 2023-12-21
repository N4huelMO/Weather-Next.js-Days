"use client";
import { ThemeSwitcher } from "./ThemeSwitcher";
import Geolocation from "./Geolocation";
import { IoSearchOutline } from "react-icons/io5";
import { useAppContext } from "@/context/AppProvider";

const Searchbar = () => {
  const { city, setCity, handleSubmit } = useAppContext();

  return (
    <div className="flex justify-center flex-col md:flex-row items-center gap-4 dark:text-white text-slate-900">
      <form
        className="flex justify-center items-center"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Enter country/city name"
          className="px-2 rounded-l outline-none placeholder:text-slate-800/50 placeholder:dark:text-slate-400 bg-blue-200 dark:bg-slate-600 font-semibold h-10"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />

        <button
          type="submit"
          className="rounded-r h-10 w-10 bg-blue-200 dark:bg-slate-600 hover:bg-blue-300/80 hover:dark:bg-slate-500"
        >
          <IoSearchOutline size={20} className="m-auto" />
        </button>
      </form>

      <div className="flex gap-4 md:mt-0">
        <Geolocation />
        <ThemeSwitcher />
      </div>
    </div>
  );
};

export default Searchbar;
