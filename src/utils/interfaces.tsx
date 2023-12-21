import { ReactNode } from "react";

export interface DataProps {
  name: string;
  sys: { country: string; sunrise: number; sunset: number };
  main: {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  weather: Array<Weather>;
  timezone: number;
  wind: Wind;
  visibility: number;
  coord: { lon: number; lat: number };
}

interface Weather {
  main: string;
  description: string;
  icon: string;
}

interface Wind {
  speed: number;
  deg: number;
}

export interface DateProps {
  weekday: "long" | "short";
  year?: "numeric";
  month: "long" | "short";
  day: "numeric";
}

export interface HourProps {
  hour12: false;
  hour: "2-digit";
  minute: "2-digit";
}

export interface ForecastProps {
  temp: {
    day: number;
    eve: number;
    max: number;
    min: number;
    morn: number;
    night: number;
  };
  icon?: ReactNode;
  weather: WeatherForecast[];
  date: Date;
}

interface WeatherForecast {
  description: string;
  icon: string;
  id: number;
  main: string;
}

export interface ForecastCard {
  forecast: ForecastProps[] | null;
  loading: boolean;
}

export interface ErrorProps {
  isError: boolean;
  msg: string;
}
