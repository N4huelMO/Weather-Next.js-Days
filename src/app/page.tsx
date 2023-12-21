"use client";

import ForecastCard from "@/components/Forecast";
import Loader from "@/components/Loader";
import { useAppContext } from "@/context/AppProvider";

import { getIcon } from "@/helpers/getIcon";
import { ForecastProps } from "@/utils/interfaces";
import {
  currentTimezone,
  optionsHour,
  windDirections,
} from "@/utils/constants";

import axios from "axios";

import { ReactElement, useEffect, useState } from "react";

import { IconContext } from "react-icons";

const cardClassName =
  "flex justify-center w-full bg-blue-200/40 dark:bg-slate-800 flex-col items-center py-10 gap-5 rounded";
const infoNameClassName = "text-lg xl:text-3xl";
const valueClassName = "text-4xl xl:text-5xl font-bold";

const Home = () => {
  const [windDegree, setWindDegree] = useState<string>("");
  const [windIcon, setWindIcon] = useState<ReactElement | null>(null);
  const [forecastData, setForecastData] = useState<ForecastProps[] | null>(
    null
  );
  const [updateForecastData, setUpdateForecastData] = useState<
    ForecastProps[] | null
  >(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { todayData, setError } = useAppContext();

  const getForecastData = async () => {
    setLoading(true);

    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}onecall?lat=${todayData?.coord.lat}&lon=${todayData?.coord.lon}&units=metric&appid=${process.env.NEXT_PUBLIC_API_KEY}`
      );

      const forecastArray = [];

      for (let i = 1; i <= 6; i++) {
        const dayObj = {
          temp: data.daily[i].temp,
          weather: data.daily[i].weather,
          date: new Date(data.daily[i].dt * 1000 + data.timezone_offset * 1000),
        };

        forecastArray.push(dayObj);
      }

      setForecastData(forecastArray);
    } catch (error) {
      setError({ isError: true, msg: "Something went wrong, try again" });

      setTimeout(() => {
        setError({ isError: false, msg: "" });
      }, 4000);
    }
  };

  useEffect(() => {
    if (todayData) {
      const matchingDirection = windDirections.filter((degrees) => {
        return (
          todayData.wind.deg >= degrees.min && todayData.wind.deg <= degrees.max
        );
      });

      setWindDegree(matchingDirection[0].direction);
      setWindIcon(matchingDirection[0].icon);

      getForecastData();
    }
  }, [todayData]);

  useEffect(() => {
    if (forecastData) {
      const iconsArray = [];

      for (let i = 0; i <= 5; i++) {
        const { selectedIcon, cloudsIcon } = getIcon(forecastData[i]);

        iconsArray.push(selectedIcon);
        iconsArray.push(cloudsIcon);

        const icon = iconsArray.filter((icon) => icon !== null);

        const updatedForecastData = forecastData.map((item, i: number) => {
          return {
            ...item,
            icon: icon[i],
          };
        });

        setUpdateForecastData(updatedForecastData);
        setLoading(false);
      }

      return;
    }
  }, [forecastData]);

  if (!todayData || !forecastData) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  const {
    main: { humidity, pressure },
    sys: { sunrise, sunset },
    wind: { speed },
    visibility,
    timezone,
  } = todayData;

  const epochDateSunrise = timezone + currentTimezone + sunrise;
  const epochDateSunset = timezone + currentTimezone + sunset;

  const dateSunrise = new Date(epochDateSunrise * 1000);
  const dateSunset = new Date(epochDateSunset * 1000);

  const visibilityKm = visibility / 1000;

  return (
    <div className="px-5 lg:px-20 w-full">
      <div className="flex flex-wrap flex-row justify-center xl:items-center gap-5 lg:gap-10 mt-14">
        <ForecastCard forecast={updateForecastData} loading={loading} />
      </div>

      <div className="mt-16">
        <p className="text-2xl lg:text-3xl font-semibold">
          Today&apos;s Highlights
        </p>

        <div className="grid grid-cols-2 w-auto xl:grid-cols-3 gap-5 lg:gap-10 my-5">
          <div className={cardClassName}>
            <p className={infoNameClassName}>Wind Status</p>
            <p className={valueClassName}>
              {speed.toFixed()}{" "}
              <span className="text-3xl font-normal">m/s</span>
            </p>

            <div className="flex gap-1 items-center">
              <p className="ml-3">{windDegree}</p>
              <IconContext.Provider value={{ size: "30" }}>
                {windIcon}
              </IconContext.Provider>
            </div>
          </div>

          <div className="flex w-full bg-blue-200/40 dark:bg-slate-800 flex-col items-center py-10 gap-5 rounded">
            <p className={infoNameClassName}>Humidity</p>
            <p className={valueClassName}>
              {humidity} <span className="text-3xl font-normal">%</span>
            </p>
            <div className="w-1/2 relative mt-3">
              <div className="w-full h-2 opacity-50 rounded bg-gray-500">
                <div
                  className={`absolute h-2 top-0 rounded opacity-100 bg-blue-900 dark:bg-black`}
                  style={{ width: `${humidity}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className={cardClassName}>
            <p className={infoNameClassName}>Visibility</p>
            <p className={valueClassName}>
              {visibilityKm.toFixed(1)}{" "}
              <span className="text-3xl font-normal">km</span>
            </p>
          </div>

          <div className={cardClassName}>
            <p className={infoNameClassName}>Air Pressure</p>
            <p className="text-3xl xl:text-5xl font-bold">
              {pressure}{" "}
              <span className="text-2xl xl:text-3xl font-normal">hPa</span>
            </p>
          </div>

          <div className={cardClassName}>
            <p className={infoNameClassName}>Sunrise</p>
            <p className={valueClassName}>
              {dateSunrise.toLocaleTimeString("en-GB", optionsHour)}
            </p>
          </div>

          <div className={cardClassName}>
            <p className={infoNameClassName}>Sunset</p>
            <p className={valueClassName}>
              {dateSunset.toLocaleTimeString("en-GB", optionsHour)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
