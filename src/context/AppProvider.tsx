"use client";
import axios from "axios";

import {
  createContext,
  useState,
  ReactNode,
  useContext,
  Dispatch,
  SetStateAction,
  FormEvent,
  ReactElement,
  useEffect,
} from "react";

import { DataProps, ErrorProps } from "@/utils/interfaces";
import { getIcon } from "@/helpers/getIcon";

type ContextProps = {
  city: string;
  setCity: Dispatch<SetStateAction<string>>;
  todayData: DataProps | null;
  setTodayData: Dispatch<SetStateAction<DataProps | null>>;
  handleSubmit: (e: FormEvent) => Promise<void>;
  icon: ReactElement | null;
  clouds: ReactElement | null;
  error: ErrorProps | null;
  setError: Dispatch<SetStateAction<ErrorProps | null>>;
};

const AppContext = createContext<ContextProps | null>(null);

type AppProviderProps = {
  children: ReactNode;
};

const AppProvider = ({ children }: AppProviderProps) => {
  const [city, setCity] = useState<string>("");
  const [todayData, setTodayData] = useState<DataProps | null>(null);
  const [icon, setIcon] = useState<ReactElement | null>(null);
  const [clouds, setClouds] = useState<ReactElement | null>(null);
  const [error, setError] = useState<ErrorProps | null>(null);

  useEffect(() => {
    const todayData = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}weather?q=Montevideo&units=metric&appid=${process.env.NEXT_PUBLIC_API_KEY}`
        );

        setTodayData(data);
      } catch (error) {
        setError({ isError: true, msg: "Something went wrong, try again" });

        setTimeout(() => {
          setError({ isError: false, msg: "" });
        }, 4000);
      }
    };

    todayData();
  }, []);

  useEffect(() => {
    const { selectedIcon, cloudsIcon } = getIcon(todayData);

    setIcon(selectedIcon);
    setClouds(cloudsIcon);
  }, [todayData]);

  const getTodayData = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}weather?q=${city}&units=metric&appid=${process.env.NEXT_PUBLIC_API_KEY}`
      );

      setTodayData(data);
    } catch (error) {
      setError({ isError: true, msg: "Please enter a valid country/city" });

      setTimeout(() => {
        setError({ isError: false, msg: "" });
      }, 4000);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    getTodayData();

    setCity("");
  };

  return (
    <AppContext.Provider
      value={{
        city,
        setCity,
        todayData,
        setTodayData,
        handleSubmit,
        icon,
        clouds,
        error,
        setError,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within a ThemeProvider");
  }
  return context;
}

export { AppProvider };

export default AppContext;
