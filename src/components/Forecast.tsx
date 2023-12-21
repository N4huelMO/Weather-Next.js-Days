import React from "react";
import Loader from "./Loader";
import { DateProps, ForecastCard } from "@/utils/interfaces";
import { IconContext } from "react-icons";

const optionsDate: DateProps = {
  weekday: "short",
  month: "short",
  day: "numeric",
};

const ForecastCard = ({ forecast, loading }: ForecastCard) => {
  return (
    <>
      {forecast?.map((day, i: number) => (
        <div
          key={i}
          className="flex flex-col items-center bg-blue-200/25 dark:bg-slate-800 w-36 md:w-44 py-5 rounded"
        >
          {loading ? (
            <div className="h-[10.8rem] flex justify-center items-center">
              <Loader />
            </div>
          ) : (
            <>
              <p className="mb-2 font-bold text-lg">
                {day.date.toLocaleString("en-GB", optionsDate)}
              </p>
              <IconContext.Provider value={{ size: "100" }}>
                {day.icon}
              </IconContext.Provider>
              <div className="flex gap-4 mt-2">
                <p className="text-xl">
                  {day.temp.max.toFixed()}
                  <span className="text-lg">°C</span>
                </p>
                <p className="text-xl">
                  {day.temp.min.toFixed()}
                  <span className="text-lg">°C</span>
                </p>
              </div>
            </>
          )}
        </div>
      ))}
    </>
  );
};

export default ForecastCard;
