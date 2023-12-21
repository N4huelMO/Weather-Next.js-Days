"use client";

import { useAppContext } from "@/context/AppProvider";
import { getUserLocation } from "@/helpers/getUserLocation";
import axios from "axios";
import { MdMyLocation } from "react-icons/md";

const Geolocation = () => {
  const { setTodayData, setError } = useAppContext();

  const handleClick = async () => {
    try {
      const location = await getUserLocation();

      const { lon, lat } = location;

      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.NEXT_PUBLIC_API_KEY}`
      );

      setTodayData(data);
    } catch (error) {
      setError({ isError: true, msg: error as string });

      setTimeout(() => {
        setError({ isError: false, msg: "" });
      }, 4000);
    }
  };

  return (
    <button
      className="h-fit p-2 rounded-full hover:scale-110 active:scale-100 bg-blue-200 dark:bg-slate-600 duration-150"
      onClick={handleClick}
    >
      <MdMyLocation size={20} />
    </button>
  );
};

export default Geolocation;
