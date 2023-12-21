export const getUserLocation = (): Promise<{ lon: number; lat: number }> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lon: position.coords.longitude,
          lat: position.coords.latitude,
        });
      },
      (error) => {
        reject("Please, allow the location by browser");
      }
    );
  });
};
