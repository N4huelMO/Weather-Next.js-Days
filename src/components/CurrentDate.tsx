import { useAppContext } from "@/context/AppProvider";
import { currentTimezone, optionsDate, optionsHour } from "@/utils/constants";
import { useEffect, useState } from "react";
import { HiLocationMarker } from "react-icons/hi";

const CurrentDate = () => {
  const { todayData } = useAppContext();

  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  useEffect(() => {
    if (todayData) {
      const epochTime = new Date().getTime() / 1000;

      const epochDate = epochTime + todayData.timezone + currentTimezone;

      setCurrentDate(new Date(epochDate * 1000));
    }
  }, [todayData]);

  if (!todayData) {
    return null;
  }

  const {
    name,

    sys: { country },
  } = todayData;

  return (
    <>
      <div className="mt-4 sm:mt-16 font-semibold flex flex-col items-center gap-2">
        <p className="text-xl">
          {currentDate.toLocaleString("en-GB", optionsDate)}
        </p>

        <p className="font-bold text-2xl">
          {currentDate.toLocaleTimeString("en-GB", optionsHour)}
        </p>
      </div>
      <div className="flex justify-center items-center gap-1 mt-3 sm:mt-5">
        <HiLocationMarker size={30} />

        <p className="sm:text-2xl font-bold">
          {name}, {country}
        </p>
      </div>
    </>
  );
};

export default CurrentDate;
