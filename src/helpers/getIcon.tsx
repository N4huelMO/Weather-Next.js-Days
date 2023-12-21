import { weatherIcons } from "@/utils/constants";
import { DataProps, ForecastProps } from "@/utils/interfaces";

export const getIcon = (data: ForecastProps | DataProps | null) => {
  const weather = data?.weather[0];

  const weatherCondition = weather?.main?.toLowerCase();
  const weatherDescription = weather?.description?.split(" ")[0];
  const weatherIconType = weather?.icon?.charAt(2);

  const weatherIcon = weatherIcons.find(
    (icon: { main: string }) => icon.main === weatherCondition
  );

  let cloudsType, selectedIcon, cloudsIcon;

  if (weatherIcon?.main === "clouds") {
    cloudsType = weatherIcon.type.find(
      (icon: { main: string }) => icon.main === weatherDescription
    );
  }

  const updateIcon = (
    icon: { [x: string]: any; d: string; n: string },
    iconType: string | undefined
  ) => {
    if (icon && (icon.d || icon.n) && (iconType === "n" || iconType === "d")) {
      return icon[iconType.toLowerCase()];
    }
    return icon;
  };

  selectedIcon = updateIcon(weatherIcon?.icon, weatherIconType) || null;
  cloudsIcon = updateIcon(cloudsType?.icon, weatherIconType) || null;

  return { selectedIcon, cloudsIcon };
};
