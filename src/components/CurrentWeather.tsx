import { useAppContext } from "@/context/AppProvider";
import { IconContext } from "react-icons";

const CurrentWeather = () => {
  const { todayData, icon, clouds } = useAppContext();

  if (!todayData) {
    return null;
  }

  const {
    main: { feels_like, temp, temp_max, temp_min },
    weather,
  } = todayData;

  return (
    <>
      <div className="flex flex-col justify-center items-center sm:gap-20">
        <IconContext.Provider value={{ size: "200" }}>
          {icon ? icon : clouds}
        </IconContext.Provider>

        <p className="text-7xl font-bold">
          {temp.toFixed()}
          <span className="font-normal text-5xl md:text-6xl">°C</span>
        </p>
      </div>

      <p className="mt-5 sm:mt-10 text-5xl font-bold">{weather[0].main}</p>

      <p className="mt-3 sm:mt-4">
        Feels like: {feels_like.toFixed()}
        <span className="text-sm">°C</span>
      </p>

      <div className="flex gap-4 mt-2 sm:mt-5">
        <p>
          Max: {temp_max.toFixed()}
          <span className="text-sm">°C</span>
        </p>
        <p>
          Min: {temp_min.toFixed()}
          <span className="text-sm">°C</span>
        </p>
      </div>
    </>
  );
};

export default CurrentWeather;
