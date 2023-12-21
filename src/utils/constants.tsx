import {
  WiCloud,
  WiCloudy,
  WiDayCloudy,
  WiDayRain,
  WiDaySunny,
  WiNightRain,
  WiNightClear,
  WiNightCloudy,
  WiRainMix,
  WiThunderstorm,
  WiSnowflakeCold,
  WiFog,
  WiDirectionUp,
  WiDirectionRight,
  WiDirectionDown,
  WiDirectionLeft,
  WiDirectionUpRight,
  WiDirectionDownRight,
  WiDirectionDownLeft,
  WiDirectionUpLeft,
} from "react-icons/wi";
import { DateProps, HourProps } from "./interfaces";

export const weatherIcons: any = [
  { main: "clear", icon: { d: <WiDaySunny />, n: <WiNightClear /> } },
  {
    main: "clouds",
    type: [
      { main: "few", icon: { d: <WiDayCloudy />, n: <WiNightCloudy /> } },
      { main: "scattered", icon: <WiCloud /> },
      { main: "broken", icon: <WiCloudy /> },
      { main: "overcast", icon: <WiCloudy /> },
    ],
  },
  { main: "rain", icon: { d: <WiDayRain />, n: <WiNightRain /> } },
  { main: "drizzle", icon: <WiRainMix /> },
  { main: "thunderstorm", icon: <WiThunderstorm /> },
  { main: "snow", icon: <WiSnowflakeCold /> },
  { main: "mist", icon: <WiFog /> },
  { main: "haze", icon: <WiFog /> },
];

export const currentTimezone = new Date().getTimezoneOffset() * 60;

export const optionsHour: HourProps = {
  hour12: false,
  hour: "2-digit",
  minute: "2-digit",
};

export const optionsDate: DateProps = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

export const windDirections = [
  { direction: "N", min: 0, max: 19, icon: <WiDirectionUp /> },
  { direction: "N/NE", min: 20, max: 39, icon: <WiDirectionUpRight /> },
  { direction: "NE", min: 40, max: 59, icon: <WiDirectionUpRight /> },
  { direction: "E/NE", min: 60, max: 79, icon: <WiDirectionUpRight /> },
  { direction: "E", min: 80, max: 109, icon: <WiDirectionRight /> },
  { direction: "E/SE", min: 110, max: 129, icon: <WiDirectionDownRight /> },
  { direction: "SE", min: 130, max: 149, icon: <WiDirectionDownRight /> },
  { direction: "S/SE", min: 150, max: 169, icon: <WiDirectionDownRight /> },
  { direction: "S", min: 170, max: 199, icon: <WiDirectionDown /> },
  { direction: "S/SW", min: 200, max: 219, icon: <WiDirectionDownLeft /> },
  { direction: "SW", min: 220, max: 239, icon: <WiDirectionDownLeft /> },
  { direction: "W/SW", min: 240, max: 259, icon: <WiDirectionDownLeft /> },
  { direction: "W", min: 260, max: 289, icon: <WiDirectionLeft /> },
  { direction: "W/NW", min: 290, max: 309, icon: <WiDirectionUpLeft /> },
  { direction: "NW", min: 310, max: 329, icon: <WiDirectionUpLeft /> },
  { direction: "N/NW", min: 330, max: 349, icon: <WiDirectionUpLeft /> },
  { direction: "N", min: 350, max: 360, icon: <WiDirectionUp /> },
];
